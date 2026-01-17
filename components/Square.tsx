import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { Player } from '../types';

interface SquareProps {
  value: Player | null;
  onPress: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export function Square({ value, onPress, isWinning, disabled }: SquareProps) {
  // Animation values
  const scale = useSharedValue(0);
  const winningScale = useSharedValue(1);

  // Animate when value appears
  useEffect(() => {
    if (value) {
      scale.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });
    } else {
      scale.value = 0;
    }
  }, [value]);

  // Animate winning squares
  useEffect(() => {
    if (isWinning) {
      // Pulse animation for winning squares
      winningScale.value = withRepeat(
        withSequence(
          withSpring(1.1, { damping: 2 }),
          withSpring(1, { damping: 2 })
        ),
        -1, // Infinite repeat
        false
      );
    } else {
      winningScale.value = 1;
    }
  }, [isWinning]);

  // Animated styles for the text
  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value * winningScale.value }
    ],
  }));

  // Animated styles for the container
  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: isWinning ? '#4ade80' : '#fff',
  }));

  return (
    <Animated.View style={[styles.square, animatedContainerStyle]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || value !== null}
        style={styles.touchable}
      >
        <Animated.View style={animatedTextStyle}>
          <Text style={[
            styles.text,
            value === 'X' ? styles.textX : styles.textO
          ]}>
            {value || ''}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
