import { useColorScheme } from 'react-native';
import { ThemePreference } from './types';

export interface Theme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryLight: string;
  xColor: string;
  oColor: string;
  winningBg: string;
  winningText: string;
  drawBg: string;
  drawText: string;
  isDark: boolean;
}

export const lightTheme: Theme = {
  background: '#faf8f5',
  card: '#ffffff',
  text: '#2d2a26',
  textSecondary: '#6b6560',
  border: '#d4cfc7',
  primary: '#6366f1',
  primaryLight: '#e0e7ff',
  xColor: '#dc2626',
  oColor: '#2563eb',
  winningBg: '#d1fae5',
  winningText: '#065f46',
  drawBg: '#fef3c7',
  drawText: '#92400e',
  isDark: false,
};

export const darkTheme: Theme = {
  background: '#111827',
  card: '#1f2937',
  text: '#f9fafb',
  textSecondary: '#9ca3af',
  border: '#4b5563',
  primary: '#60a5fa',
  primaryLight: '#1e3a8a',
  xColor: '#f87171',
  oColor: '#60a5fa',
  winningBg: '#065f46',
  winningText: '#bbf7d0',
  drawBg: '#92400e',
  drawText: '#fef3c7',
  isDark: true,
};

export const useTheme = (preference: ThemePreference = 'system'): Theme => {
  const systemScheme = useColorScheme();

  if (preference === 'light') {
    return lightTheme;
  }
  if (preference === 'dark') {
    return darkTheme;
  }
  // System preference
  return systemScheme === 'dark' ? darkTheme : lightTheme;
};

export const getTheme = (preference: ThemePreference, systemScheme: 'light' | 'dark' | null): Theme => {
  if (preference === 'light') {
    return lightTheme;
  }
  if (preference === 'dark') {
    return darkTheme;
  }
  return systemScheme === 'dark' ? darkTheme : lightTheme;
};
