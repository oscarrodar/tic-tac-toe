import { useColorScheme } from 'react-native';

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

const lightTheme: Theme = {
  background: '#f9fafb',
  card: '#ffffff',
  text: '#1f2937',
  textSecondary: '#374151',
  border: '#374151',
  primary: '#3b82f6',
  primaryLight: '#dbeafe',
  xColor: '#ef4444',
  oColor: '#3b82f6',
  winningBg: '#bbf7d0',
  winningText: '#065f46',
  drawBg: '#fef3c7',
  drawText: '#92400e',
  isDark: false,
};

const darkTheme: Theme = {
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

export const useTheme = (): Theme => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
};
