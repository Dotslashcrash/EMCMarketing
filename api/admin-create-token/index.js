const { assertAdmin, hash, json, listPortals, parseBody, table, token } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }

    const body = parseBody(req);
    const portalId = String(body.portalId || '');
    const portals = await listPortals();
    const portal = portals.find((item) => item.id === portalId);
    if (!portal) {
      context.res = json(400, { error: 'Choose an active client portal before generating access.' });
      return;
    }
    const hours = Math.max(1, Math.min(168, Number(body.expiresHours || 48)));
    const accessToken = token();
    const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
    const tableClient = await table();
    await tableClient.createEntity({
      partitionKey: 'token',
      rowKey: hash(accessToken),
      portalId,
      clientName: portal.clientName || body.clientName || 'Client',
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt
    });

    context.res = json(200, { token: accessToken, expiresAt });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not create one-time login.' });
  }
};
