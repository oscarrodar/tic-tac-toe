import { Board, Player } from '../types';
import { checkWinner } from './checkWinner';

/**
 * Minimax algorithm for optimal AI moves
 * Recursively evaluates all possible game states
 *
 * @param board - Current board state
 * @param depth - Current depth in the game tree
 * @param isMaximizing - True if AI is playing (maximizing), false if player (minimizing)
 * @returns Score for this board state
 */
export function minimax(board: Board, depth: number, isMaximizing: boolean): number {
  // Check terminal state
  const result = checkWinner(board);

  // AI wins: positive score (prefer quicker wins with depth penalty)
  if (result.winner === 'O') {
    return 10 - depth;
  }

  // Player wins: negative score (prefer slower losses with depth penalty)
  if (result.winner === 'X') {
    return depth - 10;
  }

  // Draw: neutral score
  if (result.isDraw) {
    return 0;
  }

  // Maximizing player (AI - 'O')
  if (isMaximizing) {
    let bestScore = -Infinity;

    // Try all possible moves
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        // Make move
        board[i] = 'O';

        // Recursively get score
        const score = minimax(board, depth + 1, false);

        // Undo move
        board[i] = null;

        // Update best score
        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  }

  // Minimizing player (Human - 'X')
  else {
    let bestScore = Infinity;

    // Try all possible moves
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        // Make move
        board[i] = 'X';

        // Recursively get score
        const score = minimax(board, depth + 1, true);

        // Undo move
        board[i] = null;

        // Update best score
        bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore;
  }
}
