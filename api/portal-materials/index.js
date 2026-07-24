const { json, listPortalMaterials, validateSession } = require('../shared');

module.exports = async function (context, req) {
  try {
    const session = req.headers['x-portal-session'] || '';
    const sessionEntity = await validateSession(session);
    if (!sessionEntity) {
      context.res = json(401, { error: 'Portal session expired or invalid.' });
      return;
    }

    const materials = (await listPortalMaterials(sessionEntity.portalId || '')).map((material) => ({
      ...material,
      blobName: undefined,
      viewUrl: `/api/portal-material?id=${encodeURIComponent(material.id)}&session=${encodeURIComponent(session)}`
    }));
    context.res = json(200, { materials });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not load portal materials.' });
  }
};
