import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Line } from 'react-native-svg';
import { useTheme } from '../theme';

interface AppLogoProps {
  size?: number;
}

export const AppLogo: React.FC<AppLogoProps> = ({ size = 80 }) => {
  const theme = useTheme();
  const strokeWidth = size * 0.08;
  const padding = size * 0.25;
  const lineStart = padding;
  const lineEnd = size - padding;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Rect
          x="0"
          y="0"
          width={size}
          height={size}
          rx={size * 0.18}
          ry={size * 0.18}
          fill={theme.isDark ? theme.card : '#1f2937'}
        />
        <Line
          x1={lineStart}
          y1={lineStart}
          x2={lineEnd}
          y2={lineEnd}
          stroke={theme.xColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Line
          x1={lineEnd}
          y1={lineStart}
          x2={lineStart}
          y2={lineEnd}
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
