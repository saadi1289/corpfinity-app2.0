import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PageContainer from '../components/PageContainer';
import ChallengeHeader from '../components/ChallengeHeader';
import ChallengeDetailsList from '../components/ChallengeDetailsList';
import useChallengeTimer from '../components/useChallengeTimer';
import ChallengeTimer from '../components/ChallengeTimer';
import ChallengeActionButtons from '../components/ChallengeActionButtons';
import { BG_GRADIENT } from '../constants/layout';

interface ChallengeRouteParams {
  title?: string;
  durationSeconds?: number; // default 10 minutes
  instructions?: string[];
  challengeData?: {
    title: string;
    description: string;
    duration: string;
    activities: string[];
    energyLevel: string;
    location: string;
    timeSelected: string;
    goal: string;
  };
}

export default function Challenges({ navigation, route }: any) {
  const params: ChallengeRouteParams = route?.params || {};
  const challengeData = params.challengeData;

  const title = challengeData?.title || params.title || 'Selected Challenge';

  const getDurationInSeconds = () => {
    if (challengeData?.duration) {
      const minutes = parseInt(challengeData.duration.split(' ')[0]);
      return minutes * 60;
    }
    return params.durationSeconds ?? 10 * 60; // 10 minutes default
  };

  const totalSeconds = getDurationInSeconds();
  const [timerState, timerControls] = useChallengeTimer(totalSeconds);
  const { secondsLeft, started, paused, completed, timeLabel } = timerState;

  const instructions = challengeData?.activities || params.instructions || [
    'Find a comfortable seated position and straighten your spine.',
    'Close your eyes and take slow, deep breaths for 2 minutes.',
    'Gently roll your shoulders and neck to release tension.',
    'Focus on a positive affirmation (e.g., "I am calm and capable").',
  ];

  return (
    <LinearGradient colors={BG_GRADIENT} style={styles.container}>
      <PageContainer showBack onPressBack={() => navigation?.goBack?.()}>
        <ChallengeHeader title={title} />

        {/* Timer at the top */}
        <ChallengeTimer
          totalSeconds={totalSeconds}
          secondsLeft={secondsLeft}
          started={started}
          paused={paused}
          completed={completed}
          timeLabel={timeLabel}
          onStart={timerControls.handleStart}
        />

        {/* Details in the middle */}
        <ChallengeDetailsList instructions={instructions} />

        {/* Buttons at the bottom */}
        <ChallengeActionButtons
          started={started}
          paused={paused}
          completed={completed}
          onPauseToggle={timerControls.handlePauseToggle}
          onComplete={timerControls.handleComplete}
        />
      </PageContainer>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});