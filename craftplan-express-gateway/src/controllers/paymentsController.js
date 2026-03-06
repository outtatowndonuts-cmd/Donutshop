const Stripe = require('stripe');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('Missing required environment variable: STRIPE_SECRET_KEY');
}

const stripe = Stripe(stripeSecretKey);

/**
 * POST /api/payments/create-payment-intent
 *
 * Body: { amount: number (cents), currency?: string, metadata?: object }
 */
async function createPaymentIntent(req, res, next) {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res
        .status(400)
        .json({ error: '`amount` must be a positive number (in cents).' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });

    return res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/payments/payment-intent/:id
 *
 * Retrieve the status of an existing payment intent.
 */
async function getPaymentIntent(req, res, next) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
    return res.json({ status: paymentIntent.status, paymentIntent });
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /api/payments/webhook
 *
 * Stripe sends signed webhook events to this endpoint.
 * The route must receive the raw request body (not parsed JSON).
 */
function handleWebhook(req, res, next) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({ error: 'Webhook secret is not configured.' });
    }
    console.warn('[webhook] STRIPE_WEBHOOK_SECRET is not set — skipping verification (dev only).');
  }

  let event;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // Fallback for local development without a webhook secret
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error(`[webhook] signature verification failed: ${err.message}`);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log(`[webhook] payment_intent.succeeded: ${event.data.object.id}`);
        // TODO: fulfil order in Craftplan backend
        break;

      case 'payment_intent.payment_failed':
        console.warn(`[webhook] payment_intent.payment_failed: ${event.data.object.id}`);
        break;

      case 'charge.refunded':
        console.log(`[webhook] charge.refunded: ${event.data.object.id}`);
        break;

      default:
        console.log(`[webhook] unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
  } catch (err) {
    return next(err);
  }
}

module.exports = { createPaymentIntent, getPaymentIntent, handleWebhook };
