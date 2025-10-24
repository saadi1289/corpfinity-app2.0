import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface CompletedChallenge {
  title: string;
  duration: string;
  goal: string;
  completedAt: string;
}

export default function CompletedCard({ item }: { item: CompletedChallenge }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardRight}>
          <Ionicons name="checkmark-circle" size={18} color="#66D8C9" />
          <Text style={styles.cardDate}>{item.completedAt}</Text>
        </View>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.metaChip}>
          <Ionicons name="time-outline" size={16} color="#4ECDC4" />
          <Text style={styles.metaText}>{item.duration}</Text>
        </View>
        <View style={styles.metaChip}>
          <Ionicons name="leaf-outline" size={16} color="#4ECDC4" />
          <Text style={styles.metaText}>{item.goal}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
    paddingRight: 8,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardDate: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: 10,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
});