import { Board, AIDifficulty } from '../types';
import { minimax } from './minimax';

/**
 * Gets a random empty square index
 */
function getRandomMove(board: Board): number {
  const emptySquares = board.reduce<number[]>((acc, square, index) => {
    if (square === null) acc.push(index);
    return acc;
  }, []);

  if (emptySquares.length === 0) return -1;
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}

/**
 * Finds the best move for the AI player using minimax algorithm
 *
 * @param board - Current board state
 * @param difficulty - AI difficulty level ('easy', 'medium', 'hard')
 * @returns Index (0-8) of the best move
 */
export function getBestMove(board: Board, difficulty: AIDifficulty = 'medium'): number {
  // Easy mode: 70% random moves, 30% smart moves
  if (difficulty === 'easy') {
    const shouldPlayRandom = Math.random() < 0.7;
    if (shouldPlayRandom) {
      return getRandomMove(board);
    }
    // Fall through to smart move
  }

  // Medium mode: 40% random moves, 60% smart moves
  if (difficulty === 'medium') {
    const shouldPlayRandom = Math.random() < 0.4;
    if (shouldPlayRandom) {
      return getRandomMove(board);
    }
    // Fall through to smart move
  }

  // Hard mode (and fallback for Easy/Medium): Use perfect minimax
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
