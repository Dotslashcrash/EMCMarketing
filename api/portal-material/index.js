const { getMaterial, json, materialResponse, validateSession } = require('../shared');

module.exports = async function (context, req) {
  try {
    const session = req.query.session || '';
    if (!(await validateSession(session))) {
      context.res = json(401, { error: 'Portal session expired or invalid.' });
      return;
    }
    const material = await getMaterial(req.query.id);
    context.res = await materialResponse(material);
  } catch (error) {
    context.res = json(404, { error: error.message || 'Material not found.' });
  }
};
