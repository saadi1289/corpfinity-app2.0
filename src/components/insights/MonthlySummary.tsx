import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MonthlySummaryProps {
  hours: number;
  target: number;
  pct: number;
}

export default function MonthlySummary({ hours, target, pct }: MonthlySummaryProps) {
  return (
    <View style={styles.monthlySummary}>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleHours}>{hours}h</Text>
          <Text style={styles.circleLabel}>This Month</Text>
        </View>
      </View>
      <View style={styles.summaryTextBox}>
        <Text style={styles.summaryTitle}>Consistent progress</Text>
        <Text style={styles.summarySub}>You're at {pct}% of your {target}h goal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  monthlySummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  circleContainer: { marginRight: 12 },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#66D8C9',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  circleHours: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  circleLabel: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  summaryTextBox: { flex: 1 },
  summaryTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  summarySub: { fontSize: 13, color: '#6B7280', marginTop: 4 },
});