import { Board, Player, WinnerResult } from '../types';

/**
 * Checks if there's a winner on the board
 * Returns the winner ('X' or 'O'), the winning line indices, and whether it's a draw
 */
export function checkWinner(board: Board): WinnerResult {
  // All possible winning combinations (indices 0-8)
  // 0 1 2
  // 3 4 5
  // 6 7 8
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  // Check each winning combination
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    // If all three squares have the same non-null value, we have a winner
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a] as Player,
        winningLine: combination,
        isDraw: false,
      };
    }
  }

  // Check for draw: all squares filled but no winner
  const isDraw = board.every(square => square !== null);

  return {
    winner: null,
    winningLine: null,
    isDraw,
  };
}
