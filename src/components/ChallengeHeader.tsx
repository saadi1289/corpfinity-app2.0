import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChallengeHeaderProps {
  title: string;
}

export default function ChallengeHeader({ title }: ChallengeHeaderProps) {
  return (
    <View style={styles.contentHeader}>
      <Text style={styles.contentHeaderTitle} numberOfLines={1}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentHeader: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  contentHeaderTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
});