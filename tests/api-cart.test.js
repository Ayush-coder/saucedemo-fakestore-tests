const request = require('supertest');
const baseUrl = 'https://fakestoreapi.com';
require('dotenv').config(); // Load environment variables from .env file

describe('FakeStoreAPI Cart Service Performance Verification', () => {
  let authToken = '';

  beforeAll(async () => {
    const authResponse = await request(baseUrl)
      .post('/auth/login')
      .send({
        username: process.env.FAKESTORE_USER,
        password: process.env.FAKESTORE_PASSWORD
      });
    authToken = authResponse.body.token;
  });

  // 1. Positive CRUD Flows
  describe('Standard Cart Operations Execution', () => {
    let activeCartId = 1;

    test('POST /carts - Formulate New Shopping Cart Resource', async () => {
      const response = await request(baseUrl)
        .post('/carts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          userId: 5,
          date: "2020-02-03",
          products: [{ productId: 2, quantity: 4 }]
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    test('GET /carts/:id - Specific Resource Extraction', async () => {
      const response = await request(baseUrl).get(`/carts/${activeCartId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(activeCartId);
    });

    test('PUT /carts/:id - Modify Existing Cart State', async () => {
      const response = await request(baseUrl)
        .put(`/carts/${activeCartId}`)
        .send({
          userId: 3,
          date: "2019-12-10",
          products: [{ productId: 1, quantity: 3 }]
        });
      expect(response.statusCode).toBe(200);
    });

    test('DELETE /carts/:id - Purge Target Cart Resource', async () => {
      const response = await request(baseUrl).delete(`/carts/${activeCartId}`);
      expect(response.statusCode).toBe(200);
    });
  });

  // 2. Negative Verification Contexts
  describe('Boundary and Security Edge Testing Scenarios', () => {
    test('POST /carts - Decline Malformed Object Formatting payload', async () => {
      const response = await request(baseUrl)
        .post('/carts')
        .send("Invalid Text String Body Data");
      expect(response.statusCode).not.toBe(500);
    });
  });

  // 3. Data-Driven Scenarios Execution Loop
  describe('Data-Driven Variations Iteration Matrix', () => {
    const matrixPayloads = [
      { prodId: 1, qty: 5 },
      { prodId: 4, qty: 12 },
      { prodId: 7, qty: 1 }
    ];

    matrixPayloads.forEach(({ prodId, qty }) => {
      test(`Verify Data Entry Injection Sequence - Product Ref: ${prodId}`, async () => {
        const payload = {
          userId: 1,
          date: "2023-01-01",
          products: [{ productId: prodId, quantity: qty }]
        };
        const response = await request(baseUrl).post('/carts').send(payload);
        expect(response.statusCode).toBe(201);
      });
    });
  });

  // 4. Schema Snapshot Verification Rule (Contract Testing Requirement)
  describe('API Contract Shape Invariance Assurance', () => {
    test('Validate structural conformance against Golden Master Template', async () => {
      const response = await request(baseUrl).get('/carts/1');
      expect(response.statusCode).toBe(200);
      
      // Dynamic baseline structural enforcement logic using Snapshot Strategy
      expect(response.body).toMatchSnapshot({
        id: expect.any(Number),
        userId: expect.any(Number),
        date: expect.any(String),
        products: expect.any(Array)
      });
    });
  });
});
