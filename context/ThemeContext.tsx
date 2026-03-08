import React, { createContext, useContext, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, type Colors } from '@/constants/theme';

type ThemeScheme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  colors: Colors;
  isDark: boolean;
  scheme: ThemeScheme;
  setScheme: (s: ThemeScheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemDark = useColorScheme() === 'dark';
  const [schemeState, setSchemeState] = useState<ThemeScheme>('system');
  const setScheme = useCallback((s: ThemeScheme) => setSchemeState(s), []);

  const isDark = schemeState === 'system' ? systemDark : schemeState === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const value: ThemeContextValue = { colors, isDark, scheme: schemeState, setScheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
