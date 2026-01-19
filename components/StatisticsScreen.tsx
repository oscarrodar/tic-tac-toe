import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../theme';
import { useSettingsContext } from '../contexts/SettingsContext';
import { GameStats, GameRecord, AIDifficulty } from '../types';

interface StatisticsScreenProps {
  stats: GameStats;
  history: GameRecord[];
  getWinRate: (mode: 'ai' | 'pvp', difficulty?: AIDifficulty) => number;
  onBack: () => void;
  onResetStats: () => Promise<void>;
}

const BackIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19l-7-7 7-7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type TabMode = 'ai' | 'pvp';

export function StatisticsScreen({
  stats,
  history,
  getWinRate,
  onBack,
  onResetStats,
}: StatisticsScreenProps) {
  const { settings } = useSettingsContext();
  const theme = useTheme(settings.theme);
  const [activeTab, setActiveTab] = useState<TabMode>('ai');

  const handleResetStats = () => {
    Alert.alert(
      'Reset Statistics',
      'Are you sure you want to reset all your statistics? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: onResetStats,
        },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getResultText = (record: GameRecord) => {
    if (record.winner === 'draw') return 'Draw';
    if (record.winner === 'X') return 'Won';
    return 'Lost';
  };

  const getResultColor = (record: GameRecord) => {
    if (record.winner === 'draw') return theme.drawText;
    if (record.winner === 'X') return theme.winningText;
    return theme.xColor;
  };

  const renderSummaryCard = (title: string, value: string | number, subtitle?: string) => (
    <View style={[styles.summaryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.summaryValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.summaryTitle, { color: theme.textSecondary }]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.summarySubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
      )}
    </View>
  );

  const renderDifficultyStats = (difficulty: AIDifficulty, label: string) => {
    const diffStats = stats.ai[difficulty];
    const total = diffStats.wins + diffStats.losses + diffStats.draws;
    const winRate = getWinRate('ai', difficulty);

    return (
      <View style={[styles.difficultyRow, { borderBottomColor: theme.border }]}>
        <Text style={[styles.difficultyLabel, { color: theme.text }]}>{label}</Text>
        <View style={styles.difficultyStats}>
          <Text style={[styles.difficultyStatText, { color: theme.textSecondary }]}>
            {diffStats.wins}W / {diffStats.losses}L / {diffStats.draws}D
          </Text>
          <Text style={[styles.winRateText, { color: theme.primary }]}>
            {total > 0 ? `${winRate}%` : '-'}
          </Text>
        </View>
      </View>
    );
  };

  const renderPvPStats = () => (
    <View style={styles.statsSection}>
      <View style={[styles.pvpCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.pvpLabel, { color: theme.xColor }]}>Player X</Text>
        <Text style={[styles.pvpStats, { color: theme.text }]}>
          {stats.pvp.playerX.wins}W / {stats.pvp.playerX.losses}L / {stats.pvp.playerX.draws}D
        </Text>
      </View>
      <View style={[styles.pvpCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.pvpLabel, { color: theme.oColor }]}>Player O</Text>
        <Text style={[styles.pvpStats, { color: theme.text }]}>
          {stats.pvp.playerO.wins}W / {stats.pvp.playerO.losses}L / {stats.pvp.playerO.draws}D
        </Text>
      </View>
    </View>
  );

  const recentGames = history.slice(0, 10);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Back to home"
        >
          <BackIcon color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Statistics</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryRow}>
          {renderSummaryCard('Total Games', stats.totalGames)}
          {renderSummaryCard('Win Rate', `${getWinRate(activeTab)}%`, `vs ${activeTab === 'ai' ? 'AI' : 'Player'}`)}
          {renderSummaryCard('Best Streak', stats.streaks.best, `Current: ${stats.streaks.current}`)}
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'ai' && { backgroundColor: theme.primaryLight, borderColor: theme.primary },
              { borderColor: theme.border },
            ]}
            onPress={() => setActiveTab('ai')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, { color: activeTab === 'ai' ? theme.primary : theme.textSecondary }]}>
              vs AI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'pvp' && { backgroundColor: theme.primaryLight, borderColor: theme.primary },
              { borderColor: theme.border },
            ]}
            onPress={() => setActiveTab('pvp')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, { color: activeTab === 'pvp' ? theme.primary : theme.textSecondary }]}>
              vs Player
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'ai' ? (
          <View style={[styles.statsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>By Difficulty</Text>
            {renderDifficultyStats('easy', 'Easy')}
            {renderDifficultyStats('medium', 'Medium')}
            {renderDifficultyStats('hard', 'Hard')}
          </View>
        ) : (
          renderPvPStats()
        )}

        {recentGames.length > 0 && (
          <View style={[styles.statsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Games</Text>
            {recentGames.map((game) => (
              <View key={game.id} style={[styles.gameRow, { borderBottomColor: theme.border }]}>
                <View>
                  <Text style={[styles.gameMode, { color: theme.text }]}>
                    {game.mode === 'ai' ? `vs AI (${game.difficulty})` : 'vs Player'}
                  </Text>
                  <Text style={[styles.gameDate, { color: theme.textSecondary }]}>
                    {formatDate(game.timestamp)}
                  </Text>
                </View>
                <Text style={[styles.gameResult, { color: getResultColor(game) }]}>
                  {getResultText(game)}
                </Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.resetButton, { borderColor: theme.xColor }]}
          onPress={handleResetStats}
          activeOpacity={0.7}
        >
          <Text style={[styles.resetButtonText, { color: theme.xColor }]}>Reset All Statistics</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryTitle: {
    fontSize: 12,
    marginTop: 4,
  },
  summarySubtitle: {
    fontSize: 10,
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  difficultyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  difficultyLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  difficultyStats: {
    alignItems: 'flex-end',
  },
  difficultyStatText: {
    fontSize: 12,
  },
  winRateText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  statsSection: {
    gap: 12,
    marginBottom: 20,
  },
  pvpCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pvpLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  pvpStats: {
    fontSize: 14,
  },
  gameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  gameMode: {
    fontSize: 14,
    fontWeight: '500',
  },
  gameDate: {
    fontSize: 12,
    marginTop: 2,
  },
  gameResult: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  resetButton: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 12,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
