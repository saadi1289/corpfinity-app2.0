import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H_PADDING, MAX_CONTENT_WIDTH } from '../constants/layout';

interface PageContainerProps {
  children: React.ReactNode;
  showBack?: boolean;
  onPressBack?: () => void;
  notificationCount?: number;
  onPressNotification?: () => void;
}

export default function PageContainer({
  children,
  showBack = false,
  onPressBack,
  notificationCount = 0,
  onPressNotification,
}: PageContainerProps) {
  return (
    <SafeAreaView style={styles.safe} edges={['top','bottom']}>
      {/* Header removed as requested */}
      <View style={styles.content}>
        <View style={styles.inner}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    flex: 1,
    // Remove extra top padding previously used to offset the header
    paddingTop: 8,
  },
  inner: {
    flex: 1,
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: H_PADDING,
  },
});