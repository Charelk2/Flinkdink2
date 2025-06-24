import { render, screen, waitFor, act } from '@testing-library/react';
import { useEffect } from 'react';
import { ProfileProvider, useProfiles, PROFILES_KEY } from './ProfileProvider';

const Display = () => {
  const { selectedProfile } = useProfiles();
  return (
    <div data-testid="selected">
      {selectedProfile ? selectedProfile.name : 'none'}
    </div>
  );
};

const Caller = ({ action }) => {
  const ctx = useProfiles();
  useEffect(() => {
    action(ctx);
  }, [ctx, action]);
  return null;
};

afterEach(() => {
  localStorage.clear();
});

describe('ProfileProvider storage', () => {
  test('loads stored profiles on init', () => {
    localStorage.setItem(
      PROFILES_KEY,
      JSON.stringify({
        version: 1,
        profiles: [{ id: '1', name: 'Tim' }],
        selectedId: '1',
      }),
    );

    render(
      <ProfileProvider>
        <Display />
      </ProfileProvider>,
    );

    expect(screen.getByTestId('selected')).toHaveTextContent('Tim');
  });

  test('createProfile saves to localStorage and selects', async () => {
    let createFn;

    render(
      <ProfileProvider>
        <Caller action={({ createProfile }) => { createFn = createProfile; }} />
        <Display />
      </ProfileProvider>,
    );

    act(() => createFn({ name: 'Sam' }));

    await waitFor(() => expect(screen.getByTestId('selected')).toHaveTextContent('Sam'));
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY));
    expect(stored.profiles[0].name).toBe('Sam');
    expect(stored.selectedId).toBe(stored.profiles[0].id);
  });
});

describe('selectProfile', () => {
  test('updates selectedId and persisted data', () => {
    localStorage.setItem(
      PROFILES_KEY,
      JSON.stringify({
        version: 1,
        profiles: [
          { id: '1', name: 'One' },
          { id: '2', name: 'Two' },
        ],
        selectedId: '1',
      }),
    );

    render(
      <ProfileProvider>
        <Display />
        <Caller action={({ selectProfile }) => selectProfile('2')} />
      </ProfileProvider>,
    );

    expect(screen.getByTestId('selected')).toHaveTextContent('Two');
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY));
    expect(stored.selectedId).toBe('2');
  });
});
