import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameStats, GameRecord, Settings } from '../types';

const STATS_KEY = '@tic_tac_toe_stats';
const HISTORY_KEY = '@tic_tac_toe_history';
const SETTINGS_KEY = '@tic_tac_toe_settings';

export const defaultStats: GameStats = {
  pvp: {
    playerX: { wins: 0, losses: 0, draws: 0 },
    playerO: { wins: 0, losses: 0, draws: 0 },
  },
  ai: {
    easy: { wins: 0, losses: 0, draws: 0 },
    medium: { wins: 0, losses: 0, draws: 0 },
    hard: { wins: 0, losses: 0, draws: 0 },
  },
  streaks: { current: 0, best: 0 },
  totalGames: 0,
};

export async function loadStats(): Promise<GameStats> {
  try {
    const json = await AsyncStorage.getItem(STATS_KEY);
    if (json) {
      return JSON.parse(json) as GameStats;
    }
    return defaultStats;
  } catch (error) {
    console.error('Failed to load stats:', error);
    return defaultStats;
  }
}

export async function saveStats(stats: GameStats): Promise<void> {
  try {
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save stats:', error);
  }
}

export async function loadGameHistory(): Promise<GameRecord[]> {
  try {
    const json = await AsyncStorage.getItem(HISTORY_KEY);
    if (json) {
      return JSON.parse(json) as GameRecord[];
    }
    return [];
  } catch (error) {
    console.error('Failed to load game history:', error);
    return [];
  }
}

export async function saveGameRecord(record: GameRecord): Promise<void> {
  try {
    const history = await loadGameHistory();
    // Keep only last 50 games to avoid storage bloat
    const updatedHistory = [record, ...history].slice(0, 50);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to save game record:', error);
  }
}

export async function clearAllStats(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([STATS_KEY, HISTORY_KEY]);
  } catch (error) {
    console.error('Failed to clear stats:', error);
  }
}

// Settings storage
export const defaultSettings: Settings = {
  defaultAIDifficulty: 'medium',
  hapticFeedback: true,
  soundEffects: false,
  theme: 'system',
  alternateFirstPlayer: false,
  defaultPlayerXName: 'Player 1',
  defaultPlayerOName: 'Player 2',
  confirmReset: true,
};

export async function loadSettings(): Promise<Settings> {
  try {
    const json = await AsyncStorage.getItem(SETTINGS_KEY);
    if (json) {
      // Merge with defaults to handle new settings added in updates
      return { ...defaultSettings, ...JSON.parse(json) };
    }
    return defaultSettings;
  } catch (error) {
    console.error('Failed to load settings:', error);
    return defaultSettings;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}
