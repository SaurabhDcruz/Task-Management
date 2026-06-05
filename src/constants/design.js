// Design System Constants

// Colors - Tailwind-based
export const COLORS = {
  primary: '#4f46e5',
  primaryLight: '#f0f4ff',
  secondary: '#64748b',
  success: '#16a34a',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  background: '#f8fafc',
  backgroundDark: '#0f172a',
  surface: '#ffffff',
  surfaceDark: '#1e293b',
  border: '#e2e8f0',
  borderDark: '#334155',
  text: '#1e293b',
  textLight: '#64748b',
  textDark: '#f1f5f9',
  textDarkLight: '#cbd5e1',
};

// Spacing
export const SPACING = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
};

// Border Radius
export const BORDER_RADIUS = {
  xs: '0.375rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
};

// Shadows
export const SHADOWS = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

// Transitions
export const TRANSITIONS = {
  fast: 'transition-all duration-150',
  base: 'transition-all duration-200',
  slow: 'transition-all duration-300',
};

// Task Status
export const TASK_STATUS = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed',
};

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' },
];

// Chart Colors (Recharts)
export const CHART_COLORS = {
  primary: '#4f46e5',
  secondary: '#8b5cf6',
  success: '#16a34a',
  warning: '#f59e0b',
  info: '#3b82f6',
  danger: '#ef4444',
};
