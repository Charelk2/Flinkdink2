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

describe('photo endpoint', () => {
  beforeEach(() => {
    process.env.UNSPLASH_ACCESS_KEY = 'abc';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returns photo URLs on success', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          { urls: { raw: 'http://img.test/photo-small.jpg' } },
        ],
      }),
    });

    const res = await request(app)
      .get('/api/photos')
      .query({ query: 'cats' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      small: 'http://img.test/photo-small.jpg?w=640&h=360&fit=crop&crop=faces,entropy',
      regular:
        'http://img.test/photo-small.jpg?w=640&h=360&fit=crop&crop=faces,entropy',
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  test('adds crop params with ampersand when query exists', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          { urls: { raw: 'http://img.test/photo-small.jpg?foo=1' } },
        ],
      }),
    });

    const res = await request(app)
      .get('/api/photos')
      .query({ query: 'cats' });

    expect(res.status).toBe(200);
    expect(res.body.small).toBe(
      'http://img.test/photo-small.jpg?foo=1&w=640&h=360&fit=crop&crop=faces,entropy',
    );
  });

  const translations = [
    ['Jagwindhond', 'greyhound'],
    ['Dashond', 'Dachshund'],
    ['Bloedhond', 'Bloodhound'],
    ['Siamese kat', 'Siamese cat'],
  ];

  test.each(translations)(
    'translates %s to English',
    async (afrikaans, english) => {
      const spy = jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
          results: [
            { urls: { raw: `http://img.test/${english}.jpg` } },
          ],
        }),
      });

      const res = await request(app)
        .get('/api/photos')
        .query({ query: afrikaans });

      expect(res.status).toBe(200);
      expect(res.body.small).toBe(
        `http://img.test/${english}.jpg?w=640&h=360&fit=crop&crop=faces,entropy`,
      );
      expect(res.body.regular).toBe(
        `http://img.test/${english}.jpg?w=640&h=360&fit=crop&crop=faces,entropy`,
      );
      const encoded = encodeURIComponent(english);
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining(encoded),
        expect.any(Object),
      );
    },
  );

  test('returns requested format', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          { urls: { raw: 'http://img.test/s.jpg' } },
        ],
      }),
    });

    const res = await request(app)
      .get('/api/photos')
      .query({ query: 'cats', format: 'regular' });

    expect(res.status).toBe(200);
    expect(res.body.url).toBe(
      'http://img.test/s.jpg?w=640&h=360&fit=crop&crop=faces,entropy',
    );
  });

  test('requests compressed photo', async () => {
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [{ urls: { raw: 's' } }],
      }),
    });

    const res = await request(app)
      .get('/api/photos')
      .query({ query: 'cats' });

    expect(res.status).toBe(200);
    const callUrl = spy.mock.calls[0][0];
    expect(callUrl).toContain('orientation=landscape');
    expect(callUrl).toContain('per_page=1');
    expect(callUrl).not.toContain('fit=crop');

    expect(res.body.small).toContain('w=640');
    expect(res.body.small).toContain('h=360');
    expect(res.body.small).toContain('fit=crop');
    expect(res.body.small).toContain('crop=faces,entropy');
  });

  test('trims query before sending to Unsplash', async () => {
    const spy = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [{ urls: { raw: 'http://img.test/dal.jpg' } }],
      }),
    });

    const res = await request(app)
      .get('/api/photos')
      .query({ query: '  Dalmatian  ' });

    expect(res.status).toBe(200);
    expect(res.body.small).toBe(
      'http://img.test/dal.jpg?w=640&h=360&fit=crop&crop=faces,entropy',
    );
    const encoded = encodeURIComponent('Dalmatian');
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(encoded),
      expect.any(Object),
    );
  });

  test('handles failed Unsplash response', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 503,
      text: async () => 'Error',
    });

    const res = await request(app)
      .get('/api/photos')
      .query({ query: 'dogs' });

    expect(res.status).toBe(404);
    expect(res.body.detail).toBe('Unsplash request failed');
  });
});
