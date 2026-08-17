import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

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
  const { user } = useAuth();
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
