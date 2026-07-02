const crypto = require('crypto');
const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');
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

function assertAdmin(req) {
  const supplied = getHeader(req, 'x-admin-password') || req.query?.adminKey || parseBody(req).password;
  if (!supplied || supplied !== getAdminPassword()) {
    return false;
  }
  return true;
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
    results.push({
      id: entity.rowKey,
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

async function getMaterial(materialId) {
  const client = await table();
  return client.getEntity('material', materialId);
}

async function validateSession(sessionId) {
  if (!sessionId) return false;
  const client = await table();
  try {
    const entity = await client.getEntity('session', hash(sessionId));
    if (new Date(entity.expiresAt).getTime() < Date.now()) return false;
    return true;
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
  cleanFileName,
  container,
  getMaterial,
  hash,
  id,
  json,
  listMaterials,
  materialResponse,
  parseBody,
  table,
  token,
  validateSession
};
