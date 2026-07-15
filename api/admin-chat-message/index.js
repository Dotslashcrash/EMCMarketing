const { addMessage, assertAdmin, json, parseBody, unauthorized } = require('../chat-shared');

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      unauthorized(context);
      return;
    }
    const body = parseBody(req);
    const message = await addMessage({
      sessionId: body.sessionId,
      sender: 'rep',
      text: body.text
    });
    context.res = json(200, { message });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not send chat reply.' });
  }
};
