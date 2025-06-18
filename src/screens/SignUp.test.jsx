import { render, screen } from '@testing-library/react';
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
