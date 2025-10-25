import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import BottomTabs from './src/navigation/BottomTabs';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [assetsReady, setAssetsReady] = useState(false);
  const [welcomeMinElapsed, setWelcomeMinElapsed] = useState(false);

  useEffect(() => {
    // Preload/caching critical animation assets (logo)
    const preload = async () => {
      try {
        await Asset.fromModule(require('./assets/icon.png')).downloadAsync();
      } catch (e) {
        // Ignore caching errors; asset will still be available via bundler
      } finally {
        setAssetsReady(true);
      }
    };
    preload();
  }, []);

  const readyToProceed = assetsReady && welcomeMinElapsed;

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {!readyToProceed ? (
        <WelcomeScreen onFinish={() => setWelcomeMinElapsed(true)} />
      ) : (
        <BottomTabs />
      )}
    </SafeAreaProvider>
  );
}
