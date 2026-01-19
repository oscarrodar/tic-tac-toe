import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { AppLogo } from './AppLogo';
import { GameModeCard } from './GameModeCard';
import { useTheme } from '../theme';
import { GameModeOption } from '../types';

interface HomeScreenProps {
  selectedMode: GameModeOption;
  onModeSelect: (mode: GameModeOption) => void;
  onStartGame: () => void;
}

const GAME_MODES: Array<{
  id: GameModeOption;
  title: string;
  subtitle: string;
  icon: 'single' | 'two' | 'online';
  disabled?: boolean;
}> = [
  {
    id: 'ai',
    title: 'Single Player',
    subtitle: 'Play against AI',
    icon: 'single',
  },
  {
    id: 'pvp',
    title: 'Two Player',
    subtitle: 'Play with a friend',
    icon: 'two',
  },
  {
    id: 'online',
    title: 'Online Match',
    subtitle: 'Find an opponent online',
    icon: 'online',
    disabled: true,
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  selectedMode,
  onModeSelect,
  onStartGame,
}) => {
  const theme = useTheme();

  const handleModeSelect = (mode: GameModeOption) => {
    if (mode !== selectedMode) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onModeSelect(mode);
    }
  };

  const handleStartGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onStartGame();
  };

  const isStartDisabled = selectedMode === 'online';

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <AppLogo size={80} />
          <Text style={[styles.title, { color: theme.text }]}>Tic Tac Toe</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Choose your game mode
          </Text>
        </View>

        <View
          style={styles.modesContainer}
          accessibilityRole="radiogroup"
          accessibilityLabel="Game mode selection"
        >
          {GAME_MODES.map((mode) => (
            <GameModeCard
              key={mode.id}
              title={mode.title}
              subtitle={mode.subtitle}
              icon={mode.icon}
              selected={selectedMode === mode.id}
              disabled={mode.disabled}
              onPress={() => handleModeSelect(mode.id)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.startButton,
              { backgroundColor: theme.primary },
              isStartDisabled && styles.startButtonDisabled,
            ]}
            onPress={handleStartGame}
            disabled={isStartDisabled}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Start game"
            accessibilityHint={
              isStartDisabled
                ? 'Online mode is not available yet'
                : 'Starts a new game with the selected mode'
            }
            accessibilityState={{ disabled: isStartDisabled }}
          >
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>

          <View style={styles.links}>
            <TouchableOpacity
              onPress={() => {}}
              accessibilityRole="button"
              accessibilityLabel="Statistics"
              accessibilityHint="View your game statistics"
            >
              <Text style={[styles.linkText, { color: theme.textSecondary }]}>
                Statistics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              accessibilityRole="button"
              accessibilityLabel="Settings"
              accessibilityHint="Open settings"
            >
              <Text style={[styles.linkText, { color: theme.textSecondary }]}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  modesContainer: {
    gap: 12,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 24,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  startButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 56,
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    gap: 90,
  },
  linkText: {
    fontSize: 14,
  },
});
