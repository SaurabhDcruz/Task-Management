export function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>?/gm, '').trim();
}

export function safeJsonParse(value, fallback = null) {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  try {
    const parsed = JSON.parse(value);
    return parsed === null ? fallback : parsed;
  } catch (error) {
    return fallback;
  }
}

export function isAuthenticated() {
  const user = safeJsonParse(localStorage.getItem('auth_user'));
  const token = localStorage.getItem('auth_token');
  return !!user && !!token;
}

export function createAuthToken(email) {
  return btoa(`${email}:${Date.now()}`);
}

export function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}
