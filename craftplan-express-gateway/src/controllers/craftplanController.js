const axios = require('axios');

const craftplanClient = axios.create({
  baseURL: process.env.CRAFTPLAN_BASE_URL || 'http://localhost:4000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Generic proxy helper.
 * Forwards the request to Craftplan and streams the response back.
 */
async function proxyRequest(method, path, { data, params, headers = {} } = {}) {
  // Forward the Authorization header if present
  const forwardHeaders = {};
  if (headers['authorization']) {
    forwardHeaders['Authorization'] = headers['authorization'];
  }

  const response = await craftplanClient.request({
    method,
    url: path,
    data,
    params,
    headers: forwardHeaders,
  });

  return response.data;
}

// ── Products ─────────────────────────────────────────────────────────────────

async function listProducts(req, res, next) {
  try {
    const data = await proxyRequest('GET', '/api/products', {
      params: req.query,
      headers: req.headers,
    });
    return res.json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

async function getProduct(req, res, next) {
  try {
    const data = await proxyRequest('GET', `/api/products/${req.params.id}`, {
      headers: req.headers,
    });
    return res.json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

// ── Orders ────────────────────────────────────────────────────────────────────

async function listOrders(req, res, next) {
  try {
    const data = await proxyRequest('GET', '/api/orders', {
      params: req.query,
      headers: req.headers,
    });
    return res.json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

async function getOrder(req, res, next) {
  try {
    const data = await proxyRequest('GET', `/api/orders/${req.params.id}`, {
      headers: req.headers,
    });
    return res.json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

async function createOrder(req, res, next) {
  try {
    const data = await proxyRequest('POST', '/api/orders', {
      data: req.body,
      headers: req.headers,
    });
    return res.status(201).json(data);
  } catch (err) {
    return next(craftplanError(err));
  }
}

async function updateOrder(req, res, next) {
  try {
    const data = await proxyRequest('PUT', `/api/orders/${req.params.id}`, {
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
  try {
    const data = await proxyRequest('GET', `/api/customers/${req.params.id}`, {
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
