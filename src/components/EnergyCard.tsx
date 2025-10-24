import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EnergyCardProps {
  level: 'Low' | 'Medium' | 'High';
  icon: string;
  isSelected: boolean;
  onPress: () => void;
}

const EnergyCard: React.FC<EnergyCardProps> = ({ level, icon, isSelected, onPress }) => {
  const getEnergyColors = () => {
    switch (level) {
      case 'Low':
        return {
          selectedBorder: '#EF4444',
          selectedBg: '#FEF2F2',
          selectedShadow: '#EF4444',
          selectedText: '#EF4444',
          checkmark: '#EF4444',
        };
      case 'Medium':
        return {
          selectedBorder: '#F59E0B',
          selectedBg: '#FFFBEB',
          selectedShadow: '#F59E0B',
          selectedText: '#F59E0B',
          checkmark: '#F59E0B',
        };
      case 'High':
        return {
          selectedBorder: '#10B981',
          selectedBg: '#ECFDF5',
          selectedShadow: '#10B981',
          selectedText: '#10B981',
          checkmark: '#10B981',
        };
      default:
        return {
          selectedBorder: '#66D8C9',
          selectedBg: '#F0FDFA',
          selectedShadow: '#66D8C9',
          selectedText: '#66D8C9',
          checkmark: '#66D8C9',
        };
    }
  };

  const colors = getEnergyColors();

  return (
    <TouchableOpacity
      style={[
        styles.energyCard,
        isSelected && {
          borderColor: colors.selectedBorder,
          backgroundColor: colors.selectedBg,
          shadowColor: colors.selectedShadow,
          shadowOpacity: 0.3,
        },
      ]}
      onPress={onPress}
      accessibilityLabel={`Energy level ${level}`}
      accessibilityRole="button"
    >
      <View style={styles.energyIconContainer}>
        <Ionicons
          name={
            isSelected
              ? level === 'Low'
                ? 'battery-dead'
                : level === 'Medium'
                ? 'battery-half'
                : 'battery-full'
              : level === 'Low'
              ? 'battery-dead-outline'
              : level === 'Medium'
              ? 'battery-half-outline'
              : 'battery-full-outline'
          }
          size={28}
          color={
            level === 'Low'
              ? isSelected
                ? '#EF4444'
                : '#F87171'
              : level === 'Medium'
              ? isSelected
                ? '#F59E0B'
                : '#FBBF24'
              : isSelected
              ? '#10B981'
              : '#34D399'
          }
        />
      </View>
      <Text
        style={[
          styles.energyText,
          isSelected && { color: colors.selectedText, fontWeight: '600' },
        ]}
      >
        {level}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  energyCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  energyIconContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  energyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
});

export default EnergyCard;