export const lightColors = {
  primary: '#aa2e25',
  primaryDark: '#8a2520',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  background: '#f8fafc',
  card: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
};

export const darkColors = {
  primary: '#c43d33',
  primaryDark: '#aa2e25',
  success: '#4ade80',
  danger: '#f87171',
  warning: '#fbbf24',
  background: '#0f172a',
  card: '#1e293b',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  border: '#334155',
};

/** @deprecated Use useTheme().colors for theme-aware UI */
export const colors = lightColors;

export type Colors = typeof lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
