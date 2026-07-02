const { assertAdmin, cleanFileName, container, id, json, parseBody, table } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!assertAdmin(req)) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }

    const body = parseBody(req);
    const files = Array.isArray(body.files) ? body.files : [];
    if (!files.length) {
      context.res = json(400, { error: 'Choose at least one file.' });
      return;
    }

    const tableClient = await table();
    const blobContainer = await container();
    const uploaded = [];

    for (const file of files) {
      if (!file.data || !file.fileName) continue;
      const materialId = id();
      const fileName = cleanFileName(file.fileName);
      const blobName = `${materialId}-${fileName}`;
      const contentType = file.contentType || 'application/octet-stream';
      const buffer = Buffer.from(file.data, 'base64');
      const blob = blobContainer.getBlockBlobClient(blobName);
      await blob.uploadData(buffer, {
        blobHTTPHeaders: {
          blobContentType: contentType,
          blobContentDisposition: `inline; filename="${fileName}"`
        },
        metadata: {
          fileName,
          materialId
        }
      });
      await tableClient.createEntity({
        partitionKey: 'material',
        rowKey: materialId,
        fileName,
        blobName,
        label: body.label || fileName,
        note: body.note || '',
        contentType,
        size: Number(file.size || buffer.length),
        uploadedAt: new Date().toISOString()
      });
      uploaded.push(materialId);
    }

    context.res = json(200, { uploaded });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Upload failed.' });
  }
};
