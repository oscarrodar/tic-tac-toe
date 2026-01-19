// Type definitions for Tic Tac Toe game

// Player can be 'X' or 'O'
export type Player = 'X' | 'O';

// Board is an array of 9 squares, each can be 'X', 'O', or null (empty)
export type Board = (Player | null)[];

// Game mode: Player vs Player or Player vs AI
export type GameMode = 'pvp' | 'ai';

// Extended game mode options (includes online for future)
export type GameModeOption = 'ai' | 'pvp' | 'online';

// Screen navigation
export type Screen = 'home' | 'game' | 'statistics' | 'settings';

// AI difficulty levels
export type AIDifficulty = 'easy' | 'medium' | 'hard';

// Winning line is an array of 3 indices (0-8) or null if no winner
export type WinningLine = number[] | null;

// Result of checking for a winner
export interface WinnerResult {
  winner: Player | null;
  winningLine: WinningLine;
  isDraw: boolean;
}

// Statistics types
export interface PlayerStats {
  wins: number;
  losses: number;
  draws: number;
}

export interface GameStats {
  pvp: {
    playerX: PlayerStats;
    playerO: PlayerStats;
  };
  ai: {
    easy: PlayerStats;
    medium: PlayerStats;
    hard: PlayerStats;
  };
  streaks: {
    current: number;
    best: number;
  };
  totalGames: number;
}

export interface GameRecord {
  id: string;
  timestamp: number;
  mode: GameMode;
  difficulty?: AIDifficulty;
  winner: Player | 'draw';
  playerXName: string;
  playerOName: string;
}

// Settings types
export type ThemePreference = 'system' | 'light' | 'dark';
export type ColorPalette = 'earth' | 'sunset' | 'modern';

export interface Settings {
  defaultAIDifficulty: AIDifficulty;
  hapticFeedback: boolean;
  soundEffects: boolean;
  theme: ThemePreference;
  colorPalette: ColorPalette;
  alternateFirstPlayer: boolean;
  defaultPlayerXName: string;
  defaultPlayerOName: string;
  confirmReset: boolean;
}
