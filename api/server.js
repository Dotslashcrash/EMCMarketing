const express = require('express');

const routes = [
  ['post', '/api/admin-login', require('./admin-login')],
  ['get', '/api/admin-materials', require('./admin-materials')],
  ['post', '/api/admin-upload', require('./admin-upload')],
  ['post', '/api/admin-create-token', require('./admin-create-token')],
  ['post', '/api/admin-change-password', require('./admin-change-password')],
  ['get', '/api/admin-material', require('./admin-material')],
  ['post', '/api/chat-lead', require('./chat-lead')],
  ['post', '/api/portal-login', require('./portal-login')],
  ['get', '/api/portal-materials', require('./portal-materials')],
  ['get', '/api/portal-material', require('./portal-material')]
];

function sendResult(res, result) {
  const response = result || { status: 204 };
  for (const [key, value] of Object.entries(response.headers || {})) {
    res.setHeader(key, value);
  }
  res.status(response.status || 200);
  if (Buffer.isBuffer(response.body)) {
    res.end(response.body);
    return;
  }
  res.send(response.body || '');
}

function wrap(handler) {
  return async (req, res) => {
    const context = { res: undefined };
    try {
      await handler(context, {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query,
        url: req.originalUrl
      });
      sendResult(res, context.res);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Brand portal API failed.' });
    }
  };
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '25mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

for (const [method, route, handler] of routes) {
  app[method](route, wrap(handler));
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Brand portal API listening on ${port}`);
});
