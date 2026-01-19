import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AccessibilityInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Svg, { Path } from 'react-native-svg';
import { Board } from './Board';
import { DifficultySelector } from './DifficultySelector';
import { PlayerNames } from './PlayerNames';
import { checkWinner } from '../utils/checkWinner';
import { getBestMove } from '../utils/getBestMove';
import {
  Board as BoardType,
  Player,
  GameMode,
  WinningLine,
  AIDifficulty,
} from '../types';
import { useTheme } from '../theme';

interface GameScreenProps {
  initialGameMode: GameMode;
  onBackToHome: () => void;
}

const BackIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19l-7-7 7-7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const GameScreen: React.FC<GameScreenProps> = ({
  initialGameMode,
  onBackToHome,
}) => {
  const theme = useTheme();

  // Game state
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameMode, setGameMode] = useState<GameMode>(initialGameMode);
  const [aiDifficulty, setAIDifficulty] = useState<AIDifficulty>('medium');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<WinningLine>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [playerXName, setPlayerXName] = useState('X');
  const [playerOName, setPlayerOName] = useState(
    initialGameMode === 'ai' ? 'AI' : 'O'
  );
  
  // Check for winner after each move
  useEffect(() => {
    const result = checkWinner(board);
    setWinner(result.winner);
    setWinningLine(result.winningLine);
    setIsDraw(result.isDraw);

    // Announce game state changes for accessibility
    if (result.winner) {
      AccessibilityInfo.announceForAccessibility(
        `${result.winner} wins the game!`
      );
    } else if (result.isDraw) {
      AccessibilityInfo.announceForAccessibility('Game is a draw');
    }
  }, [board]);

  // AI move trigger
  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 'O' && !winner && !isDraw) {
      const timeout = setTimeout(() => {
        const bestMove = getBestMove(board, aiDifficulty);
        if (bestMove !== -1) {
          handleSquarePress(bestMove);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, gameMode, winner, isDraw, aiDifficulty]);

  const handleSquarePress = (index: number) => {
    if (board[index] !== null || winner || isDraw) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    AccessibilityInfo.announceForAccessibility('Game reset');
  };

  const handleDifficultyChange = (difficulty: AIDifficulty) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAIDifficulty(difficulty);
    AccessibilityInfo.announceForAccessibility(
      `AI difficulty set to ${difficulty}`
    );
  };

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBackToHome();
  };

  const isGameOver = winner !== null || isDraw;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Back to home"
        >
          <BackIcon color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <PlayerNames
          playerXName={playerXName}
          playerOName={playerOName}
          onPlayerXNameChange={setPlayerXName}
          onPlayerONameChange={setPlayerOName}
          currentPlayer={currentPlayer}
          winner={winner}
          isDraw={isDraw}
          gameMode={gameMode}
        />

        <Board
          board={board}
          onSquarePress={handleSquarePress}
          winningLine={winningLine}
          disabled={isGameOver || (gameMode === 'ai' && currentPlayer === 'O')}
        />

        <View style={styles.controlsSection}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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
