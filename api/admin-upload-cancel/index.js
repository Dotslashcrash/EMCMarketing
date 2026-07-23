const { assertAdmin, cleanFileName, container, json, parseBody } = require('../shared');

module.exports = async function (context, req) {
  try {
    if (!(await assertAdmin(req))) {
      context.res = json(401, { error: 'Admin access required.' });
      return;
    }

    const body = parseBody(req);
    const uploads = Array.isArray(body.uploads) ? body.uploads : [];
    const blobContainer = await container();
    let deleted = 0;
    for (const upload of uploads) {
      const materialId = String(upload?.materialId || '');
      const fileName = cleanFileName(upload?.fileName);
      const blobName = String(upload?.blobName || '');
      if (!/^[0-9a-f-]{36}$/i.test(materialId) || blobName !== `${materialId}-${fileName}`) continue;
      await blobContainer.deleteBlob(blobName, { deleteSnapshots: 'include' }).catch((error) => {
        if (error.statusCode !== 404) throw error;
      });
      deleted += 1;
    }
    context.res = json(200, { deleted });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Incomplete upload cleanup failed.' });
  }
};
