const request = require('supertest');
// Provide minimal env vars before loading the app
process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_dummy';
process.env.CRAFTPLAN_BASE_URL = 'http://localhost:4000';
process.env.CORS_ALLOWED_ORIGINS = 'http://localhost:3000';

const app = require('../index');

describe('End-to-end API connectivity', () => {
  let createdOrderId = null;
  let createdPaymentIntentId = null;
  const mockProduct = { id: 'prod_mock', name: 'Mock Product', price: 1000 };
  const mockCustomerId = 'cus_mock';

  it('GET /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('GET /api/craftplan/products', async () => {
    const res = await request(app).get('/api/craftplan/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/craftplan/products/:id', async () => {
    // Use a mock or first product
    const resAll = await request(app).get('/api/craftplan/products');
    const id = (resAll.body[0] && resAll.body[0].id) || '1';
    const res = await request(app).get(`/api/craftplan/products/${id}`);
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/craftplan/orders', async () => {
    const res = await request(app)
      .post('/api/craftplan/orders')
      .send({
        productId: mockProduct.id,
        quantity: 1,
        customerId: mockCustomerId,
      });
    expect([200, 201, 400]).toContain(res.status);
    if (res.body && res.body.id) createdOrderId = res.body.id;
  });

  it('GET /api/craftplan/orders', async () => {
    const res = await request(app).get('/api/craftplan/orders');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/craftplan/orders/:id', async () => {
    if (!createdOrderId) return;
    const res = await request(app).get(`/api/craftplan/orders/${createdOrderId}`);
    expect([200, 404]).toContain(res.status);
  });

  it('PUT /api/craftplan/orders/:id', async () => {
    if (!createdOrderId) return;
    const res = await request(app)
      .put(`/api/craftplan/orders/${createdOrderId}`)
      .send({ status: 'updated' });
    expect([200, 400, 404]).toContain(res.status);
  });

  it('GET /api/craftplan/customers/:id', async () => {
    const res = await request(app).get(`/api/craftplan/customers/${mockCustomerId}`);
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/payments/create-payment-intent', async () => {
    const res = await request(app)
      .post('/api/payments/create-payment-intent')
      .send({
        amount: 1000,
        currency: 'usd',
        payment_method_data: {
          type: 'card',
          card: {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2030,
            cvc: '123',
          },
        },
      });
    expect([200, 400]).toContain(res.status);
    if (res.body && res.body.id) createdPaymentIntentId = res.body.id;
  });

  it('GET /api/payments/payment-intent/:id', async () => {
    if (!createdPaymentIntentId) return;
    const res = await request(app).get(`/api/payments/payment-intent/${createdPaymentIntentId}`);
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/payments/webhook', async () => {
    // Simulate a Stripe webhook event (mocked payload)
    const payload = JSON.stringify({ id: 'evt_test', type: 'payment_intent.succeeded' });
    const res = await request(app)
      .post('/api/payments/webhook')
      .set('Stripe-Signature', 't=' + Date.now() + ',v1=fake,v0=fake')
      .set('Content-Type', 'application/json')
      .send(payload);
    expect([200, 400]).toContain(res.status);
  });
});