import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Player } from '../types';

interface SquareProps {
  value: Player | null;
  onPress: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export function Square({ value, onPress, isWinning, disabled }: SquareProps) {
  return (
    <View style={[
      styles.square,
      isWinning && styles.squareWinning
    ]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || value !== null}
        style={styles.touchable}
      >
        <Text style={[
          styles.text,
          value === 'X' ? styles.textX : styles.textO
        ]}>
          {value || ''}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#374151',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareWinning: {
    backgroundColor: '#4ade80',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  textX: {
    color: '#3b82f6', // Blue for X
  },
  textO: {
    color: '#ef4444', // Red for O
  },
});
