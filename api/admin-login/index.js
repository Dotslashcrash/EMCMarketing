const { json, parseBody } = require('../shared');

module.exports = async function (context, req) {
  try {
    const { password } = parseBody(req);
    if (!process.env.BRAND_PORTAL_ADMIN_PASSWORD) {
      context.res = json(500, { error: 'Admin password is not configured.' });
      return;
    }
    if (password !== process.env.BRAND_PORTAL_ADMIN_PASSWORD) {
      context.res = json(401, { error: 'That admin password did not match.' });
      return;
    }
    context.res = json(200, { ok: true });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Admin login failed.' });
  }
};
