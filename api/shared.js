const crypto = require('crypto');
const { TableClient } = require('@azure/data-tables');
const { BlobServiceClient } = require('@azure/storage-blob');

const TABLE_NAME = 'BrandPortal';
const CONTAINER_NAME = 'brand-materials';

function json(status, body) {
  return {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(body)
  };
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function getHeader(req, name) {
  const lower = name.toLowerCase();
  return req.headers?.[lower] || req.headers?.[name] || '';
}

function getConnectionString() {
  const value = process.env.BRAND_PORTAL_STORAGE_CONNECTION_STRING || process.env.AzureWebJobsStorage;
  if (!value) throw new Error('Brand portal storage is not configured.');
  return value;
}

function getAdminPassword() {
  const value = process.env.BRAND_PORTAL_ADMIN_PASSWORD;
  if (!value) throw new Error('Brand portal admin password is not configured.');
  return value;
}

function getDevAdminPassword() {
  return process.env.BRAND_PORTAL_DEV_ADMIN_PASSWORD || '';
}

function suppliedAdminPassword(req) {
  const supplied = getHeader(req, 'x-admin-password') || req.query?.adminKey || parseBody(req).password;
  return String(supplied || '');
}

function hash(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

function token() {
  return crypto.randomBytes(24).toString('base64url');
}

function id() {
  return crypto.randomUUID();
}

function cleanFileName(name) {
  return String(name || 'brand-material.bin').replace(/[^\w.\- ()]/g, '_').slice(0, 140);
}

async function table() {
  const client = TableClient.fromConnectionString(getConnectionString(), TABLE_NAME);
  await client.createTable().catch((error) => {
    if (error.statusCode !== 409) throw error;
  });
  return client;
}

async function storedAdminPasswordHash() {
  const client = await table();
  try {
    const entity = await client.getEntity('config', 'adminPassword');
    return entity.passwordHash || '';
  } catch {
    return '';
  }
}

async function assertAdmin(req) {
  const supplied = suppliedAdminPassword(req);
  if (!supplied) return false;
  const devPassword = getDevAdminPassword();
  if (devPassword && supplied === devPassword) return true;
  const storedHash = await storedAdminPasswordHash();
  if (storedHash) return hash(supplied) === storedHash;
  return supplied === getAdminPassword();
}

async function setAdminPassword(nextPassword) {
  const client = await table();
  await client.upsertEntity(
    {
      partitionKey: 'config',
      rowKey: 'adminPassword',
      passwordHash: hash(nextPassword),
      updatedAt: new Date().toISOString()
    },
    'Merge'
  );
}

async function container() {
  const service = BlobServiceClient.fromConnectionString(getConnectionString());
  const client = service.getContainerClient(CONTAINER_NAME);
  await client.createIfNotExists();
  return client;
}

async function listMaterials() {
  const client = await table();
  const results = [];
  const entities = client.listEntities({ queryOptions: { filter: `PartitionKey eq 'material'` } });
  for await (const entity of entities) {
    if (entity.portalId === '__deleted__') continue;
    results.push({
      id: entity.rowKey,
      portalId: entity.portalId || '',
      fileName: entity.fileName,
      label: entity.label || '',
      note: entity.note || '',
      contentType: entity.contentType || 'application/octet-stream',
      size: Number(entity.size || 0),
      uploadedAt: entity.uploadedAt,
      blobName: entity.blobName
    });
  }
  return results.sort((a, b) => String(b.uploadedAt).localeCompare(String(a.uploadedAt)));
}

async function listPortals() {
  const client = await table();
  const results = [];
  const entities = client.listEntities({ queryOptions: { filter: `PartitionKey eq 'portal'` } });
  for await (const entity of entities) {
    if (entity.status === 'deleted') continue;
    results.push({
      id: entity.rowKey,
      clientName: entity.clientName || 'Client',
      label: entity.label || '',
      note: entity.note || '',
      status: entity.status || 'active',
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt || entity.createdAt,
      expiresAt: entity.expiresAt || '',
      materialCount: Number(entity.materialCount || 0)
    });
  }
  return results.sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)));
}

async function listPortalMaterials(portalId) {
  const materials = await listMaterials();
  return materials.filter((material) => material.portalId === portalId);
}

async function getMaterial(materialId) {
  const client = await table();
  return client.getEntity('material', materialId);
}

async function clearPortal(portalId = '') {
  const client = await table();
  const blobs = await container();
  let deletedMaterials = 0;

  async function deleteEntity(partitionKey, rowKey) {
    await client.deleteEntity(partitionKey, rowKey).catch((error) => {
      if (error.statusCode !== 404) throw error;
    });
  }

  const materials = client.listEntities({ queryOptions: { filter: `PartitionKey eq 'material'` } });
  for await (const entity of materials) {
    if (portalId && entity.portalId !== portalId) continue;
    if (entity.blobName) {
      await blobs.deleteBlob(entity.blobName, { deleteSnapshots: 'include' }).catch((error) => {
        if (error.statusCode !== 404) throw error;
      });
      deletedMaterials += 1;
    }
    await deleteEntity('material', entity.rowKey);
  }

  for (const partitionKey of ['token', 'session']) {
    const entities = client.listEntities({ queryOptions: { filter: `PartitionKey eq '${partitionKey}'` } });
    for await (const entity of entities) {
      if (portalId && entity.portalId !== portalId) continue;
      await deleteEntity(partitionKey, entity.rowKey);
    }
  }

  if (portalId) {
    await deleteEntity('portal', portalId);
    for await (const blob of blobs.listBlobsFlat({ prefix: `${portalId}/` })) {
      await blobs.deleteBlob(blob.name, { deleteSnapshots: 'include' }).catch((error) => {
        if (error.statusCode !== 404) throw error;
      });
    }
  } else {
    const portals = client.listEntities({ queryOptions: { filter: `PartitionKey eq 'portal'` } });
    for await (const entity of portals) {
      await deleteEntity('portal', entity.rowKey);
    }
    // Failed direct uploads are intentionally never published in Table Storage,
    // but their private blobs can remain. A full portal flush removes them too.
    for await (const blob of blobs.listBlobsFlat()) {
      await blobs.deleteBlob(blob.name, { deleteSnapshots: 'include' }).catch((error) => {
        if (error.statusCode !== 404) throw error;
      });
    }
  }
  return { deletedMaterials };
}

async function cleanupExpiredPortalAccess() {
  const client = await table();
  const now = Date.now();
  for (const partitionKey of ['token', 'session']) {
    const entities = client.listEntities({ queryOptions: { filter: `PartitionKey eq '${partitionKey}'` } });
    for await (const entity of entities) {
      if (entity.expiresAt && new Date(entity.expiresAt).getTime() < now) {
        await client.deleteEntity(partitionKey, entity.rowKey).catch((error) => {
          if (error.statusCode !== 404) throw error;
        });
      }
    }
  }
}

async function validateSession(sessionId) {
  if (!sessionId) return false;
  const client = await table();
  try {
    const entity = await client.getEntity('session', hash(sessionId));
    if (new Date(entity.expiresAt).getTime() < Date.now()) return false;
    return entity;
  } catch {
    return false;
  }
}

async function materialResponse(material, disposition = 'inline') {
  const blobs = await container();
  const blob = blobs.getBlockBlobClient(material.blobName);
  const buffer = await blob.downloadToBuffer();
  return {
    status: 200,
    headers: {
      'Content-Type': material.contentType || 'application/octet-stream',
      'Content-Disposition': `${disposition}; filename="${cleanFileName(material.fileName)}"`,
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Robots-Tag': 'noindex, nofollow'
    },
    body: buffer
  };
}

module.exports = {
  assertAdmin,
  clearPortal,
  cleanFileName,
  container,
  cleanupExpiredPortalAccess,
  getMaterial,
  hash,
  id,
  json,
  listMaterials,
  listPortalMaterials,
  listPortals,
  materialResponse,
  parseBody,
  setAdminPassword,
  table,
  token,
  validateSession
};
