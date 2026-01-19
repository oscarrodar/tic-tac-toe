import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Circle } from 'react-native-svg';
import { useTheme } from '../theme';
import { useSettingsContext } from '../contexts/SettingsContext';

// This component renders the logo programmatically instead of using assets/adaptive-icon.svg
// because it uses theme.xColor and theme.oColor, allowing it to adapt to light/dark mode automatically.

interface AppLogoProps {
  size?: number;
}

export const AppLogo: React.FC<AppLogoProps> = ({ size = 80 }) => {
  const { settings } = useSettingsContext();
  const theme = useTheme(settings.theme);

  // Based on the 1024x1024 adaptive-icon.svg scaled to size
  // Each cell is roughly 320x320 in the original, with 384 gap between cells
  const scale = size / 1024;
  const strokeWidth = 56 * scale;

  // Cell positions (top-left corner of each 320x320 cell area)
  const topLeft = { x: 160 * scale, y: 160 * scale };
  const topRight = { x: 544 * scale, y: 160 * scale };
  const bottomLeft = { x: 160 * scale, y: 544 * scale };
  const bottomRight = { x: 544 * scale, y: 544 * scale };

  // X dimensions within cell (40 to 280 in original = 240 span)
  const xOffset = 40 * scale;
  const xSpan = 240 * scale;

  // O dimensions (center at 160,160 with radius 120 in original)
  const oCenter = 160 * scale;
  const oRadius = 120 * scale;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background */}
        <Rect
          x="0"
          y="0"
          width={size}
          height={size}
          rx={size * 0.176}
          ry={size * 0.176}
          fill={theme.isDark ? theme.card : '#1f2937'}
        />

        {/* Top-left X */}
        <Line
          x1={topLeft.x + xOffset}
          y1={topLeft.y + xOffset}
          x2={topLeft.x + xOffset + xSpan}
          y2={topLeft.y + xOffset + xSpan}
          stroke={theme.xColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Line
          x1={topLeft.x + xOffset + xSpan}
          y1={topLeft.y + xOffset}
          x2={topLeft.x + xOffset}
          y2={topLeft.y + xOffset + xSpan}
          stroke={theme.xColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Top-right O */}
        <Circle
          cx={topRight.x + oCenter}
          cy={topRight.y + oCenter}
          r={oRadius}
          fill="none"
          stroke={theme.oColor}
          strokeWidth={strokeWidth}
        />

        {/* Bottom-left O */}
        <Circle
          cx={bottomLeft.x + oCenter}
          cy={bottomLeft.y + oCenter}
          r={oRadius}
          fill="none"
          stroke={theme.oColor}
          strokeWidth={strokeWidth}
        />

        {/* Bottom-right X */}
        <Line
          x1={bottomRight.x + xOffset}
          y1={bottomRight.y + xOffset}
          x2={bottomRight.x + xOffset + xSpan}
          y2={bottomRight.y + xOffset + xSpan}
          stroke={theme.xColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Line
          x1={bottomRight.x + xOffset + xSpan}
          y1={bottomRight.y + xOffset}
          x2={bottomRight.x + xOffset}
          y2={bottomRight.y + xOffset + xSpan}
          stroke={theme.xColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
