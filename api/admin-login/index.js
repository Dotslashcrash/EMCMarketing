const { assertAdmin, json } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      context.res = json(401, { error: 'That admin password did not match.' });
      return;
    }
    context.res = json(200, { ok: true });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Admin login failed.' });
  }
};
