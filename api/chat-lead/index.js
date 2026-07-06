const { json, parseBody } = require('../shared');

function clean(value, fallback = '') {
  return String(value || fallback).trim().slice(0, 1800);
}

function line(label, value) {
  const cleaned = clean(value);
  return cleaned ? `${label}: ${cleaned}` : '';
}

module.exports = async function (context, req) {
  try {
    const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL;
    if (!webhookUrl) {
      context.res = json(500, { error: 'Google Chat notifications are not configured.' });
      return;
    }

    const body = parseBody(req);
    const name = clean(body.name, 'Website visitor');
    const source = clean(body.source, 'website_chat');
    const message = clean(body.message || body.need);

    if (!message) {
      context.res = json(400, { error: 'Add a message before sending.' });
      return;
    }

    const lines = [
      '*New EMC website lead*',
      '',
      line('Source', source),
      line('Name', name),
      line('Email', body.email),
      line('Phone', body.phone),
      line('Business need', body.need),
      line('Page', body.pageUrl),
      '',
      '*Message*',
      message
    ].filter(Boolean);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lines.join('\n') })
    });

    if (!response.ok) {
      throw new Error(`Google Chat rejected the alert with status ${response.status}.`);
    }

    context.res = json(200, { ok: true });
  } catch (error) {
    context.res = json(500, { error: error.message || 'Could not send the Google Chat alert.' });
  }
};
