const { addMessage, json, listMessages, parseBody } = require('../chat-shared');

module.exports = async function (context, req) {
  try {
    if (req.method === 'GET') {
      const messages = await listMessages(req.query?.sessionId);
      context.res = json(200, { messages });
      return;
    }

    const body = parseBody(req);
    const message = await addMessage({
      sessionId: body.sessionId,
      sender: 'visitor',
      text: body.text,
      visitorName: body.visitorName,
      visitorEmail: body.visitorEmail,
      visitorPhone: body.visitorPhone,
      need: body.need
    });
    context.res = json(200, { message });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not update chat.' });
  }
};
