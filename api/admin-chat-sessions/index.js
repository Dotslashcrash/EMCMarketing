const { assertAdmin, json, listSessions, unauthorized } = require('../chat-shared');

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      unauthorized(context);
      return;
    }
    const sessions = await listSessions();
    context.res = json(200, { sessions });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not load chats.' });
  }
};
