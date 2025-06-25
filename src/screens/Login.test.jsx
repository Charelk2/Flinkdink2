import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import Login from './Login';

test('renders login form', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});

test('shows server error detail on failed login', async () => {
  process.env.VITE_API_BASE_URL = '';
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 422,
    text: async () => JSON.stringify({ detail: 'Invalid credentials' }),
  });

  render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>,
  );

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@test.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'bad' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
});

afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
  delete process.env.VITE_API_BASE_URL;
});
