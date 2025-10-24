import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface WellnessGoalCardProps {
  goal: string;
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialIcons' | 'FontAwesome5';
  color: string;
  isSelected: boolean;
  onPress: () => void;
}

const WellnessGoalCard: React.FC<WellnessGoalCardProps> = ({ goal, icon, iconFamily, color, isSelected, onPress }) => {
  const IconComponent = iconFamily === 'Ionicons' ? Ionicons : iconFamily === 'MaterialIcons' ? MaterialIcons : FontAwesome5;

  const getIconName = () => {
    if (isSelected) {
      return icon.replace('-outline', '');
    } else {
      return icon.includes('-outline') ? icon : icon + '-outline';
    }
  };

  const getIconColor = () => {
    if (isSelected) return color;
    const colorMap: { [key: string]: string } = {
      '#F87171': '#FCA5A5',
      '#A78BFA': '#C4B5FD',
      '#FBBF24': '#FCD34D',
      '#34D399': '#6EE7B7',
      '#FB7185': '#FDA4AF',
      '#60A5FA': '#93C5FD',
    };
    return colorMap[color] || '#9CA3AF';
  };

  return (
    <TouchableOpacity
      style={[styles.goalCard, isSelected && [styles.selectedGoalCard, { borderColor: color, shadowColor: color }]]}
      onPress={onPress}
      accessibilityLabel={`Wellness goal ${goal}`}
      accessibilityRole="button"
    >
      {isSelected && <View style={[styles.goalCardGradient, { backgroundColor: color + '08' }]} />}
      <View style={styles.goalIconContainer}>
        <IconComponent name={getIconName() as any} size={24} color={getIconColor()} />
      </View>
      <Text
        style={[styles.goalText, isSelected && [styles.selectedGoalText, { color }], goal.length > 14 && { fontSize: isSelected ? 14 : 13 }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {goal}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goalCard: {
    width: '44%',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#F1F5F9',
    position: 'relative',
    overflow: 'hidden',
  },
  selectedGoalCard: {
    shadowOpacity: 0.15,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  goalCardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  goalIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  goalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  selectedGoalText: {
    fontWeight: '700',
    fontSize: 15,
  },
});

export default WellnessGoalCard;