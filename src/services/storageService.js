import { safeJsonParse } from '../utils/helpers';

const STORAGE_KEYS = {
  authUser: 'auth_user',
  authToken: 'auth_token',
  rememberMe: 'remember_me',
  themeMode: 'theme_mode',
  taskData: 'task_data',
};

export const storageService = {
  getAuthUser() {
    return safeJsonParse(localStorage.getItem(STORAGE_KEYS.authUser));
  },
  setAuthUser(user) {
    localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
  },
  clearAuthUser() {
    localStorage.removeItem(STORAGE_KEYS.authUser);
  },
  getAuthToken() {
    return localStorage.getItem(STORAGE_KEYS.authToken);
  },
  setAuthToken(token) {
    localStorage.setItem(STORAGE_KEYS.authToken, token);
  },
  clearAuthToken() {
    localStorage.removeItem(STORAGE_KEYS.authToken);
  },
  getRememberMe() {
    return localStorage.getItem(STORAGE_KEYS.rememberMe) === 'true';
  },
  setRememberMe(value) {
    localStorage.setItem(STORAGE_KEYS.rememberMe, String(Boolean(value)));
  },
  clearRememberMe() {
    localStorage.removeItem(STORAGE_KEYS.rememberMe);
  },
  getThemeMode() {
    return localStorage.getItem(STORAGE_KEYS.themeMode) || 'light';
  },
  setThemeMode(value) {
    localStorage.setItem(STORAGE_KEYS.themeMode, value);
  },
  getTasks() {
    const parsed = safeJsonParse(localStorage.getItem(STORAGE_KEYS.taskData), []);
    return Array.isArray(parsed) ? parsed : [];
  },
  hasValidTasks() {
    const raw = localStorage.getItem(STORAGE_KEYS.taskData);
    if (raw === null || raw === '') {
      return true;
    }
    const parsed = safeJsonParse(raw, undefined);
    return Array.isArray(parsed);
  },
  setTasks(tasks) {
    if (!Array.isArray(tasks)) {
      return;
    }
    localStorage.setItem(STORAGE_KEYS.taskData, JSON.stringify(tasks));
  },
  clearTasks() {
    localStorage.removeItem(STORAGE_KEYS.taskData);
  },
};
