import { useColorScheme } from 'react-native';
import { ThemePreference, ColorPalette } from './types';

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

// ============================================
// EARTH TONES PALETTE
// Terracotta X, Warm Teal O, Sage accents
// ============================================
const earthLight: Theme = {
  background: '#faf7f2',      // Warm cream
  card: '#fffefa',            // Soft warm white
  text: '#3d3632',            // Warm dark brown
  textSecondary: '#7a716a',   // Warm gray
  border: '#e0d6c8',          // Warm beige border
  primary: '#7c9a92',         // Muted sage green
  primaryLight: '#e8f0ed',    // Light sage tint
  xColor: '#c67b5c',          // Soft terracotta
  oColor: '#5a8f8f',          // Warm teal
  winningBg: '#e8f0ed',       // Soft sage background
  winningText: '#4a6b62',     // Deep sage text
  drawBg: '#f5ebe0',          // Warm sand
  drawText: '#8b7355',        // Warm brown
  isDark: false,
};

const earthDark: Theme = {
  background: '#1c1917',      // Warm charcoal
  card: '#292524',            // Warm dark card
  text: '#faf5f0',            // Warm off-white
  textSecondary: '#a8a29e',   // Warm gray
  border: '#44403c',          // Warm border
  primary: '#8fb3ab',         // Lighter sage
  primaryLight: '#2d3a36',    // Dark sage tint
  xColor: '#d9967a',          // Lighter terracotta
  oColor: '#7ab3b3',          // Lighter teal
  winningBg: '#2d3a36',       // Dark sage background
  winningText: '#b8d4cc',     // Light sage text
  drawBg: '#3d3329',          // Dark warm brown
  drawText: '#d4c4a8',        // Light sand text
  isDark: true,
};

// ============================================
// SUNSET WARMTH PALETTE
// Coral X, Amber O, Peach accents
// ============================================
const sunsetLight: Theme = {
  background: '#fefaf6',      // Warm ivory
  card: '#ffffff',            // Clean white
  text: '#4a3f35',            // Warm brown
  textSecondary: '#8c7e72',   // Muted brown
  border: '#ede4d9',          // Soft peach border
  primary: '#e8a87c',         // Warm peach/apricot
  primaryLight: '#fdf2e9',    // Light peach tint
  xColor: '#e07a5f',          // Coral/salmon
  oColor: '#d4a03c',          // Warm amber/gold
  winningBg: '#fdf2e9',       // Soft peach background
  winningText: '#b86e4a',     // Deep coral text
  drawBg: '#fef6e6',          // Light amber
  drawText: '#a07830',        // Golden brown
  isDark: false,
};

const sunsetDark: Theme = {
  background: '#1f1a17',      // Warm dark brown
  card: '#2d2520',            // Dark warm card
  text: '#faf6f2',            // Warm white
  textSecondary: '#b0a598',   // Warm tan
  border: '#4a403a',          // Warm brown border
  primary: '#e8a87c',         // Warm peach
  primaryLight: '#3d302a',    // Dark peach tint
  xColor: '#e8967e',          // Lighter coral
  oColor: '#e4b85c',          // Lighter amber
  winningBg: '#3d302a',       // Dark peach background
  winningText: '#f0c4a8',     // Light coral text
  drawBg: '#3a3020',          // Dark amber
  drawText: '#e8d4a0',        // Light gold text
  isDark: true,
};

// ============================================
// MODERN WARM NEUTRALS PALETTE
// Burgundy X, Warm Indigo O, Golden accents
// ============================================
const modernLight: Theme = {
  background: '#f9f7f5',      // Warm off-white
  card: '#ffffff',            // Clean white
  text: '#2d2d3a',            // Dark warm gray
  textSecondary: '#6b6b7a',   // Medium warm gray
  border: '#e5e2de',          // Subtle warm border
  primary: '#8b7355',         // Warm bronze
  primaryLight: '#f5f0e8',    // Light golden tint
  xColor: '#8b3a4c',          // Deep burgundy
  oColor: '#4a5568',          // Warm indigo/slate
  winningBg: '#f8f4e8',       // Soft golden background
  winningText: '#7a6530',     // Deep gold text
  drawBg: '#f5f2ef',          // Warm neutral
  drawText: '#6b6560',        // Warm gray
  isDark: false,
};

const modernDark: Theme = {
  background: '#18181b',      // Near black
  card: '#27272a',            // Dark zinc
  text: '#fafaf9',            // Warm white
  textSecondary: '#a1a1aa',   // Medium gray
  border: '#3f3f46',          // Zinc border
  primary: '#c9a87c',         // Light bronze
  primaryLight: '#2d2a25',    // Dark golden tint
  xColor: '#c76b7e',          // Lighter burgundy
  oColor: '#8b9dc3',          // Lighter indigo
  winningBg: '#2d2a22',       // Dark golden background
  winningText: '#e8d4a8',     // Light gold text
  drawBg: '#2a2a2d',          // Dark neutral
  drawText: '#c8c4bc',        // Light warm gray
  isDark: true,
};

// Palette collections
const palettes = {
  earth: { light: earthLight, dark: earthDark },
  sunset: { light: sunsetLight, dark: sunsetDark },
  modern: { light: modernLight, dark: modernDark },
};

// Legacy exports for backward compatibility
export const lightTheme = earthLight;
export const darkTheme = earthDark;

export const useTheme = (
  preference: ThemePreference = 'system',
  palette: ColorPalette = 'earth'
): Theme => {
  const systemScheme = useColorScheme();
  const selectedPalette = palettes[palette];

  if (preference === 'light') {
    return selectedPalette.light;
  }
  if (preference === 'dark') {
    return selectedPalette.dark;
  }
  // System preference
  return systemScheme === 'dark' ? selectedPalette.dark : selectedPalette.light;
};

export const getTheme = (
  preference: ThemePreference,
  systemScheme: 'light' | 'dark' | null,
  palette: ColorPalette = 'earth'
): Theme => {
  const selectedPalette = palettes[palette];

  if (preference === 'light') {
    return selectedPalette.light;
  }
  if (preference === 'dark') {
    return selectedPalette.dark;
  }
  return systemScheme === 'dark' ? selectedPalette.dark : selectedPalette.light;
};

// Export palettes for preview purposes
export { palettes };
