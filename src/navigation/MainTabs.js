import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../theme';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import RouteSearchScreen from '../screens/route/RouteSearchScreen';
import SosActivationScreen from '../screens/sos/SosActivationScreen';
import ContactsScreen from '../screens/contacts/ContactsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const SosCustomButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.sosButtonContainer}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <LinearGradient
      colors={[colors.danger, colors.dangerDark]}
      style={styles.sosButton}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="home-variant" color={color} size={28} />
              {color === colors.primary && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="MapTab" 
        component={RouteSearchScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="map-marker-path" color={color} size={28} />
              {color === colors.primary && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="SOSTab" 
        component={SosActivationScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="alert" color={colors.white} size={32} />
          ),
          tabBarButton: (props) => (
            <SosCustomButton {...props} />
          )
        }}
      />
      <Tab.Screen 
        name="ContactsTab" 
        component={ContactsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="account-group" color={color} size={28} />
              {color === colors.primary && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="account" color={color} size={28} />
              {color === colors.primary && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 70,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderTopWidth: 0,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: -8,
  },
  sosButtonContainer: {
    top: -24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  sosButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.white,
  },
});

export default MainTabs;
