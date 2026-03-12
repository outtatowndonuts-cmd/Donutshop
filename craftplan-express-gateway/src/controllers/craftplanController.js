const axios = require('axios');
const debug = require('../middleware/debugLogger');

const craftplanClient = axios.create({
  baseURL: process.env.CRAFTPLAN_BASE_URL || 'http://localhost:4000',
  timeout: 10000,
});

/**
 * Generic proxy helper.
 * Forwards the request to Craftplan and streams the response back.
 */
async function proxyRequest(method, path, { data, params, headers = {} } = {}) {
  debug('Proxy request', { method, path, data, params, headers });
  try {
    // Always send Accept header required by Craftplan API
    const mergedHeaders = {
      Accept: 'application/vnd.api+json',
      ...headers,
    };
    // Only set Content-Type for requests with a body
    if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      mergedHeaders['Content-Type'] = 'application/json';
    }
    const response = await craftplanClient.request({
      method,
      url: path,
      data,
      params,
      headers: mergedHeaders,
    });
    debug('Proxy response', { status: response.status, statusText: response.statusText, url: response.config.url, data: response.data });
    return response.data;
  } catch (err) {
    if (err.response) {
      debug('Proxy error response', { status: err.response.status, statusText: err.response.statusText, url: err.config.url, data: err.response.data });
    } else {
      debug('Proxy error', err);
    }
    throw err;
  }
}

// ── Products ─────────────────────────────────────────────────────────────────

async function listProducts(req, res, next) {
  debug('listProducts called', { query: req.query });
  try {
    const data = await proxyRequest('GET', '/api/json/products', {
      params: req.query,
      headers: req.headers,
    });
    return res.json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

async function getProduct(req, res, next) {
  debug('getProduct called', { id: req.params.id });
  try {
    const data = await proxyRequest('GET', `/api/json/products/${req.params.id}`, {
      headers: req.headers,
    });
    return res.json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

// ── Orders ────────────────────────────────────────────────────────────────────

async function listOrders(req, res, next) {
  debug('listOrders called', { query: req.query });
  try {
    const data = await proxyRequest('GET', '/api/json/orders', {
      params: req.query,
      headers: req.headers,
    });
    return res.json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

async function getOrder(req, res, next) {
  debug('getOrder called', { id: req.params.id });
  try {
    const data = await proxyRequest('GET', `/api/json/orders/${req.params.id}`, {
      headers: req.headers,
    });
    return res.json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

async function createOrder(req, res, next) {
  debug('createOrder called', { body: req.body });
  try {
    const data = await proxyRequest('POST', '/api/json/orders', {
      data: req.body,
      headers: req.headers,
    });
    return res.status(201).json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

async function updateOrder(req, res, next) {
  debug('updateOrder called', { id: req.params.id, body: req.body });
  try {
    const data = await proxyRequest('PUT', `/api/json/orders/${req.params.id}`, {
      data: req.body,
      headers: req.headers,
    });
    return res.json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

// ── Customers ─────────────────────────────────────────────────────────────────

async function getCustomer(req, res, next) {
  debug('getCustomer called', { id: req.params.id });
  try {
    const data = await proxyRequest('GET', `/api/json/customers/${req.params.id}`, {
      headers: req.headers,
    });
    return res.json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

// ── Error normalisation ───────────────────────────────────────────────────────

/**
 * Convert an axios error from the Craftplan backend into a standard Error
 * that carries the upstream HTTP status code.
 */
function craftplanError(err) {
  if (err.response) {
    const status = err.response.status;
    const message =
      (err.response.data && (err.response.data.message || err.response.data.error)) ||
      `Craftplan responded with ${status}`;
    const error = new Error(message);
    error.status = status;
    return error;
  }
  if (err.request) {
    const error = new Error('Craftplan backend is unreachable');
    error.status = 503;
    return error;
  }
  return err;
}

module.exports = {
  listProducts,
  getProduct,
  listOrders,
  getOrder,
  createOrder,
  updateOrder,
  getCustomer,
};
