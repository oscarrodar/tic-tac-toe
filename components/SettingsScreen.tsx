import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../theme';
import { useSettingsContext } from '../contexts/SettingsContext';
import { AIDifficulty, ThemePreference } from '../types';

interface SettingsScreenProps {
  onBack: () => void;
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

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const { settings, updateSetting } = useSettingsContext();
  const theme = useTheme(settings.theme);

  const renderToggle = (
    label: string,
    value: boolean,
    onToggle: (value: boolean) => void
  ) => (
    <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
      <Text style={[styles.settingLabel, { color: theme.text }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: theme.border, true: theme.primary }}
        thumbColor="#ffffff"
      />
    </View>
  );

  const renderSegmented = <T extends string>(
    label: string,
    options: { value: T; label: string }[],
    selected: T,
    onSelect: (value: T) => void
  ) => (
    <View style={[styles.settingRow, styles.settingRowVertical, { borderBottomColor: theme.border }]}>
      <Text style={[styles.settingLabel, { color: theme.text }]}>{label}</Text>
      <View style={styles.segmentedContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segmentedButton,
              { borderColor: theme.border },
              selected === option.value && {
                backgroundColor: theme.primaryLight,
                borderColor: theme.primary,
              },
            ]}
            onPress={() => onSelect(option.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.segmentedText,
                { color: theme.textSecondary },
                selected === option.value && { color: theme.primary },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTextInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string
  ) => (
    <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
      <Text style={[styles.settingLabel, { color: theme.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.textInput,
          { color: theme.text, borderColor: theme.border },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        maxLength={15}
      />
    </View>
  );

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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            DEFAULT NAMES
          </Text>
          <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            {renderTextInput(
              'Player X',
              settings.defaultPlayerXName,
              (text) => updateSetting('defaultPlayerXName', text),
              'Player 1'
            )}
            {renderTextInput(
              'Player O',
              settings.defaultPlayerOName,
              (text) => updateSetting('defaultPlayerOName', text),
              'Player 2'
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            GAMEPLAY
          </Text>
          <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            {renderSegmented<AIDifficulty>(
              'Default AI Difficulty',
              [
                { value: 'easy', label: 'Easy' },
                { value: 'medium', label: 'Medium' },
                { value: 'hard', label: 'Hard' },
              ],
              settings.defaultAIDifficulty,
              (value) => updateSetting('defaultAIDifficulty', value)
            )}
            {renderToggle('Haptic Feedback', settings.hapticFeedback, (value) =>
              updateSetting('hapticFeedback', value)
            )}
            {renderToggle('Sound Effects', settings.soundEffects, (value) =>
              updateSetting('soundEffects', value)
            )}
            {renderToggle(
              'Alternate First Player',
              settings.alternateFirstPlayer,
              (value) => updateSetting('alternateFirstPlayer', value)
            )}
            {renderToggle('Confirm Reset', settings.confirmReset, (value) =>
              updateSetting('confirmReset', value)
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            APPEARANCE
          </Text>
          <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            {renderSegmented<ThemePreference>(
              'Theme',
              [
                { value: 'system', label: 'System' },
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
              ],
              settings.theme,
              (value) => updateSetting('theme', value)
            )}
          </View>
        </View>

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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  settingRowVertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  settingLabel: {
    fontSize: 16,
  },
  segmentedContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  segmentedButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  segmentedText: {
    fontSize: 14,
    fontWeight: '500',
  },
  textInput: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 120,
    textAlign: 'right',
  },
});
