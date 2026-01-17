import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../theme';
import { Player } from '../types';

interface PlayerNamesProps {
  playerXName: string;
  playerOName: string;
  onPlayerXNameChange: (name: string) => void;
  onPlayerONameChange: (name: string) => void;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
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

const EditIcon = ({ size = 16, color }: { size?: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
    />
  </Svg>
);

export function PlayerNames({
  playerXName,
  playerOName,
  onPlayerXNameChange,
  onPlayerONameChange,
  currentPlayer,
  winner,
  isDraw,
}: PlayerNamesProps) {
  const theme = useTheme();
  const [editingX, setEditingX] = useState(false);
  const [editingO, setEditingO] = useState(false);

  // Close editing mode when current player changes (after a move)
  useEffect(() => {
    setEditingX(false);
    setEditingO(false);
  }, [currentPlayer]);

  const getPlayerStyle = (player: Player) => {
    if (winner === player) {
      return { backgroundColor: theme.winningBg, borderColor: theme.winningText };
    }
    if (isDraw) {
      return { backgroundColor: theme.drawBg, borderColor: theme.drawText };
    }
    if (currentPlayer === player) {
      return {
        backgroundColor: player === 'X' ? theme.xColor : theme.oColor,
        borderColor: player === 'X' ? theme.xColor : theme.oColor,
      };
    }
    return {
      backgroundColor: 'transparent',
      borderColor: theme.border,
    };
  };

  const getTextColor = (player: Player) => {
    if (winner === player) {
      return theme.winningText;
    }
    if (isDraw) {
      return theme.drawText;
    }
    if (currentPlayer === player) {
      return '#ffffff';
    }
    return theme.text;
  };

  const renderPlayer = (
    player: Player,
    name: string,
    isEditing: boolean,
    setEditing: (editing: boolean) => void,
    onNameChange: (name: string) => void
  ) => {
    const iconColor = getTextColor(player);

    return (
      <View style={[styles.playerContainer, getPlayerStyle(player)]}>
        <View style={styles.playerContent}>
          {player === 'X' ? (
            <XIcon size={28} color={iconColor} />
          ) : (
            <CircleIcon size={28} color={iconColor} />
          )}
          {isEditing ? (
            <TextInput
              style={[
                styles.input,
                {
                  color: getTextColor(player),
                  borderBottomColor: getTextColor(player),
                },
              ]}
              value={name}
              onChangeText={onNameChange}
              onBlur={() => setEditing(false)}
              autoFocus
              maxLength={15}
              placeholder="Enter name"
              placeholderTextColor={theme.textSecondary}
              accessibilityLabel={`Edit player ${player} name`}
            />
          ) : (
            <TouchableOpacity
              style={styles.nameButton}
              onPress={() => setEditing(true)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Player ${player} name: ${name}. Tap to edit`}
              accessibilityHint="Double tap to change player name"
            >
              <Text style={[styles.playerName, { color: getTextColor(player) }]}>
                {name}
              </Text>
              <EditIcon size={14} color={getTextColor(player)} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderPlayer('X', playerXName, editingX, setEditingX, onPlayerXNameChange)}
      <Text style={[styles.vs, { color: theme.textSecondary }]}>VS</Text>
      {renderPlayer('O', playerOName, editingO, setEditingO, onPlayerONameChange)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 50,
  },
  playerContainer: {
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 120,
  },
  playerContent: {
    alignItems: 'center',
    gap: 4,
  },
  playerLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  nameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 80,
    paddingVertical: 2,
    borderBottomWidth: 1,
  },
  vs: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
});
