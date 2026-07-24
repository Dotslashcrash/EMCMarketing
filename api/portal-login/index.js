const { hash, json, parseBody, table, token } = require('../shared');

function isMissingToken(error) {
  return error?.statusCode === 404 || error?.code === 'ResourceNotFound' || String(error?.message || '').includes('ResourceNotFound');
}

module.exports = async function (context, req) {
  try {
    const body = parseBody(req);
    const supplied = String(body.token || '').trim();
    if (!supplied) {
      context.res = json(400, { error: 'A one-time access code is required.' });
      return;
    }

    const tableClient = await table();
    const rowKey = hash(supplied);
    let entity;
    try {
      entity = await tableClient.getEntity('token', rowKey);
    } catch (error) {
      if (isMissingToken(error)) {
        context.res = json(401, { error: 'That one-time access code was not found. Generate a fresh portal link from admin and try again.' });
        return;
      }
      throw error;
    }

    if (entity.status !== 'active') {
      context.res = json(410, { error: 'This one-time login has already been used.' });
      return;
    }
    if (new Date(entity.expiresAt).getTime() < Date.now()) {
      await tableClient.updateEntity({ partitionKey: 'token', rowKey, status: 'expired' }, 'Merge');
      context.res = json(410, { error: 'This one-time login has expired.' });
      return;
    }

    const sessionId = token();
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    await tableClient.deleteEntity('token', rowKey);
    await tableClient.createEntity({
      partitionKey: 'session',
      rowKey: hash(sessionId),
      portalId: entity.portalId || '',
      clientName: entity.clientName || 'Client',
      createdAt: new Date().toISOString(),
      expiresAt
    });

    context.res = json(200, { sessionId, expiresAt });
  } catch (error) {
    context.res = json(401, { error: error.message || 'Portal access failed.' });
  }
};
