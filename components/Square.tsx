import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Player } from '../types';

interface SquareProps {
  value: Player | null;
  onPress: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export function Square({ value, onPress, isWinning, disabled }: SquareProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const bgColorAnim = useRef(new Animated.Value(0)).current;

  // Animate when value appears
  useEffect(() => {
    if (value) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [value]);

  // Animate winning squares
  useEffect(() => {
    if (isWinning) {
      // Background color animation
      Animated.timing(bgColorAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();

      // Pulse animation for winning squares
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      bgColorAnim.setValue(0);
      pulseAnim.setValue(1);
    }
  }, [isWinning]);

  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#4ade80'],
  });

  return (
    <Animated.View
      style={[
        styles.square,
        {
          backgroundColor,
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || value !== null}
        style={styles.touchable}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
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
