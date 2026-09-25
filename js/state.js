import { DEFAULT_STATE, STORAGE_KEY } from './data.js';

export const state = structuredClone(DEFAULT_STATE);

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved) Object.assign(state, saved);
  } catch (error) { console.warn('Could not read EngSphere state', error); }
  state.history = Array.isArray(state.history) ? state.history : [];
  state.reviewQuestions = Array.isArray(state.reviewQuestions) ? state.reviewQuestions : [];
  state.profiles = Array.isArray(state.profiles) && state.profiles.length ? state.profiles : DEFAULT_STATE.profiles;
  state.users = Array.isArray(state.users) && state.users.length ? state.users : DEFAULT_STATE.users;
  state.personalizedLearning = { ...DEFAULT_STATE.personalizedLearning, ...(state.personalizedLearning || {}) };
}

export function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (error) { console.warn('Could not save EngSphere state', error); }
}

export function levelForXp(xp) { return Math.max(1, Math.min(9, Math.floor(xp / 100) + 1)); }
export function levelLabel(level) { return level <= 2 ? 'Beginner' : level <= 5 ? 'Intermediate' : 'Advanced'; }
