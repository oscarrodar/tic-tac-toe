import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Player } from '../types';
import { useTheme } from '../theme';

interface TurnIndicatorProps {
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  gameMode: 'pvp' | 'ai';
  playerXName: string;
  playerOName: string;
}

const XIcon = ({ size = 24, color }: { size?: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="M6 6l12 12M18 6L6 18"
    />
  </Svg>
);

const CircleIcon = ({ size = 24, color }: { size?: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="M4 12a8 8 0 1 0 16 0a8 8 0 0 0-16 0"
    />
  </Svg>
);

export function TurnIndicator({
  currentPlayer,
  winner,
  isDraw,
  gameMode,
  playerXName,
  playerOName,
}: TurnIndicatorProps) {
  const theme = useTheme();

  const getPlayerName = (player: Player) => {
    return player === 'X' ? playerXName : playerOName;
  };

  const getMessage = () => {
    if (winner) {
      return `${getPlayerName(winner)} Wins!`;
    }
    if (isDraw) {
      return "It's a Draw!";
    }
    if (gameMode === 'ai' && currentPlayer === 'O') {
      return 'AI is thinking...';
    }
    return `${getPlayerName(currentPlayer)}'s Turn`;
  };

  const getBackgroundColor = () => {
    if (winner) {
      return theme.winningBg;
    }
    if (isDraw) {
      return theme.drawBg;
    }
    return currentPlayer === 'X' ? theme.xColor : theme.oColor;
  };

  const getTextColor = () => {
    if (winner) {
      return theme.winningText;
    }
    if (isDraw) {
      return theme.drawText;
    }
    return '#ffffff';
  };

  const getIcon = () => {
    if (winner) {
      return winner === 'X' ? (
        <XIcon size={28} color={getTextColor()} />
      ) : (
        <CircleIcon size={28} color={getTextColor()} />
      );
    }
    if (isDraw) {
      return null;
    }
    return currentPlayer === 'X' ? (
      <XIcon size={28} color={getTextColor()} />
    ) : (
      <CircleIcon size={28} color={getTextColor()} />
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
      ]}
      accessibilityRole="text"
      accessibilityLabel={getMessage()}
      accessibilityLiveRegion="polite"
    >
      {getIcon()}
      <Text style={[styles.text, { color: getTextColor() }]}>
        {getMessage()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 12,
    marginBottom: 24,
    minHeight: 56,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
