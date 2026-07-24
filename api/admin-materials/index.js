const { assertAdmin, cleanupExpiredPortalAccess, json, listMaterials, listPortals } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }
    await cleanupExpiredPortalAccess();
    const portalId = String(req.query?.portalId || '');
    const portals = await listPortals();
    const selectedPortalId = portals.some((portal) => portal.id === portalId) ? portalId : portals[0]?.id || '';
    const materials = (await listMaterials()).filter((material) => !selectedPortalId || material.portalId === selectedPortalId);
    context.res = json(200, { portals, selectedPortalId, materials });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not load materials.' });
  }
};
