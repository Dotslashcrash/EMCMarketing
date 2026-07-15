const { assertAdmin, id, json, parseBody, table } = require('./shared');

const SESSION_PARTITION = 'liveChatSession';

function clean(value, fallback = '') {
  return String(value || fallback).trim().slice(0, 1800);
}

function messagePartition(sessionId) {
  return `liveChatMessage_${sessionId}`;
}

function publicSession(entity) {
  return {
    id: entity.rowKey,
    status: entity.status || 'active',
    pageUrl: entity.pageUrl || '',
    visitorName: entity.visitorName || '',
    visitorEmail: entity.visitorEmail || '',
    visitorPhone: entity.visitorPhone || '',
    need: entity.need || '',
    lastMessage: entity.lastMessage || '',
    lastSender: entity.lastSender || '',
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  };
}

function publicMessage(entity) {
  return {
    id: entity.rowKey,
    sessionId: entity.sessionId,
    sender: entity.sender || 'visitor',
    text: entity.text || '',
    createdAt: entity.createdAt
  };
}

async function getSession(client, sessionId) {
  return client.getEntity(SESSION_PARTITION, sessionId);
}

async function createSession(pageUrl) {
  const client = await table();
  const now = new Date().toISOString();
  const sessionId = id();
  const session = {
    partitionKey: SESSION_PARTITION,
    rowKey: sessionId,
    status: 'active',
    pageUrl: clean(pageUrl),
    visitorName: '',
    visitorEmail: '',
    visitorPhone: '',
    need: '',
    lastMessage: '',
    lastSender: '',
    createdAt: now,
    updatedAt: now
  };
  await client.createEntity(session);
  return publicSession(session);
}

async function addMessage({ sessionId, sender, text, visitorName = '', visitorEmail = '', visitorPhone = '', need = '' }) {
  const cleanedText = clean(text);
  if (!sessionId || !cleanedText) throw new Error('Chat message is missing.');
  const client = await table();
  const session = await getSession(client, sessionId);
  const now = new Date().toISOString();
  const message = {
    partitionKey: messagePartition(sessionId),
    rowKey: `${Date.now()}_${id()}`,
    sessionId,
    sender: sender === 'rep' ? 'rep' : 'visitor',
    text: cleanedText,
    createdAt: now
  };
  await client.createEntity(message);
  await client.upsertEntity(
    {
      partitionKey: SESSION_PARTITION,
      rowKey: sessionId,
      status: session.status || 'active',
      pageUrl: session.pageUrl || '',
      visitorName: clean(visitorName, session.visitorName || ''),
      visitorEmail: clean(visitorEmail, session.visitorEmail || ''),
      visitorPhone: clean(visitorPhone, session.visitorPhone || ''),
      need: clean(need, session.need || ''),
      lastMessage: cleanedText,
      lastSender: message.sender,
      createdAt: session.createdAt,
      updatedAt: now
    },
    'Merge'
  );
  return publicMessage(message);
}

async function listMessages(sessionId) {
  if (!sessionId) throw new Error('Chat session is missing.');
  const client = await table();
  await getSession(client, sessionId);
  const messages = [];
  const entities = client.listEntities({ queryOptions: { filter: `PartitionKey eq '${messagePartition(sessionId)}'` } });
  for await (const entity of entities) messages.push(publicMessage(entity));
  return messages.sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
}

async function listSessions() {
  const client = await table();
  const sessions = [];
  const entities = client.listEntities({ queryOptions: { filter: `PartitionKey eq '${SESSION_PARTITION}'` } });
  for await (const entity of entities) sessions.push(publicSession(entity));
  return sessions.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))).slice(0, 50);
}

function unauthorized(context) {
  context.res = json(401, { error: 'Admin access required.' });
}

module.exports = {
  addMessage,
  assertAdmin,
  createSession,
  json,
  listMessages,
  listSessions,
  parseBody,
  unauthorized
};
