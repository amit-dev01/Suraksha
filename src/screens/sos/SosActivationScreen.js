import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius } from '../../theme';

const { width } = Dimensions.get('window');

export default function SosActivationScreen({ navigation }) {
  const [isHolding, setIsHolding] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  // Animation values
  const ring1Scale = useSharedValue(1);
  const ring2Scale = useSharedValue(1);
  const ring3Scale = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    // Continuous pulse animation for rings
    const config = { duration: 2000, easing: Easing.out(Easing.ease) };
    
    ring1Scale.value = withRepeat(withTiming(1.5, config), -1, false);
    
    setTimeout(() => {
      ring2Scale.value = withRepeat(withTiming(1.5, config), -1, false);
    }, 600);
    
    setTimeout(() => {
      ring3Scale.value = withRepeat(withTiming(1.5, config), -1, false);
    }, 1200);
  }, []);

  useEffect(() => {
    let timer;
    if (isHolding && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleActivation();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isHolding) {
      setCountdown(3);
    }
    
    return () => clearInterval(timer);
  }, [isHolding, countdown]);

  const handleActivation = () => {
    setIsHolding(false);
    navigation.replace('RootStack', { screen: 'MainApp', params: { screen: 'SosActive' } });
    // Note: in a real app, you'd navigate to the modal stack
    navigation.navigate('SosActive');
  };

  const handlePressIn = () => {
    setIsHolding(true);
    buttonScale.value = withTiming(0.9, { duration: 150 });
  };

  const handlePressOut = () => {
    setIsHolding(false);
    buttonScale.value = withTiming(1, { duration: 150 });
  };

  // Animated styles
  const createRingStyle = (scale) => useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: 1 - ((scale.value - 1) * 2), // Fade out as it expands
    };
  });

  const animatedButton = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.danger, colors.dangerDark]}
        style={StyleSheet.absoluteFill}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="close" size={24} color={colors.danger} />
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.buttonWrapper}>
            {/* Pulse Rings */}
            {!isHolding && (
              <>
                <Animated.View style={[styles.pulseRing, createRingStyle(ring1Scale)]} />
                <Animated.View style={[styles.pulseRing, createRingStyle(ring2Scale)]} />
                <Animated.View style={[styles.pulseRing, createRingStyle(ring3Scale)]} />
              </>
            )}

            {/* Main SOS Button */}
            <TouchableOpacity
              activeOpacity={1}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Animated.View style={[styles.sosButton, animatedButton]}>
                {isHolding ? (
                  <Text style={styles.countdownText}>{countdown}</Text>
                ) : (
                  <>
                    <MaterialCommunityIcons name="alert" size={64} color={colors.danger} />
                    <Text style={styles.sosText}>SOS</Text>
                  </>
                )}
              </Animated.View>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.instructionText}>
            {isHolding ? 'Keep holding to activate...' : 'Press and hold for 3 seconds'}
          </Text>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.actionsGrid}>
            <View style={styles.actionItem}>
              <MaterialCommunityIcons name="account-multiple" size={24} color={colors.white} />
              <Text style={styles.actionText}>Alert{'\n'}Contacts</Text>
            </View>
            <View style={styles.actionItem}>
              <MaterialCommunityIcons name="map-marker" size={24} color={colors.white} />
              <Text style={styles.actionText}>Share{'\n'}Location</Text>
            </View>
            <View style={styles.actionItem}>
              <MaterialCommunityIcons name="microphone" size={24} color={colors.white} />
              <Text style={styles.actionText}>Record{'\n'}Evidence</Text>
            </View>
            <View style={styles.actionItem}>
              <MaterialCommunityIcons name="shield-account" size={24} color={colors.white} />
              <Text style={styles.actionText}>Notify{'\n'}Police</Text>
            </View>
          </View>
          
          <View style={styles.secondaryButtons}>
            <TouchableOpacity style={styles.secondaryBtn}>
              <MaterialCommunityIcons name="phone-incoming" size={20} color={colors.white} />
              <Text style={styles.secondaryBtnText}>Fake Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryBtn}>
              <MaterialCommunityIcons name="bullhorn" size={20} color={colors.white} />
              <Text style={styles.secondaryBtnText}>Loud Siren</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    backgroundColor: 'transparent',
  },
  sosButton: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  sosText: {
    ...typography.h1,
    fontFamily: 'Poppins_700Bold',
    color: colors.danger,
    marginTop: spacing.xs,
  },
  countdownText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 96,
    color: colors.danger,
  },
  instructionText: {
    ...typography.h3,
    color: colors.white,
    marginTop: spacing.xl,
    fontFamily: 'Poppins_500Medium',
  },
  bottomSection: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionItem: {
    alignItems: 'center',
    width: (width - spacing.lg * 2) / 4,
  },
  actionText: {
    ...typography.caption,
    color: colors.white,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  secondaryBtnText: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.white,
    marginLeft: spacing.sm,
  },
});
