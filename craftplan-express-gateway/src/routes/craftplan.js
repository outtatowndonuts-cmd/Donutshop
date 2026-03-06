const express = require('express');
const {
  listProducts,
  getProduct,
  listOrders,
  getOrder,
  createOrder,
  updateOrder,
  getCustomer,
} = require('../controllers/craftplanController');

const router = express.Router();

// ── Products ──────────────────────────────────────────────────────────────────
router.get('/products', listProducts);
router.get('/products/:id', getProduct);

// ── Orders ────────────────────────────────────────────────────────────────────
router.get('/orders', listOrders);
router.get('/orders/:id', getOrder);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);

// ── Customers ─────────────────────────────────────────────────────────────────
router.get('/customers/:id', getCustomer);

module.exports = router;
