import { useEffect, useMemo, useState } from 'react';

export interface ChallengeTimerState {
  secondsLeft: number;
  started: boolean;
  paused: boolean;
  completed: boolean;
  timeLabel: string;
}

export interface ChallengeTimerControls {
  handleStart: () => void;
  handlePauseToggle: () => void;
  handleComplete: () => void;
  setSecondsLeft: (value: number) => void;
}

export default function useChallengeTimer(totalSeconds: number): [ChallengeTimerState, ChallengeTimerControls] {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const completed = secondsLeft <= 0;

  // Tick every second while started and not paused
  useEffect(() => {
    const interval = setInterval(() => {
      if (!started || paused || completed) return;
      setSecondsLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [started, paused, completed]);

  // Reset started/paused when complete
  useEffect(() => {
    if (completed) {
      setStarted(false);
      setPaused(false);
    }
  }, [completed]);

  const timeLabel = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }, [secondsLeft]);

  const handlePauseToggle = () => setPaused(p => !p);
  const handleComplete = () => {
    setSecondsLeft(0);
    setStarted(false);
    setPaused(false);
  };
  const handleStart = () => {
    if (!started && secondsLeft <= 0) {
      setSecondsLeft(totalSeconds);
    }
    setStarted(true);
    setPaused(false);
  };

  return [
    { secondsLeft, started, paused, completed, timeLabel },
    { handleStart, handlePauseToggle, handleComplete, setSecondsLeft },
  ];
}