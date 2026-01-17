import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Board } from './components/Board';
import { checkWinner } from './utils/checkWinner';
import { getBestMove } from './utils/getBestMove';
import { Board as BoardType, Player, GameMode, WinningLine } from './types';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  // Game state
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<WinningLine>(null);
  const [isDraw, setIsDraw] = useState(false);

  // Check for winner after each move
  useEffect(() => {
    const result = checkWinner(board);
    setWinner(result.winner);
    setWinningLine(result.winningLine);
    setIsDraw(result.isDraw);
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
        const bestMove = getBestMove(board);
        if (bestMove !== -1) {
          handleSquarePress(bestMove);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, gameMode, winner, isDraw]);

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
    // Animate the reset
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
  };

  // Toggle game mode
  const toggleGameMode = (mode: GameMode) => {
    if (mode !== gameMode) {
      // Reset first, then change mode to avoid state conflicts
      handleReset();
      setGameMode(mode);
    }
  };

  // Get status message
  const getStatusMessage = () => {
    if (winner) {
      return `${winner} Wins!`;
    }
    if (isDraw) {
      return "It's a Draw!";
    }
    if (gameMode === 'ai' && currentPlayer === 'O') {
      return 'AI is thinking...';
    }
    return `${currentPlayer}'s Turn`;
  };

  // Check if game is over
  const isGameOver = winner !== null || isDraw;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Tic Tac Toe</Text>

        {/* Game Mode Selector */}
        <View style={styles.modeSelector}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              gameMode === 'pvp' && styles.modeButtonActive,
            ]}
            onPress={() => toggleGameMode('pvp')}
          >
            <Text
              style={[
                styles.modeButtonText,
                gameMode === 'pvp' && styles.modeButtonTextActive,
              ]}
            >
              Player vs Player
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeButton,
              gameMode === 'ai' && styles.modeButtonActive,
            ]}
            onPress={() => toggleGameMode('ai')}
          >
            <Text
              style={[
                styles.modeButtonText,
                gameMode === 'ai' && styles.modeButtonTextActive,
              ]}
            >
              Player vs AI
            </Text>
          </TouchableOpacity>
        </View>

        {/* Status Message */}
        <Text style={[
          styles.status,
          isGameOver && styles.statusGameOver,
        ]}>
          {getStatusMessage()}
        </Text>

        {/* Game Board */}
        <Board
          board={board}
          onSquarePress={handleSquarePress}
          winningLine={winningLine}
          disabled={isGameOver || (gameMode === 'ai' && currentPlayer === 'O')}
        />

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1f2937',
  },
  modeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  modeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3b82f6',
    backgroundColor: '#fff',
  },
  modeButtonActive: {
    backgroundColor: '#3b82f6',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  status: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    color: '#374151',
  },
  statusGameOver: {
    color: '#16a34a',
    fontSize: 28,
  },
  resetButton: {
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#3b82f6',
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
