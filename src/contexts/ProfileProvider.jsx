import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const PROFILES_VERSION = 1;
export const PROFILES_KEY = 'profiles-v1';

const DEFAULT_DATA = {
  version: PROFILES_VERSION,
  profiles: [],
  selectedId: null,
};

const ProfileContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useProfiles() {
  return useContext(ProfileContext);
}

function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY));
    if (
      stored &&
      stored.version === PROFILES_VERSION &&
      Array.isArray(stored.profiles)
    ) {
      const withBadges = stored.profiles.map((p) => ({
        ...p,
        badges: Array.isArray(p.badges) ? p.badges : [],
      }));
      return { ...stored, profiles: withBadges };
    }
  } catch {
    // ignore JSON errors
  }
  return DEFAULT_DATA;
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
    const newProfile = { ...profile, id, badges: profile.badges || [] };
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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
