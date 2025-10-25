import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContainer from '../components/PageContainer';
import SettingsRow from '../components/profile/SettingsRow';
import ProfileHeader from '../components/profile/ProfileHeader';
import { BG_GRADIENT } from '../constants/layout';

const MINT = '#66D8C9';
const MINT_DEEP = '#4ECDC4';
const MUTED = '#6B6B6B';
const TEXT_DARK = '#1F2937';

 const DIVIDER = '#E5E7EB';
 const RED = '#EF4444';

 export default function Profile() {
   const [hoveredRow, setHoveredRow] = useState<string | null>(null);
   const [isDarkTheme, setIsDarkTheme] = useState(false);

   const handleHover = (id: string, hovering: boolean) => {
     setHoveredRow(hovering ? id : null);
   };

   const onToggleTheme = (value: boolean) => {
     setIsDarkTheme(value);
     // TODO: Integrate with app-wide theme when available.
   };

   return (
    <LinearGradient colors={BG_GRADIENT} style={styles.container}>
       <PageContainer>
         <View style={styles.content}>
           {/* Header / Avatar */}
           <ProfileHeader initials="AJ" name="Alex Johnson" role="Employee" />

           {/* Settings Card */}
           <View style={styles.card}>
             <SettingsRow id="edit" icon="create-outline" label="Edit Profile" onPress={() => {}} />
             <View style={styles.divider} />

             <SettingsRow
               id="notifications"
               icon="notifications-outline"
               label="Notification Preferences"
               onPress={() => {}}
             />
             <View style={styles.divider} />

             <SettingsRow
               id="theme"
               icon="color-palette-outline"
               label="App Theme"
               rightElement={
                 <View style={styles.toggleContainer}>
                   <Text style={[styles.toggleLabel, isDarkTheme ? styles.toggleLabelActive : null]}>
                     {isDarkTheme ? 'Dark' : 'Light'}
                   </Text>
                   <Switch
                     value={isDarkTheme}
                     onValueChange={onToggleTheme}
                     trackColor={{ false: '#D1FAE5', true: MINT }}
                     thumbColor="#FFFFFF"
                   />
                 </View>
               }
             />
             <View style={styles.divider} />

             <SettingsRow id="privacy" icon="lock-closed-outline" label="Privacy & Security" onPress={() => {}} />
             <View style={styles.divider} />

             <SettingsRow id="help" icon="help-circle-outline" label="Help & Feedback" onPress={() => {}} />
             <View style={styles.divider} />

             <SettingsRow id="logout" icon="log-out-outline" label="Log Out" variant="destructive" onPress={() => {}} />
           </View>
         </View>
       </PageContainer>
     </LinearGradient>
   );
 }

const AVATAR_SIZE = 100;

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 28,
    gap: 6,
  },
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
  avatarInitials: {
    fontSize: 30,
    fontWeight: '700',
    color: MINT_DEEP,
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_DARK,
    textAlign: 'center',
  },
  role: {
    fontSize: 14,
    color: MUTED,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 640,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  row: {
    minHeight: 64,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  rowHover: {
    backgroundColor: '#F7FAFC',
    transform: [{ translateX: 2 }],
  },
  rowPressed: {
    opacity: 0.96,
    transform: [{ translateX: 1 }],
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowText: {
    fontSize: 16,
    color: MUTED,
    letterSpacing: 0.2,
  },
  rowTextDestructive: {
    color: RED,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginLeft: 16,
    marginRight: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 4,
  },
  toggleLabel: {
    fontSize: 13,
    color: MUTED,
  },
  toggleLabelActive: {
    color: MINT_DEEP,
    fontWeight: '600',
  },
});