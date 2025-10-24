import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ChallengeTimerProps {
  totalSeconds: number;
  secondsLeft: number;
  started: boolean;
  paused: boolean;
  completed: boolean;
  timeLabel: string;
  onStart: () => void;
}

export default function ChallengeTimer({ totalSeconds, secondsLeft, started, paused, completed, timeLabel, onStart }: ChallengeTimerProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const ringPulseAnim = useRef(new Animated.Value(1)).current;

  const radius = 85;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;

  // Animate breathing continuously
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, { toValue: 1.04, duration: 1800, useNativeDriver: true }),
        Animated.timing(breatheAnim, { toValue: 1.0, duration: 1800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [breatheAnim]);

  // Pulse the ring while active
  useEffect(() => {
    if (started && !paused && !completed) {
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(ringPulseAnim, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
          Animated.timing(ringPulseAnim, { toValue: 1.0, duration: 1000, useNativeDriver: true }),
        ])
      );
      pulseLoop.start();
      return () => pulseLoop.stop();
    } else {
      ringPulseAnim.setValue(1);
    }
  }, [started, paused, completed, ringPulseAnim]);

  // Animate progress based on secondsLeft
  useEffect(() => {
    const elapsed = totalSeconds - secondsLeft;
    const pct = Math.max(0, Math.min(1, elapsed / totalSeconds));
    Animated.timing(progressAnim, {
      toValue: pct,
      duration: 900,
      useNativeDriver: false,
    }).start();
    if (!started && secondsLeft <= 0) {
      // ensure ring is fully filled when completed
      progressAnim.setValue(1);
    }
  }, [secondsLeft, totalSeconds, progressAnim, started]);

  const dashOffset = Animated.multiply(progressAnim, circumference).interpolate({
    inputRange: [0, circumference],
    outputRange: [circumference, 0],
  }) as unknown as number;

  const handleStart = () => {
    if (!started && secondsLeft <= 0) {
      progressAnim.setValue(0);
    }
    onStart();
  };

  return (
    <View style={styles.timerSection}>
      <View style={styles.timerCard}>
        <LinearGradient colors={["#F0FDFA", "#FFFFFF"]} style={styles.timerCardGradient} />
        <Animated.View style={[styles.timerWrapper, { transform: [{ scale: breatheAnim }] }]}>
          <Animated.View style={{ transform: [{ scale: ringPulseAnim }] }}>
            <Svg width={radius * 2 + stroke} height={radius * 2 + stroke}>
              <Circle
                cx={`${radius + stroke / 2}`}
                cy={`${radius + stroke / 2}`}
                r={`${radius}`}
                stroke="#E2E8F0"
                strokeWidth={`${stroke}`}
                fill="none"
              />
              <AnimatedCircle
                cx={`${radius + stroke / 2}`}
                cy={`${radius + stroke / 2}`}
                r={`${radius}`}
                stroke="#4ECDC4"
                strokeWidth={`${stroke}`}
                strokeDasharray={`${circumference}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                fill="none"
                transform={`rotate(-90 ${radius + stroke / 2} ${radius + stroke / 2})`}
              />
            </Svg>
          </Animated.View>
          <View style={styles.timerCenter}>
            <Text style={styles.timeText}>{timeLabel}</Text>
            <Text style={styles.timeSubText}>
              {completed ? 'Completed!' : !started ? 'Ready to start' : paused ? 'Paused' : 'Time remaining'}
            </Text>
            {!started && (
              <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
                <LinearGradient colors={["#4ECDC4", "#66D8C9"]} style={styles.startBtnGradient}>
                  <Text style={styles.startText}>{secondsLeft <= 0 ? 'Restart' : 'Start'}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerSection: { alignItems: 'center', marginTop: 16, marginBottom: 20, paddingHorizontal: 20 },
  timerCard: {
    width: 240,
    height: 240,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timerCardGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 20 },
  timerWrapper: { width: 200, height: 200, alignItems: 'center', justifyContent: 'center' },
  timerCenter: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  timeText: { fontSize: 32, fontWeight: '800', color: '#1F2937', letterSpacing: -0.5 },
  timeSubText: { fontSize: 14, color: '#6B7280', marginTop: 6, fontWeight: '500', textAlign: 'center' },
  startBtn: {
    marginTop: 12,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startBtnGradient: { paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' },
  startText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});