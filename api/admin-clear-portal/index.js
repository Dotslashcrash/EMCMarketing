const { assertAdmin, clearPortal, json } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }
    const result = await clearPortal();
    context.res = json(200, { ...result, message: 'Brand portal cleared. Existing links and sessions were revoked.' });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not clear the brand portal.' });
  }
};
