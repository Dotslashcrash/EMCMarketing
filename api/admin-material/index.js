const { assertAdmin, getMaterial, json, materialResponse } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!assertAdmin(req)) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }
    const material = await getMaterial(req.query.id);
    context.res = await materialResponse(material);
  } catch (error) {
    context.res = json(404, { error: error.message || 'Material not found.' });
  }
};
