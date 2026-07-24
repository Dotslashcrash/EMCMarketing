const { getMaterial, json, materialResponse, validateSession } = require('../shared');

module.exports = async function (context, req) {
  try {
    const session = req.query.session || '';
    const sessionEntity = await validateSession(session);
    if (!sessionEntity) {
      context.res = json(401, { error: 'Portal session expired or invalid.' });
      return;
    }
    const material = await getMaterial(req.query.id);
    if (material.portalId !== sessionEntity.portalId) {
      context.res = json(404, { error: 'Material not found.' });
      return;
    }
    context.res = await materialResponse(material);
  } catch (error) {
    context.res = json(404, { error: error.message || 'Material not found.' });
  }
};
