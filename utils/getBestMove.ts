import { Board } from '../types';
import { minimax } from './minimax';

/**
 * Finds the best move for the AI player using minimax algorithm
 *
 * @param board - Current board state
 * @returns Index (0-8) of the best move
 */
export function getBestMove(board: Board): number {
  let bestScore = -Infinity;
  let bestMove = -1;

  // Try each empty square
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      // Make move
      board[i] = 'O';

      // Calculate score for this move
      const score = minimax(board, 0, false);

      // Undo move
      board[i] = null;

      // Update best move if this is better
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  // If no valid move found (shouldn't happen), return first empty square
  if (bestMove === -1) {
    bestMove = board.findIndex(square => square === null);
  }

  return bestMove;
}
