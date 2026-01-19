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
export type Screen = 'home' | 'game';

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
