const request = require('supertest');

// Provide minimal env vars before loading the app
process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_dummy';
process.env.CRAFTPLAN_BASE_URL = 'http://localhost:4000';
process.env.CORS_ALLOWED_ORIGINS = 'http://localhost:3000';

const app = require('../index');

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('404 handler', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Not found');
  });
});

describe('POST /api/payments/create-payment-intent', () => {
  it('returns 400 when amount is missing', async () => {
    const res = await request(app)
      .post('/api/payments/create-payment-intent')
      .send({ currency: 'usd' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 400 when amount is not a positive number', async () => {
    const res = await request(app)
      .post('/api/payments/create-payment-intent')
      .send({ amount: -100 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
