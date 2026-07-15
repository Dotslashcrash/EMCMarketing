const { createSession, json, parseBody } = require('../chat-shared');

module.exports = async function (context, req) {
  try {
    const body = parseBody(req);
    const session = await createSession(body.pageUrl);
    context.res = json(200, { session });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not start chat.' });
  }
};
