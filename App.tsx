import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  AccessibilityInfo,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Board } from './components/Board';
import { ModeToggle } from './components/ModeToggle';
import { DifficultySelector } from './components/DifficultySelector';
import { PlayerNames } from './components/PlayerNames';
import { checkWinner } from './utils/checkWinner';
import { getBestMove } from './utils/getBestMove';
import { Board as BoardType, Player, GameMode, WinningLine, AIDifficulty } from './types';
import { useTheme } from './theme';

export default function App() {
  const theme = useTheme();

  // Game state
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [aiDifficulty, setAIDifficulty] = useState<AIDifficulty>('medium');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<WinningLine>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [playerXName, setPlayerXName] = useState('X');
  const [playerOName, setPlayerOName] = useState('O');

  // Check for winner after each move
  useEffect(() => {
    const result = checkWinner(board);
    setWinner(result.winner);
    setWinningLine(result.winningLine);
    setIsDraw(result.isDraw);

    // Announce game state changes for accessibility
    if (result.winner) {
      AccessibilityInfo.announceForAccessibility(`${result.winner} wins the game!`);
    } else if (result.isDraw) {
      AccessibilityInfo.announceForAccessibility('Game is a draw');
    }
  }, [board]);

  // AI move trigger
  useEffect(() => {
    // Only make AI move if:
    // 1. Game mode is AI
    // 2. It's O's turn (AI player)
    // 3. Game is not over (no winner and not a draw)
    if (gameMode === 'ai' && currentPlayer === 'O' && !winner && !isDraw) {
      // Small delay to make AI move feel more natural
      const timeout = setTimeout(() => {
        const bestMove = getBestMove(board, aiDifficulty);
        if (bestMove !== -1) {
          handleSquarePress(bestMove);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, gameMode, winner, isDraw, aiDifficulty]);

  // Handle square press
  const handleSquarePress = (index: number) => {
    // Don't allow move if square is occupied or game is over
    if (board[index] !== null || winner || isDraw) {
      return;
    }

    // Update board with current player's move
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Switch to other player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // Reset game
  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    AccessibilityInfo.announceForAccessibility('Game reset');
  };

  // Toggle game mode
  const toggleGameMode = (mode: GameMode) => {
    if (mode !== gameMode) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      // Reset all state immediately before changing mode
      setBoard(Array(9).fill(null));
      setCurrentPlayer('X');
      setWinner(null);
      setWinningLine(null);
      setIsDraw(false);
      setGameMode(mode);
      const modeName = mode === 'pvp' ? 'Player versus Player' : 'Player versus AI';
      AccessibilityInfo.announceForAccessibility(`Switched to ${modeName} mode`);
    }
  };

  // Handle difficulty change
  const handleDifficultyChange = (difficulty: AIDifficulty) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAIDifficulty(difficulty);
    AccessibilityInfo.announceForAccessibility(`AI difficulty set to ${difficulty}`);
  };

  // Check if game is over
  const isGameOver = winner !== null || isDraw;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Player Names */}
        <PlayerNames
          playerXName={playerXName}
          playerOName={playerOName}
          onPlayerXNameChange={setPlayerXName}
          onPlayerONameChange={setPlayerOName}
          currentPlayer={currentPlayer}
          winner={winner}
          isDraw={isDraw}
        />

        {/* Game Board */}
        <Board
          board={board}
          onSquarePress={handleSquarePress}
          winningLine={winningLine}
          disabled={isGameOver || (gameMode === 'ai' && currentPlayer === 'O')}
        />

        {/* Bottom Controls Section */}
        <View style={styles.controlsSection}>
          <ModeToggle gameMode={gameMode} onModeChange={toggleGameMode} />

          {gameMode === 'ai' && (
            <DifficultySelector
              difficulty={aiDifficulty}
              onDifficultyChange={handleDifficultyChange}
            />
          )}

          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: theme.primary }]}
            onPress={handleReset}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Reset game"
            accessibilityHint="Clears the board and starts a new game"
          >
            <Text style={styles.resetButtonText}>Reset Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  controlsSection: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  resetButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 48,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
