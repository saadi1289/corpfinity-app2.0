import React, { useEffect } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { Asset } from 'expo-asset';

// Single source of truth for the company logo throughout the app
// Ensures consistent sizing/positioning and proper resolution scaling
// Also preloads and caches the logo asset for fast rendering
const logoModule = require('../../assets/icon.png');
let logoPrefetched = false;

export interface LogoProps {
  size?: number; // logical dp size (scaled for device density automatically)
  style?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = 120,
  style,
  accessibilityLabel = 'Corpfinity logo',
}) => {
  useEffect(() => {
    // Preload and cache the logo once (safe to call multiple times)
    if (!logoPrefetched) {
      logoPrefetched = true;
      Asset.fromModule(logoModule).downloadAsync().catch(() => {
        // swallow prefetch errors, rendering will still work via bundler
      });
    }
  }, []);

  return (
    <Image
      source={logoModule}
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          width: size,
          height: size,
          resizeMode: 'contain',
        },
        style as any,
      ]}
    />
  );
};

export default Logo;