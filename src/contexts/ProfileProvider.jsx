/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const PROFILES_VERSION = 1;
export const PROFILES_KEY = 'profiles-v1';

export const PROGRESS_VERSION = 1;
export const PROGRESS_KEY = 'progress-v1';
export const DEFAULT_PROGRESS = {
  version: PROGRESS_VERSION,
  week: 1,
  day: 1,
  session: 1,
  streak: 0,
};

const DEFAULT_DATA = {
  version: PROFILES_VERSION,
  profiles: [],
  selectedId: null,
};

const ProfileContext = createContext();

export function useProfiles() {
  return useContext(ProfileContext);
}

function loadData() {
  const result = {
    version: PROFILES_VERSION,
    profiles: [],
    selectedId: null,
  };

  try {
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY));
    if (
      stored &&
      stored.version === PROFILES_VERSION &&
      Array.isArray(stored.profiles)
    ) {
      result.profiles = stored.profiles.map((p) => ({
        ...p,
        badges: Array.isArray(p.badges) ? p.badges : [],
        progress:
          p.progress && p.progress.version === PROGRESS_VERSION
            ? { ...DEFAULT_PROGRESS, ...p.progress }
            : DEFAULT_PROGRESS,
      }));
      result.selectedId = stored.selectedId || null;
    }
  } catch {
    // ignore JSON errors
  }

  try {
    const legacy = JSON.parse(localStorage.getItem(PROGRESS_KEY));
    if (legacy && legacy.version === PROGRESS_VERSION && result.selectedId) {
      const idx = result.profiles.findIndex((p) => p.id === result.selectedId);
      if (idx !== -1) {
        result.profiles[idx] = {
          ...result.profiles[idx],
          progress: { ...DEFAULT_PROGRESS, ...legacy },
        };
        localStorage.removeItem(PROGRESS_KEY);
      }
    }
  } catch {
    // ignore migration errors
  }

  return result;
}

export const ProfileProvider = ({ children }) => {
  const { profiles: initProfiles, selectedId: initSelected } = loadData();
  const [profiles, setProfiles] = useState(initProfiles);
  const [selectedId, setSelectedId] = useState(initSelected);

  useEffect(() => {
    localStorage.setItem(
      PROFILES_KEY,
      JSON.stringify({ version: PROFILES_VERSION, profiles, selectedId }),
    );
  }, [profiles, selectedId]);

  const createProfile = (profile) => {
    const id =
      profile.id || (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString());
    const newProfile = {
      ...profile,
      id,
      badges: profile.badges || [],
      progress: profile.progress || DEFAULT_PROGRESS,
    };
    setProfiles((prev) => [...prev, newProfile]);
    setSelectedId(id);
  };

  const editProfile = (id, updates) => {
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProfile = (id) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  };

  const selectProfile = (id) => {
    if (profiles.some((p) => p.id === id)) {
      setSelectedId(id);
    }
  };

  const unlockBadge = (badgeId) => {
    if (!selectedId) return;
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== selectedId) return p;
        const badges = Array.isArray(p.badges) ? p.badges : [];
        if (badges.includes(badgeId)) return p;
        return { ...p, badges: [...badges, badgeId] };
      }),
    );
  };

  const setProgress = (progress) => {
    if (!selectedId) return;
    setProfiles((prev) =>
      prev.map((p) => (p.id === selectedId ? { ...p, progress } : p)),
    );
  };

  const selectedProfile = profiles.find((p) => p.id === selectedId) || null;

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        selectedProfile,
        selectedId,
        createProfile,
        editProfile,
        deleteProfile,
        selectProfile,
        unlockBadge,
        setProgress,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
