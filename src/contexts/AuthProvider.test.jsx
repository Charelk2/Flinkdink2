import { render, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { AuthProvider } from './AuthProvider';
import { useAuth } from './authHelpers';

const Caller = ({ action }) => {
  const auth = useAuth();
  useEffect(() => {
    action(auth);
  }, [auth, action]);
  return null;
};

afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
  delete process.env.VITE_API_BASE_URL;
});

describe('AuthProvider base URL', () => {
  test('login uses configured base URL', async () => {
    process.env.VITE_API_BASE_URL = 'http://test';
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 't' }),
    });
    global.fetch = fetchMock;

    render(
      <AuthProvider>
        <Caller action={({ login }) => login('a', 'b')} />
      </AuthProvider>,
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe('http://test/api/login');
  });

  test('register uses configured base URL', async () => {
    process.env.VITE_API_BASE_URL = 'http://test';
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 't' }),
    });
    global.fetch = fetchMock;

    render(
      <AuthProvider>
        <Caller action={({ register }) => register('a', 'b')} />
      </AuthProvider>,
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe('http://test/api/register');
  });
});
