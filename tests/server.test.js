/**
 * @jest-environment node
 */
import request from 'supertest';

let app;
beforeAll(async () => {
  process.env.DB_PATH = ':memory:';
  process.env.JWT_SECRET = 'testsecret';
  process.env.NODE_ENV = 'test';
  app = (await import('../server.js')).default;
});

describe('auth endpoints', () => {
  test('registers and logs in a user', async () => {
    const regRes = await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'pass' });
    expect(regRes.status).toBe(200);
    expect(regRes.body.token).toBeDefined();

    const loginRes = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'pass' });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.token).toBeDefined();
  });

  test('fails login with wrong password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'wrong' });
    expect(res.status).toBe(422);
    expect(res.body.detail).toBe('Invalid credentials');
  });

  test('fails registering existing user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'newpass' });
    expect(res.status).toBe(422);
    expect(res.body.detail).toBe('User already exists');
  });

  test('fails login for non-existent user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'missing@example.com', password: 'pass' });
    expect(res.status).toBe(422);
    expect(res.body.detail).toBe('Invalid credentials');
  });
});
