const PROFILES_KEY = 'lq_profiles_v2';
const ACTIVE_USER_KEY = 'lq_active_username_v2';

export function createDefaultProfile(username) {
  return {
    username: username.trim(),
    selectedLevelId: 'A1',
    activeTab: 'vocab',
    vocabSubMode: 'quiz',
    grammarSubMode: 'quiz',
    xp: 0,
    streak: 0,
    bestStreak: 0,
    solvedWordsByLevel: {
      A1: [],
      A2: [],
      B1: [],
      B2: [],
      C1: [],
      C2: []
    },
    solvedGrammarByLevel: {
      A1: [],
      A2: [],
      B1: [],
      B2: [],
      C1: [],
      C2: []
    },
    lastActiveAt: new Date().toISOString()
  };
}

export function getAllProfiles() {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function getActiveUsername() {
  return localStorage.getItem(ACTIVE_USER_KEY) || '';
}

export function setActiveUsername(username) {
  if (!username) {
    localStorage.removeItem(ACTIVE_USER_KEY);
  } else {
    localStorage.setItem(ACTIVE_USER_KEY, username.trim());
  }
}

export function getOrCreateProfile(username) {
  const clean = username.trim();
  const profiles = getAllProfiles();
  const key = clean.toLowerCase();

  if (profiles[key]) {
    return profiles[key];
  }

  const fresh = createDefaultProfile(clean);
  profiles[key] = fresh;
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  return fresh;
}

export function saveProfile(profile) {
  if (!profile || !profile.username) return;
  const profiles = getAllProfiles();
  const key = profile.username.trim().toLowerCase();
  profiles[key] = {
    ...profile,
    lastActiveAt: new Date().toISOString()
  };
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function deleteProfile(username) {
  const profiles = getAllProfiles();
  const key = username.trim().toLowerCase();
  delete profiles[key];
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}
