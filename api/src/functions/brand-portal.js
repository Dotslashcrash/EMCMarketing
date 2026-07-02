const { app } = require('@azure/functions');

function queryObject(request) {
  const values = {};
  for (const [key, value] of request.query.entries()) {
    values[key] = value;
  }
  return values;
}

function headerObject(request) {
  const values = {};
  for (const [key, value] of request.headers.entries()) {
    values[key.toLowerCase()] = value;
  }
  return values;
}

async function requestBody(request) {
  const text = await request.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function normalizeResponse(response) {
  if (!response) {
    return { status: 204 };
  }

  return {
    status: response.status || 200,
    headers: response.headers || {},
    body: response.body
  };
}

function registerRoute(name, methods, route, handler) {
  app.http(name, {
    methods,
    route,
    authLevel: 'anonymous',
    handler: async (request, context) => {
      const classicContext = { res: undefined, log: context.log };
      const classicRequest = {
        body: await requestBody(request),
        headers: headerObject(request),
        method: request.method,
        query: queryObject(request),
        url: request.url
      };

      await handler(classicContext, classicRequest);
      return normalizeResponse(classicContext.res);
    }
  });
}

registerRoute('admin-login', ['POST'], 'admin-login', require('../../admin-login'));
registerRoute('admin-materials', ['GET'], 'admin-materials', require('../../admin-materials'));
registerRoute('admin-upload', ['POST'], 'admin-upload', require('../../admin-upload'));
registerRoute('admin-create-token', ['POST'], 'admin-create-token', require('../../admin-create-token'));
registerRoute('admin-material', ['GET'], 'admin-material', require('../../admin-material'));
registerRoute('portal-login', ['POST'], 'portal-login', require('../../portal-login'));
registerRoute('portal-materials', ['GET'], 'portal-materials', require('../../portal-materials'));
registerRoute('portal-material', ['GET'], 'portal-material', require('../../portal-material'));
