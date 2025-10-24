import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MINT = '#66D8C9';
const MINT_DEEP = '#4ECDC4';
const TEXT_DARK = '#1F2937';
const MUTED = '#6B6B6B';

interface ProfileHeaderProps {
  initials: string;
  name: string;
  role: string;
}

const AVATAR_SIZE = 100;

export default function ProfileHeader({ initials, name, role }: ProfileHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarInitials}>{initials}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingTop: 40, paddingBottom: 28, gap: 6 },
  avatarCircle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: MINT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarInitials: { fontSize: 30, fontWeight: '700', color: MINT_DEEP },
  name: { marginTop: 10, fontSize: 22, fontWeight: '700', color: TEXT_DARK, textAlign: 'center' },
  role: { fontSize: 14, color: MUTED, textAlign: 'center' },
});