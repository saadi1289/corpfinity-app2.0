import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChallengeDetailsListProps {
  instructions: string[];
}

export default function ChallengeDetailsList({ instructions }: ChallengeDetailsListProps) {
  return (
    <View style={styles.detailsCard}>
      <Text style={styles.detailsTitle}>Challenge Details</Text>
      <View style={styles.detailsList}>
        {instructions.map((item, idx) => (
          <View key={idx} style={styles.detailItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.detailText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0FDFA',
  },
  detailsTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1F2937', 
    marginBottom: 12, 
    textAlign: 'center' 
  },
  detailsList: { marginTop: 4 },
  detailItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  bullet: { color: '#4ECDC4', marginRight: 10, fontSize: 16, marginTop: 2 },
  detailText: { flex: 1, color: '#4B5563', fontSize: 15, lineHeight: 22 },
});