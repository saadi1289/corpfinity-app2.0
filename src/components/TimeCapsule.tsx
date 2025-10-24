import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

interface TimeCapsuleProps {
  time: '5' | '10' | '15' | '30';
  isSelected: boolean;
  onPress: () => void;
}

const TimeCapsule: React.FC<TimeCapsuleProps> = ({ time, isSelected, onPress }) => {
  const getTimeConfig = () => {
    switch (time) {
      case '5':
        return { iconOutline: 'flash-outline', iconFilled: 'flash', color: '#F59E0B', gradient: ['#F59E0B', '#FBBF24'] };
      case '10':
        return { iconOutline: 'time-outline', iconFilled: 'time', color: '#06B6D4', gradient: ['#06B6D4', '#22D3EE'] };
      case '15':
        return { iconOutline: 'hourglass-outline', iconFilled: 'hourglass', color: '#A855F7', gradient: ['#A855F7', '#C084FC'] };
      case '30':
        return { iconOutline: 'infinite-outline', iconFilled: 'infinite', color: '#10B981', gradient: ['#10B981', '#34D399'] };
      default:
        return { iconOutline: 'time-outline', iconFilled: 'time', color: '#06B6D4', gradient: ['#06B6D4', '#22D3EE'] };
    }
  };

  const config = getTimeConfig();

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`${time} minutes`}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.timeCard,
        isSelected && [styles.selectedTimeCard, { borderColor: config.color, shadowColor: config.color }],
        pressed && styles.timeCardPressed,
      ]}
    >
      {isSelected && <LinearGradient colors={[config.gradient[0] + '20', config.gradient[1] + '10']} style={styles.timeCardGradient} />}

      <Animatable.View animation={isSelected ? 'pulse' : undefined} duration={250} style={[styles.timeIconContainer]}>
        <Ionicons name={(isSelected ? config.iconFilled : config.iconOutline) as any} size={20} color={isSelected ? config.color : config.gradient[1]} />
      </Animatable.View>

      <Text style={[styles.timeText, isSelected && [styles.selectedTimeText, { color: config.color }]]}>{time}</Text>
      <Text style={[styles.timeLabel, isSelected && [styles.selectedTimeLabel, { color: config.color }]]}>min</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  timeCard: {
    width: '44%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 75,
    position: 'relative',
    overflow: 'hidden',
  },
  selectedTimeCard: {
    backgroundColor: '#F0FDFA',
    shadowOpacity: 0.2,
    elevation: 6,
    transform: [{ scale: 1.01 }],
  },
  timeCardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  timeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  timeCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  timeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 1,
  },
  selectedTimeText: {
    color: '#4ECDC4',
    fontWeight: '800',
  },
  timeLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  selectedTimeLabel: {
    color: '#4ECDC4',
    fontWeight: '600',
  },
});

export default TimeCapsule;