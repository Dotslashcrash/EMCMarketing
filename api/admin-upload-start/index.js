const { BlobSASPermissions } = require('@azure/storage-blob');
const { assertAdmin, cleanFileName, cleanupExpiredPortalAccess, container, id, json, listPortals, parseBody } = require('../shared');

const MAX_FILE_BYTES = 25 * 1024 * 1024;
const MAX_BATCH_BYTES = 250 * 1024 * 1024;
const MAX_FILES = 25;

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }

    const body = parseBody(req);
    if (!String(body.clientName || '').trim()) {
      context.res = json(400, { error: 'Client name is required to create a portal.' });
      return;
    }
    await cleanupExpiredPortalAccess();
    const activePortals = await listPortals();
    if (activePortals.length >= 5) {
      context.res = json(400, { error: 'Five client portals are already active. Clear one before creating another.' });
      return;
    }

    const files = Array.isArray(body.files) ? body.files : [];
    if (!files.length || files.length > MAX_FILES) {
      context.res = json(400, { error: `Choose between 1 and ${MAX_FILES} files.` });
      return;
    }

    const normalized = files.map((file) => ({
      fileName: cleanFileName(file?.fileName),
      contentType: String(file?.contentType || 'application/octet-stream').slice(0, 160),
      size: Number(file?.size || 0)
    }));
    const oversized = normalized.find((file) => !Number.isFinite(file.size) || file.size <= 0 || file.size > MAX_FILE_BYTES);
    if (oversized) {
      context.res = json(400, { error: 'Each portal file must be 25 MB or smaller.' });
      return;
    }
    const totalSize = normalized.reduce((total, file) => total + file.size, 0);
    if (totalSize > MAX_BATCH_BYTES) {
      context.res = json(400, { error: 'Upload 250 MB or less at a time.' });
      return;
    }

    const portalId = id();
    const blobContainer = await container();
    const startsOn = new Date(Date.now() - 5 * 60 * 1000);
    const expiresOn = new Date(Date.now() + 60 * 60 * 1000);
    const uploads = [];

    for (const file of normalized) {
      const materialId = id();
      const blobName = `${portalId}/${materialId}-${file.fileName}`;
      const blob = blobContainer.getBlockBlobClient(blobName);
      const uploadUrl = await blob.generateSasUrl({
        permissions: BlobSASPermissions.parse('cw'),
        startsOn,
        expiresOn
      });
      uploads.push({
        portalId,
        materialId,
        blobName,
        fileName: file.fileName,
        contentType: file.contentType,
        size: file.size,
        uploadUrl
      });
    }

    context.res = json(200, { uploads, portalId });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Upload could not be prepared.' });
  }
};
