import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AIDifficulty } from '../types';
import { useTheme } from '../theme';
import { useSettingsContext } from '../contexts/SettingsContext';

interface DifficultySelectorProps {
  difficulty: AIDifficulty;
  onDifficultyChange: (difficulty: AIDifficulty) => void;
}

export function DifficultySelector({
  difficulty,
  onDifficultyChange,
}: DifficultySelectorProps) {
  const { settings } = useSettingsContext();
  const theme = useTheme(settings.theme);

  const renderButton = (
    level: AIDifficulty,
    label: string,
    accessibilityHint: string
  ) => {
    const isSelected = difficulty === level;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isSelected ? theme.primary : 'transparent',
            borderColor: theme.border,
          },
        ]}
        onPress={() => onDifficultyChange(level)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`${label} difficulty`}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ selected: isSelected }}
      >
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
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.textSecondary }]}>
        AI Difficulty
      </Text>
      <View
        style={[styles.buttonContainer, { borderColor: theme.border }]}
        accessibilityRole="radiogroup"
        accessibilityLabel="AI difficulty selection"
      >
        {renderButton('easy', 'Easy', 'AI makes mostly random moves, easier to beat')}
        {renderButton('medium', 'Medium', 'AI balances random and smart moves')}
        {renderButton('hard', 'Hard', 'AI plays perfectly, very difficult to beat')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
