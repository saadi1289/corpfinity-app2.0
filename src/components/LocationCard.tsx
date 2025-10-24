import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface LocationCardProps {
  location: 'Office' | 'Gym' | 'Outdoor' | 'Home';
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialIcons' | 'FontAwesome5';
  isSelected: boolean;
  onPress: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, icon, iconFamily, isSelected, onPress }) => {
  const IconComponent = iconFamily === 'Ionicons' ? Ionicons : iconFamily === 'MaterialIcons' ? MaterialIcons : FontAwesome5;

  const getLocationColors = () => {
    switch (location) {
      case 'Office':
        return { selectedBorder: '#3B82F6', selectedBg: '#EFF6FF', selectedShadow: '#3B82F6', selectedText: '#3B82F6', glow: '#3B82F6' };
      case 'Gym':
        return { selectedBorder: '#8B5CF6', selectedBg: '#F5F3FF', selectedShadow: '#8B5CF6', selectedText: '#8B5CF6', glow: '#8B5CF6' };
      case 'Outdoor':
        return { selectedBorder: '#10B981', selectedBg: '#ECFDF5', selectedShadow: '#10B981', selectedText: '#10B981', glow: '#10B981' };
      case 'Home':
        return { selectedBorder: '#F59E0B', selectedBg: '#FFFBEB', selectedShadow: '#F59E0B', selectedText: '#F59E0B', glow: '#F59E0B' };
      default:
        return { selectedBorder: '#66D8C9', selectedBg: '#F0FDFA', selectedShadow: '#66D8C9', selectedText: '#66D8C9', glow: '#66D8C9' };
    }
  };

  const colors = getLocationColors();

  return (
    <TouchableOpacity
      style={[
        styles.locationCard,
        isSelected && {
          borderColor: colors.selectedBorder,
          backgroundColor: colors.selectedBg,
          shadowColor: colors.selectedShadow,
          shadowOpacity: 0.3,
        },
      ]}
      onPress={onPress}
      accessibilityLabel={`Location ${location}`}
      accessibilityRole="button"
    >
      <IconComponent
        name={
          iconFamily === 'Ionicons'
            ? isSelected
              ? location === 'Office'
                ? 'business'
                : location === 'Outdoor'
                ? 'leaf'
                : 'home'
              : location === 'Office'
              ? 'business-outline'
              : location === 'Outdoor'
              ? 'leaf-outline'
              : 'home-outline'
            : (icon as any)
        }
        size={24}
        color={
          location === 'Office'
            ? isSelected
              ? '#3B82F6'
              : '#60A5FA'
            : location === 'Gym'
            ? isSelected
              ? '#8B5CF6'
              : '#A78BFA'
            : location === 'Outdoor'
            ? isSelected
              ? '#10B981'
              : '#34D399'
            : isSelected
            ? '#F59E0B'
            : '#FBBF24'
        }
      />
      <Text style={[styles.locationText, isSelected && { color: colors.selectedText, fontWeight: '600' }]}>{location}</Text>
      {isSelected && <View style={[styles.locationGlow, { backgroundColor: colors.glow }]} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  locationCard: {
    width: '44%',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  locationGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#66D8C9',
    opacity: 0.1,
    borderRadius: 16,
  },
  locationText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
});

export default LocationCard;