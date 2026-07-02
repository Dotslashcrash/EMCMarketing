const { assertAdmin, json, listMaterials } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!assertAdmin(req)) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }
    const materials = await listMaterials();
    context.res = json(200, { materials });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not load materials.' });
  }
};
