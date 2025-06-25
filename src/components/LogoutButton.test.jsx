import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from '../contexts/authHelpers';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../contexts/authHelpers');

afterEach(() => {
  jest.clearAllMocks();
});

test('logs out and redirects to login', () => {
  const logout = jest.fn();
  useAuth.mockReturnValue({ logout });

  render(
    <MemoryRouter>
      <LogoutButton />
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: /log out/i }));
  expect(logout).toHaveBeenCalled();
  expect(mockNavigate).toHaveBeenCalledWith('/login');
});
