const { assertAdmin, json, parseBody, setAdminPassword } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      context.res = json(401, { error: 'Current admin password did not match.' });
      return;
    }

    const body = parseBody(req);
    const nextPassword = String(body.nextPassword || '').trim();
    if (nextPassword.length < 12) {
      context.res = json(400, { error: 'Use at least 12 characters for the new admin password.' });
      return;
    }

    await setAdminPassword(nextPassword);
    context.res = json(200, { ok: true });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not change admin password.' });
  }
};
