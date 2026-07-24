const { assertAdmin, cleanFileName, container, json, listPortals, parseBody, table } = require('../shared');

const MAX_FILES = 25;

function validUpload(upload) {
  const portalId = String(upload?.portalId || '');
  const materialId = String(upload?.materialId || '');
  const fileName = cleanFileName(upload?.fileName);
  return (
    /^[0-9a-f-]{36}$/i.test(portalId) &&
    /^[0-9a-f-]{36}$/i.test(materialId) &&
    String(upload?.blobName || '') === `${portalId}/${materialId}-${fileName}` &&
    Number.isFinite(Number(upload?.size)) &&
    Number(upload.size) > 0
  );
}

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }

    const body = parseBody(req);
    const uploads = Array.isArray(body.uploads) ? body.uploads : [];
    if (!uploads.length || uploads.length > MAX_FILES || uploads.some((upload) => !validUpload(upload))) {
      context.res = json(400, { error: 'The uploaded file list is invalid. Select the files and try again.' });
      return;
    }
    const portalId = String(uploads[0].portalId || '');
    if (uploads.some((upload) => upload.portalId !== portalId)) {
      context.res = json(400, { error: 'All uploaded files must belong to the same portal.' });
      return;
    }
    const activePortals = await listPortals();
    if (activePortals.length >= 5 && !activePortals.some((portal) => portal.id === portalId)) {
      context.res = json(400, { error: 'Five client portals are already active. Clear one before publishing another.' });
      return;
    }

    const blobContainer = await container();
    const entities = [];
    const uploadedAt = new Date().toISOString();
    for (const upload of uploads) {
      const blob = blobContainer.getBlockBlobClient(upload.blobName);
      const properties = await blob.getProperties().catch(() => null);
      if (!properties || Number(properties.contentLength) !== Number(upload.size)) {
        context.res = json(400, { error: `${cleanFileName(upload.fileName)} did not finish uploading. Select the files and try again.` });
        return;
      }
      entities.push({
        partitionKey: 'material',
        rowKey: upload.materialId,
        portalId,
        fileName: cleanFileName(upload.fileName),
        blobName: upload.blobName,
        label: body.label || cleanFileName(upload.fileName),
        note: body.note || '',
        contentType: String(upload.contentType || 'application/octet-stream').slice(0, 160),
        size: Number(upload.size),
        uploadedAt
      });
    }

    const tableClient = await table();
    await tableClient.createEntity({
      partitionKey: 'portal',
      rowKey: portalId,
      clientName: String(body.clientName || 'Client').slice(0, 140),
      label: String(body.label || body.clientName || 'Client portal').slice(0, 180),
      note: String(body.note || '').slice(0, 2000),
      status: 'active',
      materialCount: entities.length,
      createdAt: uploadedAt,
      updatedAt: uploadedAt
    });
    for (const entity of entities) {
      await tableClient.createEntity(entity);
    }
    context.res = json(200, {
      portal: {
        id: portalId,
        clientName: String(body.clientName || 'Client').slice(0, 140),
        label: String(body.label || body.clientName || 'Client portal').slice(0, 180),
        note: String(body.note || '').slice(0, 2000),
        status: 'active',
        materialCount: entities.length,
        createdAt: uploadedAt,
        updatedAt: uploadedAt
      },
      uploaded: entities.map((entity) => entity.rowKey),
      replacedPreviousContent: false
    });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Upload could not be published.' });
  }
};
