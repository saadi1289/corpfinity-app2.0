import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type IoniconName = keyof typeof Ionicons.glyphMap;

interface SettingsRowProps {
  id: string;
  icon: IoniconName;
  label: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  variant?: 'default' | 'destructive';
}

const RED = '#EF4444';
const MINT_DEEP = '#4ECDC4';

export default function SettingsRow({ id, icon, label, onPress, rightElement, variant = 'default' }: SettingsRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={label}
    >
      <View style={styles.rowLeft}>
        <Ionicons
          name={icon}
          size={22}
          color={variant === 'destructive' ? RED : MINT_DEEP}
          style={{ marginRight: 12 }}
        />
        <Text style={[styles.rowText, variant === 'destructive' && styles.rowTextDestructive]} numberOfLines={1} ellipsizeMode="tail">
          {label}
        </Text>
      </View>
      <View style={styles.rowRight}>
        {rightElement ? (
          rightElement
        ) : (
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 64,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  rowPressed: { opacity: 0.96, transform: [{ translateX: 1 }] },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, minWidth: 0 },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowText: { fontSize: 16, color: '#6B6B6B', letterSpacing: 0.2, flexShrink: 1 },
  rowTextDestructive: { color: RED, fontWeight: '600' },
});