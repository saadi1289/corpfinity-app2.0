import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text, Pressable, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HEADER_HEIGHT, LOGO_WIDTH, LOGO_HEIGHT, H_PADDING } from '../constants/layout';
import { LinearGradient } from 'expo-linear-gradient';

// Brand-aligned color tokens (derived from existing app usage)
const COLORS = {
  white: '#FFFFFF',
  textDark: '#1F2937',
  border: '#E5E7EB',
  accent: '#66D8C9',
  badge: '#EF4444',
  hoverBg: '#F7FAFC',
};

interface AppHeaderProps {
  onPressNotification?: () => void;
  notificationCount?: number;
  showBack?: boolean;
  onPressBack?: () => void;
}

// Reusable icon button with subtle animated feedback, hover accents, and accessibility
const IconButton = ({
  iconName,
  accessibilityLabel,
  onPress,
  badgeCount,
}: {
  iconName: keyof typeof Ionicons.glyphMap | string;
  accessibilityLabel: string;
  onPress?: () => void;
  badgeCount?: number;
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [hovered, setHovered] = useState(false);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 15,
    }).start();
  };

  // Pulse animation when badge count changes
  const badgeScale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (badgeCount && badgeCount > 0) {
      badgeScale.setValue(0.9);
      Animated.spring(badgeScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 18,
        bounciness: 8,
      }).start();
    }
  }, [badgeCount]);

  return (
    <Animated.View style={[styles.iconBtnAnimated, { transform: [{ scale }] }]}> 
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        hitSlop={8}
        style={({ pressed }) => [
          styles.iconBtn,
          hovered && styles.iconBtnHover,
          pressed && styles.iconBtnPressed,
        ]}
      >
        <Ionicons name={iconName as any} size={22} color={COLORS.textDark} />
        {badgeCount && badgeCount > 0 ? (
          <Animated.View style={[styles.badge, { transform: [{ scale: badgeScale }] }]}>
            <Text style={styles.badgeText} numberOfLines={1}>
              {badgeCount}
            </Text>
          </Animated.View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
};

export default function AppHeader({ onPressNotification, notificationCount = 0, showBack = false, onPressBack }: AppHeaderProps) {
  return (
    <LinearGradient
      colors={[COLORS.white, '#F0FDFA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, styles.floatingCard]}
    >
      <View style={styles.left}>
        {showBack && (
          <IconButton
            iconName="chevron-back"
            accessibilityLabel="Go back"
            onPress={onPressBack}
          />
        )}
        <Image source={require('../../assets/icon.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <IconButton
        iconName="notifications-outline"
        accessibilityLabel="Notifications"
        onPress={onPressNotification}
        badgeCount={notificationCount}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_PADDING,
    // Removed plain white bar and bottom border to adopt floating style
    // backgroundColor: COLORS.white,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.border,
  },
  floatingCard: {
    position: 'absolute',
    top: 8,
    left: H_PADDING,
    right: H_PADDING,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
    paddingHorizontal: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  // Icon button base styles
  iconBtnAnimated: {
    // keeps layout stable while animating scale
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
  },
  iconBtnHover: {
    backgroundColor: COLORS.hoverBg,
    borderColor: '#E2E8F0',
    shadowOpacity: 0.08,
  },
  iconBtnPressed: {
    opacity: 0.96,
    borderColor: '#D1FAE5', // subtle accent ring on press
    shadowOpacity: 0.1,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
    // improved legibility
    letterSpacing: 0.2,
  },
});