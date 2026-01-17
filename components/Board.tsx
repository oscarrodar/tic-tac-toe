import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Square } from './Square';
import { Board as BoardType, WinningLine } from '../types';

interface BoardProps {
  board: BoardType;
  onSquarePress: (index: number) => void;
  winningLine: WinningLine;
  disabled: boolean;
}

export function Board({ board, onSquarePress, winningLine, disabled }: BoardProps) {
  // Check if a square is part of the winning line
  const isWinningSquare = (index: number): boolean => {
    return winningLine !== null && winningLine.includes(index);
  };

  // Render a row of 3 squares
  const renderRow = (startIndex: number) => {
    return (
      <View style={styles.row}>
        {[0, 1, 2].map(offset => {
          const index = startIndex + offset;
          return (
            <Square
              key={index}
              value={board[index]}
              onPress={() => onSquarePress(index)}
              isWinning={isWinningSquare(index)}
              disabled={disabled}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.board}>
      {renderRow(0)}
      {renderRow(3)}
      {renderRow(6)}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
