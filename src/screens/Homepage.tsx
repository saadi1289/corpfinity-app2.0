import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PageContainer from '../components/PageContainer';
import EnergyCard from '../components/EnergyCard';
import LocationCard from '../components/LocationCard';
import TimeCapsule from '../components/TimeCapsule';
import WellnessGoalCard from '../components/WellnessGoalCard';
import { SECTION_SPACING } from '../constants/layout';
type EnergyLevel = 'low' | 'medium' | 'high' | null;
type Location = 'office' | 'gym' | 'outdoor' | 'home' | null;
type TimeOption = '5' | '10' | '15' | '30' | null;
type WellnessGoal = 'stress' | 'sleep' | 'focus' | 'calm' | 'productivity' | 'physical' | null;

interface Challenge {
  title: string;
  description: string;
  duration: string;
  activities: string[];
}

interface HomepageProps {
  navigation?: any;
}

const Homepage: React.FC<HomepageProps> = ({ navigation }) => {
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyLevel>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>(null);
  const [selectedTime, setSelectedTime] = useState<TimeOption>(null);
  const [selectedGoal, setSelectedGoal] = useState<WellnessGoal>(null);
  const [suggestedChallenge, setSuggestedChallenge] = useState<Challenge | null>(null);

  // Dynamic bottom padding to avoid overlap with Bottom Tab
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const EXTRA_SPACING = 24; // additional spacing for comfort
  const bottomPadding = Math.max(24, insets.bottom + tabBarHeight + EXTRA_SPACING);

  const isAllSelected = selectedEnergy && selectedLocation && selectedTime && selectedGoal;

  const handleSuggestChallenge = () => {
    if (isAllSelected) {
      // Mock challenge suggestion
      const mockChallenge: Challenge = {
        title: "Mindful Desk Break",
        description: "A quick stress-relief session perfect for your office environment",
        duration: `${selectedTime} minutes`,
        activities: [
          "Deep breathing exercises (2 min)",
          "Gentle neck and shoulder stretches",
          "Mindfulness meditation",
          "Positive affirmation practice"
        ]
      };
      setSuggestedChallenge(mockChallenge);
    }
  };

  const handleResuggest = () => {
    setSuggestedChallenge(null);
    // Reset all selections for new suggestion
    setSelectedEnergy(null);
    setSelectedLocation(null);
    setSelectedTime(null);
    setSelectedGoal(null);
  };

  const handleStartChallenge = () => {
    if (suggestedChallenge && navigation) {
      // Navigate to challenge screen with challenge data
      navigation.navigate('Challenges', {
        challengeData: {
          title: suggestedChallenge.title,
          description: suggestedChallenge.description,
          duration: suggestedChallenge.duration,
          activities: suggestedChallenge.activities,
          energyLevel: selectedEnergy,
          location: selectedLocation,
          timeSelected: selectedTime,
          goal: selectedGoal
        }
      });
    }
  };

  // EnergyCard moved to src/components/EnergyCard.tsx

  // LocationCard moved to src/components/LocationCard.tsx

  // TimeCapsule moved to src/components/TimeCapsule.tsx

  // WellnessGoalCard moved to src/components/WellnessGoalCard.tsx

  return (
    <LinearGradient
      colors={['#E6FFFA', '#FFFFFF', '#FFFFFF']}
      style={styles.container}
    >
      <PageContainer>
        <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: bottomPadding }} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <Animatable.View animation="fadeInUp" duration={800} style={styles.heroSection}>
            <Text style={styles.greeting}>Welcome back, Sarah!</Text>
            <Text style={styles.subGreeting}>How are you feeling today?</Text>
          </Animatable.View>

          {/* Energy Level Selection */}
          <Animatable.View animation="fadeInUp" duration={800} delay={200} style={styles.section}>
            <Text style={styles.sectionTitle}>How's your energy today?</Text>
            <View style={styles.energyContainer}>
              <EnergyCard
                level="Low"
                icon="battery-dead-outline"
                isSelected={selectedEnergy === 'low'}
                onPress={() => setSelectedEnergy('low')}
              />
              <EnergyCard
                level="Medium"
                icon="battery-half-outline"
                isSelected={selectedEnergy === 'medium'}
                onPress={() => setSelectedEnergy('medium')}
              />
              <EnergyCard
                level="High"
                icon="battery-full-outline"
                isSelected={selectedEnergy === 'high'}
                onPress={() => setSelectedEnergy('high')}
              />
            </View>
          </Animatable.View>

          {/* Location Selection */}
          <Animatable.View animation="fadeInUp" duration={800} delay={400} style={styles.section}>
            <Text style={styles.sectionTitle}>Where are you today?</Text>
            <View style={styles.locationContainer}>
              <LocationCard
                location="Office"
                icon="business-outline"
                iconFamily="Ionicons"
                isSelected={selectedLocation === 'office'}
                onPress={() => setSelectedLocation('office')}
              />
              <LocationCard
                location="Gym"
                icon="fitness-center"
                iconFamily="MaterialIcons"
                isSelected={selectedLocation === 'gym'}
                onPress={() => setSelectedLocation('gym')}
              />
              <LocationCard
                location="Outdoor"
                icon="leaf-outline"
                iconFamily="Ionicons"
                isSelected={selectedLocation === 'outdoor'}
                onPress={() => setSelectedLocation('outdoor')}
              />
              <LocationCard
                location="Home"
                icon="home-outline"
                iconFamily="Ionicons"
                isSelected={selectedLocation === 'home'}
                onPress={() => setSelectedLocation('home')}
              />
            </View>
          </Animatable.View>

          {/* Time Selection */}
          <Animatable.View animation="fadeInUp" duration={800} delay={600} style={styles.section}>
            <Text style={styles.sectionTitle}>How much time do you have?</Text>
            <View style={styles.timeGridContainer}>
              <TimeCapsule
                time="5"
                isSelected={selectedTime === '5'}
                onPress={() => setSelectedTime('5')}
              />
              <TimeCapsule
                time="10"
                isSelected={selectedTime === '10'}
                onPress={() => setSelectedTime('10')}
              />
              <TimeCapsule
                time="15"
                isSelected={selectedTime === '15'}
                onPress={() => setSelectedTime('15')}
              />
              <TimeCapsule
                time="30"
                isSelected={selectedTime === '30'}
                onPress={() => setSelectedTime('30')}
              />
            </View>
          </Animatable.View>

          {/* Wellness Goals Selection */}
          <Animatable.View animation="fadeInUp" duration={800} delay={800} style={styles.section}>
            <Text style={styles.sectionTitle}>Choose your wellness goal</Text>
            <View style={styles.goalsContainer}>
              <WellnessGoalCard
                goal="Stress Reduction"
                icon="shield-checkmark-outline"
                iconFamily="Ionicons"
                color="#F87171"
                isSelected={selectedGoal === 'stress'}
                onPress={() => setSelectedGoal('stress')}
              />
              <WellnessGoalCard
                goal="Better Sleep"
                icon="moon-outline"
                iconFamily="Ionicons"
                color="#A78BFA"
                isSelected={selectedGoal === 'sleep'}
                onPress={() => setSelectedGoal('sleep')}
              />
              <WellnessGoalCard
                goal="Focus Boost"
                icon="eye-outline"
                iconFamily="Ionicons"
                color="#FBBF24"
                isSelected={selectedGoal === 'focus'}
                onPress={() => setSelectedGoal('focus')}
              />
              <WellnessGoalCard
                goal="Calm Mind"
                icon="leaf-outline"
                iconFamily="Ionicons"
                color="#34D399"
                isSelected={selectedGoal === 'calm'}
                onPress={() => setSelectedGoal('calm')}
              />
              <WellnessGoalCard
                goal="Productivity"
                icon="trending-up-outline"
                iconFamily="Ionicons"
                color="#FB7185"
                isSelected={selectedGoal === 'productivity'}
                onPress={() => setSelectedGoal('productivity')}
              />
              <WellnessGoalCard
                goal="Physical Activity"
                icon="fitness-outline"
                iconFamily="Ionicons"
                color="#60A5FA"
                isSelected={selectedGoal === 'physical'}
                onPress={() => setSelectedGoal('physical')}
              />
            </View>
          </Animatable.View>

          {/* Suggest Challenge Button */}
          <Animatable.View animation="fadeInUp" duration={800} delay={1000} style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.suggestButton,
                isAllSelected ? styles.activeButton : styles.inactiveButton
              ]}
              onPress={handleSuggestChallenge}
              disabled={!isAllSelected}
              accessibilityLabel="Suggest Challenge"
              accessibilityRole="button"
            >
              <Text style={[
                styles.buttonText,
                isAllSelected ? styles.activeButtonText : styles.inactiveButtonText
              ]}>
                Suggest Challenge
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Challenge Suggestion Box */}
          {suggestedChallenge && (
            <Animatable.View animation="fadeIn" duration={600} style={styles.challengeContainer}>
              <View style={styles.challengeBox}>
                <Text style={styles.challengeTitle}>{suggestedChallenge.title}</Text>
                <Text style={styles.challengeDescription}>{suggestedChallenge.description}</Text>
                <Text style={styles.challengeDuration}>Duration: {suggestedChallenge.duration}</Text>
                
                <View style={styles.activitiesContainer}>
                  {suggestedChallenge.activities.map((activity, index) => (
                    <View key={index} style={styles.activityItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.activityText}>{activity}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.challengeButtons}>
                  <TouchableOpacity
                    style={styles.resuggestButton}
                    onPress={handleResuggest}
                    accessibilityLabel="Resuggest Challenge"
                    accessibilityRole="button"
                  >
                    <Text style={styles.resuggestButtonText}>Resuggest </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={handleStartChallenge}
                    accessibilityLabel="Start Challenge"
                    accessibilityRole="button"
                  >
                    <Text style={styles.startButtonText}>Start </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animatable.View>
          )}
        </ScrollView>
      </PageContainer>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    // Removed horizontal padding to rely on standardized PageContainer width
    paddingBottom: 0,
  },
  heroSection: {
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subGreeting: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: SECTION_SPACING,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  energyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Removed extra horizontal padding for uniform section alignment
  },
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
  selectedEnergyCard: {
    borderColor: '#66D8C9',
    backgroundColor: '#F0FDFA',
    shadowColor: '#66D8C9',
    shadowOpacity: 0.3,
  },
  energyIconContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  checkmarkContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  energyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedText: {
    color: '#66D8C9',
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
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
  selectedLocationCard: {
    backgroundColor: '#F0FDFA',
    shadowColor: '#66D8C9',
    shadowOpacity: 0.3,
    borderColor: '#66D8C9',
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
  selectedLocationText: {
    color: '#66D8C9',
    fontWeight: '600',
  },
  // New time grid/card styles for two-column layout
  timeGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
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
  timeCardHover: {
    shadowOpacity: 0.16,
    transform: [{ translateY: -2 }],
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
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
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
     borderColor: '#4ECDC4',
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
  buttonContainer: {
    marginBottom: SECTION_SPACING,
    position: 'relative',
    zIndex: 20,
  },
  suggestButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 20,
  },
  activeButton: {
    backgroundColor: '#66D8C9',
    shadowColor: '#66D8C9',
    shadowOpacity: 0.3,
  },
  inactiveButton: {
    backgroundColor: '#F3F4F6',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
  inactiveButtonText: {
    color: '#9CA3AF',
  },
  challengeContainer: {
    paddingHorizontal: 0, // Removed horizontal padding to match other sections width
    marginBottom: SECTION_SPACING,
  },
  challengeBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  challengeDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  challengeDuration: {
    fontSize: 14,
    color: '#66D8C9',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  activitiesContainer: {
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#66D8C9',
    marginRight: 8,
    marginTop: 2,
  },
  activityText: {
    flex: 1,
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  challengeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  resuggestButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4ECDC4',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  resuggestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#66D8C9',
  },
  startButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Homepage;