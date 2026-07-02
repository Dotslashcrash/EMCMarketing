const { assertAdmin, hash, json, parseBody, table, token } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!assertAdmin(req)) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }

    const body = parseBody(req);
    const hours = Math.max(1, Math.min(168, Number(body.expiresHours || 48)));
    const accessToken = token();
    const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
    const tableClient = await table();
    await tableClient.createEntity({
      partitionKey: 'token',
      rowKey: hash(accessToken),
      clientName: body.clientName || 'Client',
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt
    });

    context.res = json(200, { token: accessToken, expiresAt });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not create one-time login.' });
  }
};
