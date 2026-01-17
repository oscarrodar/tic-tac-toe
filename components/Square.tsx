import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { Player } from '../types';

interface SquareProps {
  value: Player | null;
  onPress: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export function Square({ value, onPress, isWinning, disabled }: SquareProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  // Pop-in animation when value appears
  useEffect(() => {
    if (value) {
      // Start from 0 and spring to 1
      scaleAnim.setValue(0);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      // Reset to normal size when cleared
      scaleAnim.setValue(1);
    }
  }, [value]);

  // Pulse animation for winning X or O
  useEffect(() => {
    if (isWinning && value) {
      // Pulse the text when this square is part of winning line
      pulseAnimRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimRef.current.start();
    } else {
      // Stop and reset pulse animation
      if (pulseAnimRef.current) {
        pulseAnimRef.current.stop();
        pulseAnimRef.current = null;
      }
      pulseAnim.setValue(1);
    }

    // Cleanup on unmount
    return () => {
      if (pulseAnimRef.current) {
        pulseAnimRef.current.stop();
        pulseAnimRef.current = null;
      }
    };
  }, [isWinning, value]);

  const combinedScale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[styles.square, isWinning && styles.squareWinning]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || value !== null}
        style={styles.touchable}
      >
        <Animated.View
          style={{
            transform: [
              { scale: Animated.multiply(combinedScale, pulseAnim) },
            ],
          }}
        >
          <Text
            style={[
              styles.text,
              value === 'X' ? styles.textX : styles.textO,
            ]}
          >
            {value || ''}
          </Text>
        </Animated.View>
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
