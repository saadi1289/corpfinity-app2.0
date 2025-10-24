import React from 'react';
import { Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Homepage from '../screens/Homepage';
import Challenges from '../screens/Challenges';
import Insights from '../screens/Insights';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#4ECDC4',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            position: 'absolute',
            height: 64,
            borderTopWidth: 0,
            elevation: 8,
            zIndex: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            backgroundColor: '#ffffff',
            marginHorizontal: 16,
            marginBottom: 24,
            borderRadius: 20,
            paddingBottom: Platform.OS === 'android' ? 8 : 12,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 0,
            marginBottom: 6,
          },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Challenges':
                iconName = focused ? 'flag' : 'flag-outline';
                break;
              case 'Insights':
                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'ellipse';
            }
            return <Ionicons name={iconName} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Homepage} />
        <Tab.Screen name="Challenges" component={Challenges} />
        <Tab.Screen name="Insights" component={Insights} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}