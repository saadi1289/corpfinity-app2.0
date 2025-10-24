import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  started: boolean;
  paused: boolean;
  completed: boolean;
  onPauseToggle: () => void;
  onComplete: () => void;
}

export default function ChallengeActionButtons({ started, paused, completed, onPauseToggle, onComplete }: Props) {
  const canPause = started && !completed;
  const canComplete = started || completed; // allow marking complete if finished

  return (
    <View style={styles.actionsRow}>
      <TouchableOpacity
        style={[styles.pauseBtn, !canPause && styles.btnDisabled]}
        onPress={canPause ? onPauseToggle : undefined}
        accessibilityState={{ disabled: !canPause }}
        pointerEvents={canPause ? 'auto' : 'none'}
      >
        <View style={styles.pauseBtnInner}>
          <Text style={[styles.pauseText, !canPause && styles.disabledText]}>{paused ? 'Resume' : 'Pause'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.completeBtn, !canComplete && styles.btnDisabled]}
        onPress={canComplete ? onComplete : undefined}
        accessibilityState={{ disabled: !canComplete }}
        pointerEvents={canComplete ? 'auto' : 'none'}
      >
        <LinearGradient colors={["#4ECDC4", "#66D8C9"]} style={styles.completeBtnGradient}>
          <Text style={styles.completeText}>Mark Complete</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsRow: { flexDirection: 'row', paddingHorizontal: 0, marginTop: 16, marginBottom: 24, alignItems: 'center' },
  pauseBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  pauseBtnInner: { paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  pauseText: { color: '#111827', fontWeight: '700', fontSize: 16 },
  btnDisabled: { opacity: 0.5 },
  disabledText: { color: '#9CA3AF' },
  completeBtn: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  completeBtnGradient: { paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  completeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});