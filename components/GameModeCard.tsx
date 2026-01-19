import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../theme';

interface GameModeCardProps {
  title: string;
  subtitle: string;
  icon: 'single' | 'two' | 'online';
  selected: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const SinglePlayerIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={7} r={4} stroke={color} strokeWidth={2} />
  </Svg>
);

const TwoPlayerIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={9} cy={7} r={4} stroke={color} strokeWidth={2} />
    <Path
      d="M23 21v-2a4 4 0 0 0-3-3.87"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.13a4 4 0 0 1 0 7.75"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const OnlineIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Path
      d="M2 12h20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

export const GameModeCard: React.FC<GameModeCardProps> = ({
  title,
  subtitle,
  icon,
  selected,
  disabled = false,
  onPress,
}) => {
  const theme = useTheme();
  const iconColor = disabled ? theme.textSecondary : theme.textSecondary;

  const renderIcon = () => {
    const props = { size: 24, color: iconColor };
    switch (icon) {
      case 'single':
        return <SinglePlayerIcon {...props} />;
      case 'two':
        return <TwoPlayerIcon {...props} />;
      case 'online':
        return <OnlineIcon {...props} />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: selected ? theme.primaryLight : theme.card,
          borderColor: selected ? theme.primary : theme.border,
        },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={`${title}. ${subtitle}`}
      accessibilityHint={disabled ? 'Coming soon' : `Select ${title} mode`}
    >
      <View style={styles.iconContainer}>{renderIcon()}</View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {subtitle}
        </Text>
      </View>

      <View
        style={[
          styles.radio,
          {
            borderColor: disabled ? theme.textSecondary : theme.primary,
          },
        ]}
      >
        {selected && !disabled && (
          <View
            style={[styles.radioInner, { backgroundColor: theme.primary }]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    minHeight: 72,
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
