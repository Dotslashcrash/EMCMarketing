const { BlobSASPermissions } = require('@azure/storage-blob');
const { assertAdmin, cleanFileName, clearPortal, container, id, json, parseBody } = require('../shared');

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

    // Privacy first: flush prior material, tokens, sessions, and any orphaned
    // blobs before issuing narrowly scoped write-only URLs for the new batch.
    await clearPortal();
    const blobContainer = await container();
    const startsOn = new Date(Date.now() - 5 * 60 * 1000);
    const expiresOn = new Date(Date.now() + 60 * 60 * 1000);
    const uploads = [];

    for (const file of normalized) {
      const materialId = id();
      const blobName = `${materialId}-${file.fileName}`;
      const blob = blobContainer.getBlockBlobClient(blobName);
      const uploadUrl = await blob.generateSasUrl({
        permissions: BlobSASPermissions.parse('cw'),
        startsOn,
        expiresOn
      });
      uploads.push({
        materialId,
        blobName,
        fileName: file.fileName,
        contentType: file.contentType,
        size: file.size,
        uploadUrl
      });
    }

    context.res = json(200, { uploads, previousContentCleared: true });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Upload could not be prepared.' });
  }
};
