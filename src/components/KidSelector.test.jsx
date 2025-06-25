import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import KidSelector from './KidSelector';
import { useProfiles } from '../contexts/ProfileProvider';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

jest.mock('../contexts/ProfileProvider');

const profiles = [
  { id: '1', name: 'Sam', birthday: '2020-01-01', avatar: '🐶' },
  { id: '2', name: 'Tim', birthday: '2019-06-15', avatar: '🐱' },
];

beforeEach(() => {
  useProfiles.mockReturnValue({
    profiles,
    selectProfile: jest.fn(),
    deleteProfile: jest.fn(),
    editProfile: jest.fn(),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('selects profile and navigates to hub', () => {
  const { selectProfile } = useProfiles.mock.results[0].value;
  render(
    <MemoryRouter>
      <KidSelector />
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByLabelText('Select Sam'));
  expect(selectProfile).toHaveBeenCalledWith('1');
  expect(mockNavigate).toHaveBeenCalledWith('/learning-hub');
});

test('deletes profile when confirmed', () => {
  const { deleteProfile } = useProfiles.mock.results[0].value;
  render(
    <MemoryRouter>
      <KidSelector />
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByLabelText('Delete Sam'));
  fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
  expect(deleteProfile).toHaveBeenCalledWith('1');
});

test('edits profile name', () => {
  const { editProfile } = useProfiles.mock.results[0].value;
  render(
    <MemoryRouter>
      <KidSelector />
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByLabelText('Edit Sam'));
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sally' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  expect(editProfile).toHaveBeenCalledWith('1', expect.objectContaining({ name: 'Sally' }));
});
