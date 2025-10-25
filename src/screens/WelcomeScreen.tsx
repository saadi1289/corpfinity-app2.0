import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../components/Logo';

interface WelcomeScreenProps {
  onFinish?: () => void;
  minimumDurationMs?: number;
  slogan?: string;
}

// Professional welcome screen with enhanced animations and darker gradient
// Ensures a minimum display time before transitioning
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onFinish,
  minimumDurationMs = 1500,
  slogan = 'Elevate Workplace Wellness',
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations for a more engaging welcome experience
    const logoAnimation = Animated.parallel([
      // Logo fade in and scale up
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), // bounce-like easing
        useNativeDriver: true,
      }),
    ]);

    // Text fade in after logo
    const textAnimation = Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 400,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: true,
    });

    // Subtle floating animation
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Start animations
    logoAnimation.start();
    textAnimation.start();
    
    // Start floating animation after initial animations
    setTimeout(() => {
      floatingAnimation.start();
    }, 1000);

    const timer = setTimeout(() => {
      onFinish?.();
    }, minimumDurationMs);

    return () => {
      clearTimeout(timer);
      floatingAnimation.stop();
    };
  }, [minimumDurationMs, onFinish, fadeAnim, scaleAnim, textFadeAnim, floatAnim]);

  // Darker gradient for welcome screen - more depth than other pages
  const WELCOME_GRADIENT = ['#A7F3D0', '#D1FAE5', '#F0FDF4', '#FFFFFF'];

  const floatingTransform = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <LinearGradient colors={WELCOME_GRADIENT} style={styles.container}>
      <SafeAreaView style={styles.safe} edges={['top','bottom']}>
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}> 
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                transform: [
                  { scale: scaleAnim },
                  { translateY: floatingTransform }
                ]
              }
            ]}
          >
            <Logo size={140} />
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.textContainer,
              { opacity: textFadeAnim }
            ]}
          >
            <Text style={styles.brandName}>Corpfinity</Text>
            <Text style={styles.slogan}>{slogan}</Text>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: { 
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  textContainer: {
    alignItems: 'center',
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  slogan: {
    fontSize: 18,
    lineHeight: 24,
    color: '#4B5563',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

export default WelcomeScreen;