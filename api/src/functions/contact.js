const { app } = require('@azure/functions');

const recentLeads = new Map();
const recentIps = new Map();
const DUPLICATE_WINDOW_MS = 30 * 60 * 1000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MIN_SUBMIT_MS = 3000;
const MAX_SUBMIT_MS = 24 * 60 * 60 * 1000;
const MAX_IP_SUBMISSIONS = 5;

function json(status, jsonBody) {
  return {
    status,
    jsonBody,
    headers: {
      'Cache-Control': 'no-store'
    }
  };
}

function clean(value, fallback = '') {
  return String(value || fallback).trim().slice(0, 1800);
}

function line(label, value) {
  const cleaned = clean(value);
  return cleaned ? `${label}: ${cleaned}` : '';
}

function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0].trim() || request.headers.get('x-client-ip') || 'unknown';
}

function prune(map, now, maxAge) {
  for (const [key, value] of map.entries()) {
    const timestamp = typeof value === 'number' ? value : value.lastSeen;
    if (!timestamp || now - timestamp > maxAge) map.delete(key);
  }
}

function compactLead(body) {
  return [body.source, body.name, body.email, body.phone, body.need, body.message]
    .map((value) => clean(value).toLowerCase().replace(/\s+/g, ' '))
    .join('|');
}

function looksRandom(value) {
  const text = clean(value);
  const letters = text.replace(/[^a-z]/gi, '');
  if (letters.length < 12 || /\s/.test(text)) return false;
  const vowels = letters.match(/[aeiou]/gi)?.length || 0;
  const upperRuns = text.match(/[A-Z]{3,}/g)?.length || 0;
  const alternatingCase = /[a-z][A-Z][a-z]|[A-Z][a-z][A-Z]/.test(text);
  return vowels / letters.length < 0.28 || upperRuns > 1 || alternatingCase;
}

function spamReason(body, request) {
  const now = Date.now();
  const ip = clientIp(request);
  const submittedAt = Number(body.submittedAt || 0);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const message = clean(body.message || body.need);
  const leadKey = compactLead(body);

  prune(recentLeads, now, DUPLICATE_WINDOW_MS);
  prune(recentIps, now, RATE_WINDOW_MS);

  if (clean(body.website) || clean(body.companyWebsite) || clean(body.leadUrl)) return 'honeypot';
  if (!submittedAt || now - submittedAt < MIN_SUBMIT_MS || now - submittedAt > MAX_SUBMIT_MS) return 'submit_timing';
  if (recentLeads.has(leadKey)) return 'duplicate';

  const ipEntry = recentIps.get(ip) || { count: 0, lastSeen: now };
  if (ipEntry.count >= MAX_IP_SUBMISSIONS) return 'rate_limit';

  let score = 0;
  if (looksRandom(body.name)) score += 1;
  if (looksRandom(body.need)) score += 1;
  if (looksRandom(message)) score += 1;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) score += 1;
  if (phone && phone.replace(/\D/g, '').length > 0 && phone.replace(/\D/g, '').length < 10) score += 1;
  if (message.length < 8) score += 1;
  if (score >= 2) return 'content_score';

  recentLeads.set(leadKey, now);
  recentIps.set(ip, { count: ipEntry.count + 1, lastSeen: now });
  return '';
}

async function contact(request, context) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = clean(body.name, 'Website visitor');
    const source = clean(body.source, 'contact_form');
    const message = clean(body.message || body.need);

    if (!message) return json(400, { error: 'Add a message before sending.' });

    const blockedReason = spamReason(body, request);
    if (blockedReason) {
      context.warn(`Dropped suspected EMC contact spam: ${blockedReason}`);
      return json(200, { ok: true });
    }

    const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL;
    if (!webhookUrl) return json(500, { error: 'Contact notifications are not configured.' });

    const lines = [
      '*New EMC website contact*',
      '',
      line('Source', source),
      line('Name', name),
      line('Email', body.email),
      line('Phone', body.phone),
      line('Business need', body.need),
      line('Page', body.pageUrl),
      '',
      '*Message*',
      message,
      '',
      '*Reply note*',
      'Follow up by email or phone from the contact details above.'
    ].filter(Boolean);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lines.join('\n') })
    });

    if (!response.ok) throw new Error(`Google Chat rejected the contact alert with status ${response.status}.`);
    return json(200, { ok: true });
  } catch (error) {
    context.error(error);
    return json(500, { error: error.message || 'Could not send the contact alert.' });
  }
}

app.http('contact', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'contact',
  handler: contact
});

module.exports = { contact };
