const express = require('express');
const {
  createPaymentIntent,
  getPaymentIntent,
  handleWebhook,
} = require('../controllers/paymentsController');

const router = express.Router();

// Stripe webhook — must be registered BEFORE express.json() parses the body.
// The raw body is preserved because the app registers
// express.raw() for this exact path in src/index.js.
router.post('/webhook', handleWebhook);

// Create a new PaymentIntent
router.post('/create-payment-intent', createPaymentIntent);

// Retrieve an existing PaymentIntent by ID
router.get('/payment-intent/:id', getPaymentIntent);

module.exports = router;
