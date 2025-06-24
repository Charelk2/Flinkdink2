import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProfileProvider, PROFILES_KEY } from '../contexts/ProfileProvider';
import OnboardingHome from './OnboardingHome';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

test('submits valid form and redirects', () => {
  render(
    <MemoryRouter>
      <ProfileProvider>
        <OnboardingHome />
      </ProfileProvider>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: 'Sam' },
  });
  fireEvent.change(screen.getByLabelText(/date of birth/i), {
    target: { value: '2020-01-01' },
  });
  fireEvent.click(screen.getByRole('button', { name: /create profile/i }));

  expect(mockNavigate).toHaveBeenCalledWith('/select-kid');
  const stored = JSON.parse(localStorage.getItem(PROFILES_KEY));
  expect(stored.profiles[0].name).toBe('Sam');
});

test('shows error for missing name', () => {
  render(
    <MemoryRouter>
      <ProfileProvider>
        <OnboardingHome />
      </ProfileProvider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: /create profile/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/name is required/i);
});

