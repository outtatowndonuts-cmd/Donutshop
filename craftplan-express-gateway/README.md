# craftplan-express-gateway

A Node.js / Express API gateway that acts as the backend-for-frontend (BFF) for the Donutshop e-commerce site.

It provides:

- **Stripe payment flows** – create `PaymentIntent`s, verify signed webhook events, and retrieve payment status.
- **Craftplan proxy** – forwards REST calls from the React frontend to the Elixir/Phoenix + PostgreSQL Craftplan backend.
- **CORS** – pre-configured for the React dev server and configurable for production.
- **Centralised error handling & request logging** – consistent JSON error responses and timestamped request logs.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| npm | ≥ 9 |

---

## Setup

### 1 — Clone & install

```bash
cd craftplan-express-gateway
npm install
```

### 2 — Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

| Variable | Description |
|----------|-------------|
| `PORT` | Port to listen on (default: `3001`) |
| `NODE_ENV` | `development` or `production` |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_…` or `sk_live_…`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe CLI / dashboard webhook signing secret (`whsec_…`) |
| `CRAFTPLAN_BASE_URL` | Base URL of the Craftplan Phoenix backend (e.g. `http://localhost:4000`) |
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of allowed origins (e.g. `http://localhost:3000`) |

### 3 — Start the server

```bash
# Production
npm start

# Development (auto-restart with nodemon)
npm run dev
```

The gateway will be available at `http://localhost:3001`.

---

## API Reference

### Health check

```
GET /health
→ 200 { "status": "ok" }
```

---

### Payments (`/api/payments`)

#### Create a PaymentIntent

```
POST /api/payments/create-payment-intent
Content-Type: application/json

{
  "amount": 2999,        // required — amount in cents
  "currency": "usd",    // optional — defaults to "usd"
  "metadata": {}        // optional — arbitrary key/value pairs
}

→ 201 { "clientSecret": "pi_…_secret_…", "paymentIntentId": "pi_…" }
```

Pass the `clientSecret` to the Stripe.js `confirmPayment()` call in your React frontend.

#### Retrieve a PaymentIntent

```
GET /api/payments/payment-intent/:id

→ 200 { "status": "succeeded", "paymentIntent": { … } }
```

#### Stripe webhook

```
POST /api/payments/webhook
Stripe-Signature: <computed by Stripe>
Content-Type: application/json   (raw body)
```

Register this URL in the [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks) or with the [Stripe CLI](https://stripe.com/docs/stripe-cli):

```bash
stripe listen --forward-to http://localhost:3001/api/payments/webhook
```

---

### Craftplan proxy (`/api/craftplan`)

All routes forward the request (including the `Authorization` header) to the Craftplan backend.

| Method | Path | Craftplan endpoint |
|--------|------|--------------------|
| `GET` | `/api/craftplan/products` | `GET /api/products` |
| `GET` | `/api/craftplan/products/:id` | `GET /api/products/:id` |
| `GET` | `/api/craftplan/orders` | `GET /api/orders` |
| `GET` | `/api/craftplan/orders/:id` | `GET /api/orders/:id` |
| `POST` | `/api/craftplan/orders` | `POST /api/orders` |
| `PUT` | `/api/craftplan/orders/:id` | `PUT /api/orders/:id` |
| `GET` | `/api/craftplan/customers/:id` | `GET /api/customers/:id` |

---

## Project structure

```
craftplan-express-gateway/
├── src/
│   ├── index.js                    # Express app entry point
│   ├── routes/
│   │   ├── payments.js             # Stripe route definitions
│   │   └── craftplan.js            # Craftplan proxy route definitions
│   ├── controllers/
│   │   ├── paymentsController.js   # Stripe business logic
│   │   └── craftplanController.js  # Axios proxy helpers
│   ├── middleware/
│   │   ├── logger.js               # Request logger
│   │   └── errorHandler.js         # Centralised error handler
│   └── __tests__/
│       └── app.test.js             # Jest/Supertest tests
├── .env.example                    # Sample environment file
├── package.json
└── README.md
```

---

## Running tests

```bash
npm test
```

---

## Notes

- The `/api/payments/webhook` route is registered **before** `express.json()` so that Stripe can verify the raw request body signature.
- In production, set `NODE_ENV=production` — stack traces are omitted from error responses.
- The Craftplan proxy forwards the `Authorization` header, so JWT/Bearer token auth from the React app flows through transparently.
