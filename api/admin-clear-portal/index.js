const { assertAdmin, clearPortal, json, parseBody } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }
    const body = parseBody(req);
    const portalId = String(body.portalId || req.query?.portalId || '');
    const result = await clearPortal(portalId);
    context.res = json(200, {
      ...result,
      portalId,
      message: portalId ? 'Client portal cleared. Existing links and sessions for that portal were revoked.' : 'All brand portals cleared. Existing links and sessions were revoked.'
    });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not clear the brand portal.' });
  }
};
