import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressBar({ progress }: { progress: number }) {
  const pct = Math.min(100, Math.max(0, progress));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${pct}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  fill: {
    height: 10,
    backgroundColor: '#4ECDC4',
    borderRadius: 6,
  },
});