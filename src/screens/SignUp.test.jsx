import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import SignUp from './SignUp';

test('renders sign up form', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </BrowserRouter>
  );
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});

test('shows server error detail on failed registration', async () => {
  process.env.VITE_API_BASE_URL = '';
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 422,
    text: async () => JSON.stringify({ detail: 'User already exists' }),
  });

  render(
    <BrowserRouter>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </BrowserRouter>,
  );

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'dup@test.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
  fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(screen.getByRole('alert')).toHaveTextContent('User already exists');
});

afterEach(() => {
  jest.restoreAllMocks();
  delete global.fetch;
  delete process.env.VITE_API_BASE_URL;
});
