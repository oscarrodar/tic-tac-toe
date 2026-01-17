import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../theme';

interface ModeToggleProps {
  gameMode: 'pvp' | 'ai';
  onModeChange: (mode: 'pvp' | 'ai') => void;
}

const PeopleIcon = ({ size = 20, color }: { size?: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"
    />
  </Svg>
);

const RobotIcon = ({ size = 20, color }: { size?: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8V5m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 19h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2zm3-6h.01M16 13h.01"
    />
  </Svg>
);

export function ModeToggle({ gameMode, onModeChange }: ModeToggleProps) {
  const theme = useTheme();

  const renderButton = (
    mode: 'pvp' | 'ai',
    label: string,
    icon: React.ReactNode,
    accessibilityLabel: string,
    accessibilityHint: string
  ) => {
    const isSelected = gameMode === mode;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isSelected ? theme.primary : 'transparent',
            borderColor: theme.border,
          },
        ]}
        onPress={() => onModeChange(mode)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ selected: isSelected }}
      >
        <View style={styles.iconContainer}>
          {React.cloneElement(icon as React.ReactElement, {
            color: isSelected ? '#ffffff' : theme.text,
          })}
        </View>
        <Text
          style={[
            styles.label,
            { color: isSelected ? '#ffffff' : theme.text },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[styles.container, { borderColor: theme.border }]}
      accessibilityRole="radiogroup"
      accessibilityLabel="Game mode selection"
    >
      {renderButton(
        'pvp',
        'Player vs Player',
        <PeopleIcon size={20} color={theme.text} />,
        'Player versus Player mode',
        'Tap to play against another person'
      )}
      {renderButton(
        'ai',
        'Player vs AI',
        <RobotIcon size={20} color={theme.text} />,
        'Player versus AI mode',
        'Tap to play against the computer'
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 48,
    gap: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
});
