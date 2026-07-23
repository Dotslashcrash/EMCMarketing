const { assertAdmin, cleanFileName, container, json, parseBody, table } = require('../shared');

const MAX_FILES = 25;

function validUpload(upload) {
  const materialId = String(upload?.materialId || '');
  const fileName = cleanFileName(upload?.fileName);
  return (
    /^[0-9a-f-]{36}$/i.test(materialId) &&
    String(upload?.blobName || '') === `${materialId}-${fileName}` &&
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

    const blobContainer = await container();
    const entities = [];
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
        fileName: cleanFileName(upload.fileName),
        blobName: upload.blobName,
        label: body.label || cleanFileName(upload.fileName),
        note: body.note || '',
        contentType: String(upload.contentType || 'application/octet-stream').slice(0, 160),
        size: Number(upload.size),
        uploadedAt: new Date().toISOString()
      });
    }

    const tableClient = await table();
    await tableClient.submitTransaction(entities.map((entity) => ['create', entity]));
    context.res = json(200, {
      uploaded: entities.map((entity) => entity.rowKey),
      replacedPreviousContent: true
    });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Upload could not be published.' });
  }
};
