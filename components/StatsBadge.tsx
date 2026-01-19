import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import { useSettingsContext } from '../contexts/SettingsContext';
import { PlayerStats } from '../types';

interface StatsBadgeProps {
  stats: PlayerStats;
}

export function StatsBadge({ stats }: StatsBadgeProps) {
  const { settings } = useSettingsContext();
  const theme = useTheme(settings.theme, settings.colorPalette);

  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={[styles.statValue, { color: theme.text }]}>
          {stats.wins}
        </Text>
        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>W</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, { color: theme.text }]}>
          {stats.losses}
        </Text>
        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>L</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, { color: theme.text }]}>
          {stats.draws}
        </Text>
        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>D</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 24,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 20,
    marginHorizontal: 2,
  },
});
