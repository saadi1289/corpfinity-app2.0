import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import PageContainer from '../components/PageContainer';
import MonthlySummary from '../components/insights/MonthlySummary';
import CompletedCard, { CompletedChallenge } from '../components/insights/CompletedCard';
import InProgressCard, { InProgressChallenge } from '../components/insights/InProgressCard';
import { BG_GRADIENT } from '../constants/layout';

const MINT = '#66D8C9';
const MINT_DEEP = '#4ECDC4';


interface CompletedChallenge {
  title: string;
  duration: string;
  goal: string;
  completedAt: string;
}

interface InProgressChallenge {
  title: string;
  duration: string;
  goal: string;
  progress: number; // percentage
}

const completedChallenges: CompletedChallenge[] = [
  { title: 'Mindful Breathing', duration: '10 mins', goal: 'Stress Reduction', completedAt: 'Oct 5, 2025' },
  { title: 'Calm Stretch', duration: '15 mins', goal: 'Calm', completedAt: 'Oct 3, 2025' },
  { title: 'Sleep Prep Routine', duration: '20 mins', goal: 'Sleep', completedAt: 'Sep 29, 2025' },
];

const inProgressChallenges: InProgressChallenge[] = [
  { title: 'Focus Sprint', duration: '15 mins', goal: 'Focus', progress: 60 },
  { title: 'Desk Mobility', duration: '10 mins', goal: 'Physical', progress: 35 },
];



export default function Insights() {
  const [activeTab, setActiveTab] = useState<'completed' | 'in_progress'>('completed');

  const monthlyHours = 12.5; // could be calculated from real data
  const monthlyTarget = 20;   // example target
  const monthlyPct = Math.round((monthlyHours / monthlyTarget) * 100);

  return (
    <LinearGradient colors={BG_GRADIENT} style={styles.container}>
      <PageContainer>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Ionicons name="stats-chart" size={20} color={MINT_DEEP} />
            </View>
            <Text style={styles.headerTitle}>Your Wellness Insights</Text>
          </View>

          {/* Monthly summary with small circular indicator */}
          <MonthlySummary hours={monthlyHours} target={monthlyTarget} pct={monthlyPct} />

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
              onPress={() => setActiveTab('completed')}
            >
              <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'in_progress' && styles.activeTab]}
              onPress={() => setActiveTab('in_progress')}
            >
              <Text style={[styles.tabText, activeTab === 'in_progress' && styles.activeTabText]}>In Progress</Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          <Animatable.View key={activeTab} animation="fadeIn" duration={300} style={styles.listContainer}>
            {activeTab === 'completed' ? (
              completedChallenges.map((item, idx) => (
                <CompletedCard key={idx} item={item} />
              ))
            ) : (
              inProgressChallenges.map((item, idx) => (
                <InProgressCard key={idx} item={item} />
              ))
            )}
          </Animatable.View>
        </ScrollView>
      </PageContainer>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  content: { paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
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
  circleContainer: {
    marginRight: 12,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: MINT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  circleHours: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  circleLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  summaryTextBox: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  summarySub: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#F0FDFA',
    shadowColor: MINT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: MINT_DEEP,
  },
  listContainer: {
    marginHorizontal: 16,
    marginTop: 12,
  },
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
  progressRow: {
    marginTop: 12,
  },
  progressTrack: {
    height: 10,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressFill: {
    height: 10,
    backgroundColor: MINT_DEEP,
    borderRadius: 6,
  },
  progressLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});