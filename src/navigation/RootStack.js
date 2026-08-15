import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Navigators
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

// Modal Screens
import RouteOptionsScreen from '../screens/route/RouteOptionsScreen';
import NavigationScreen from '../screens/route/NavigationScreen';
import SosActiveScreen from '../screens/sos/SosActiveScreen';
import SosCancelledScreen from '../screens/sos/SosCancelledScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 
        We'll handle authentication state in AppNavigator to switch 
        between AuthStack and MainTabs. But for the RootStack structure,
        it should contain MainApp and Modals.
      */}
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="MainApp" component={MainTabs} />
      
      {/* Modals presented over the tabs */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="RouteOptions" component={RouteOptionsScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="SosActive" component={SosActiveScreen} />
        <Stack.Screen name="SosCancelled" component={SosCancelledScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStack;
