import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { Player } from '../types';
import { useTheme } from '../theme';
import { useSettingsContext } from '../contexts/SettingsContext';

// SVG Components
const XIcon = ({ size = 60, color = '#ef4444' }) => (
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

const CircleIcon = ({ size = 60, color = '#3b82f6' }) => (
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

interface SquareProps {
  value: Player | null;
  onPress: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export function Square({ value, onPress, isWinning, disabled }: SquareProps) {
  const { settings } = useSettingsContext();
  const theme = useTheme(settings.theme);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  // Pop-in animation when value appears
  useEffect(() => {
    if (value) {
      // Trigger haptic feedback
      if (settings.hapticFeedback) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

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
  }, [value, settings.hapticFeedback]);

  // Pulse animation for winning X or O
  useEffect(() => {
    if (isWinning && value) {
      // Trigger success haptic for winning
      if (settings.hapticFeedback) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

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
    <View
      style={[
        styles.square,
        { backgroundColor: theme.card, borderColor: theme.border },
        isWinning && { backgroundColor: theme.winningBg },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || value !== null}
        style={styles.touchable}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={
          value ? `Square filled with ${value}` : 'Empty square'
        }
        accessibilityState={{ disabled: disabled || value !== null }}
      >
        <Animated.View
          style={{
            transform: [{ scale: Animated.multiply(combinedScale, pulseAnim) }],
          }}
        >
          {value === 'X' && <XIcon size={75} color={theme.xColor} />}
          {value === 'O' && <CircleIcon size={75} color={theme.oColor} />}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 110,
    height: 110,
    margin: 5,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
