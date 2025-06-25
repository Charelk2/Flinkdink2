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

describe('unlockBadge', () => {
  test('adds badge to selected profile and persists', () => {
    let createFn;
    let unlockFn;
    render(
      <ProfileProvider>
        <Caller
          action={({ createProfile, unlockBadge }) => {
            createFn = createProfile;
            unlockFn = unlockBadge;
          }}
        />
      </ProfileProvider>,
    );

    act(() => createFn({ name: 'Mia' }));
    act(() => unlockFn('first-day'));
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY));
    expect(stored.profiles[0].badges).toContain('first-day');
  });

  test('does not duplicate badges', () => {
    let createFn;
    let unlockFn;
    render(
      <ProfileProvider>
        <Caller
          action={({ createProfile, unlockBadge }) => {
            createFn = createProfile;
            unlockFn = unlockBadge;
          }}
        />
      </ProfileProvider>,
    );

    act(() => createFn({ name: 'Mia' }));
    act(() => unlockFn('first-day'));
    act(() => unlockFn('first-day'));
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY));
    expect(stored.profiles[0].badges).toEqual(['first-day']);
  });
});

describe('editProfile', () => {
  test('updates stored profile data', async () => {
    let createFn;
    let editFn;

    render(
      <ProfileProvider>
        <Caller
          action={({ createProfile, editProfile }) => {
            createFn = createProfile;
            editFn = editProfile;
          }}
        />
        <Display />
      </ProfileProvider>,
    );

    act(() => createFn({ name: 'Mia' }));

    let id;
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(PROFILES_KEY));
      id = stored.profiles[0].id;
      expect(stored.profiles[0].name).toBe('Mia');
    });

    act(() => editFn(id, { name: 'Lily' }));

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(PROFILES_KEY));
      expect(stored.profiles[0].name).toBe('Lily');
      expect(stored.selectedId).toBe(id);
    });
  });
});

describe('deleteProfile', () => {
  test('removes profile and clears selectedId when deleted', async () => {
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

    let deleteFn;

    render(
      <ProfileProvider>
        <Caller action={({ deleteProfile }) => { deleteFn = deleteProfile; }} />
        <Display />
      </ProfileProvider>,
    );

    act(() => deleteFn('1'));

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(PROFILES_KEY));
      expect(stored.profiles).toHaveLength(1);
      expect(stored.profiles[0].id).toBe('2');
      expect(stored.selectedId).toBeNull();
    });
  });
});
