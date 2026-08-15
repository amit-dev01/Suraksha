import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

// Mock coordinates for navigation
const BLR_LAT = 12.9352;
const BLR_LNG = 77.6245;
const DEST_LAT = 12.9716;
const DEST_LNG = 77.5946;

const ROUTE_COORDS = [
  { latitude: BLR_LAT, longitude: BLR_LNG },
  { latitude: 12.9452, longitude: 77.6145 },
  { latitude: 12.9552, longitude: 77.6045 },
  { latitude: DEST_LAT, longitude: DEST_LNG },
];

export default function NavigationScreen({ navigation }) {
  const pulseValue = useSharedValue(1);

  useEffect(() => {
    pulseValue.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedPulse = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseValue.value }],
      opacity: 1.5 - pulseValue.value, // Fade out as it expands
    };
  });

  const handleEndTrip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'RootStack', params: { screen: 'MainApp' } }],
    });
  };

  const handleSOS = () => {
    navigation.navigate('SosActivation');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: BLR_LAT,
          longitude: BLR_LNG,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Polyline 
          coordinates={ROUTE_COORDS} 
          strokeColor={colors.primary} 
          strokeWidth={6} 
        />
        
        {/* Destination Marker */}
        <Marker coordinate={{ latitude: DEST_LAT, longitude: DEST_LNG }}>
          <View style={styles.destMarker}>
            <MaterialCommunityIcons name="flag-checkered" size={20} color={colors.white} />
          </View>
        </Marker>

        {/* User Location Marker */}
        <Marker coordinate={{ latitude: BLR_LAT, longitude: BLR_LNG }} anchor={{x: 0.5, y: 0.5}}>
          <View style={styles.userMarkerContainer}>
            <Animated.View style={[styles.userPulse, animatedPulse]} />
            <View style={styles.userDot}>
              <View style={styles.userDotInner} />
            </View>
          </View>
        </Marker>
      </MapView>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        
        {/* Top Instruction Card */}
        <View style={styles.topCard}>
          <View style={styles.turnIconContainer}>
            <MaterialCommunityIcons name="arrow-u-right-top" size={32} color={colors.white} />
          </View>
          <View style={styles.instructionTextContainer}>
            <Text style={styles.distanceText}>In 200 meters</Text>
            <Text style={styles.instructionText}>Turn right onto 100ft Road</Text>
          </View>
        </View>

        {/* Floating Controls */}
        <View style={styles.controlsContainer} pointerEvents="box-none">
          {/* Left SOS Button */}
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <MaterialCommunityIcons name="alert" size={28} color={colors.white} />
            <Text style={styles.sosButtonText}>SOS</Text>
          </TouchableOpacity>

          {/* Right Action Buttons */}
          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialCommunityIcons name="volume-high" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialCommunityIcons name="share-variant" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialCommunityIcons name="crosshairs-gps" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Status Card */}
        <View style={styles.bottomCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12<Text style={styles.statUnit}> min</Text></Text>
              <Text style={styles.statLabel}>2.4 km remaining</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <View style={styles.safetyScoreBadge}>
                <MaterialCommunityIcons name="shield-check" size={16} color={colors.white} />
                <Text style={styles.safetyScoreText}>96 Safe</Text>
              </View>
              <View style={styles.watchersContainer}>
                <MaterialCommunityIcons name="eye" size={14} color={colors.textMedium} />
                <Text style={styles.watchersText}>Mom & 1 other watching</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonsRow}>
            <Button
              title="End Trip"
              variant="outline"
              onPress={handleEndTrip}
              style={styles.endTripBtn}
              fullWidth={false}
            />
            <Button
              title="Emergency Help"
              variant="danger"
              icon="phone"
              onPress={handleSOS}
              style={styles.emergencyBtn}
              fullWidth={false}
            />
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  destMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  userMarkerContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPulse: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(55, 66, 250, 0.3)',
  },
  userDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  userDotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.info,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topCard: {
    backgroundColor: '#1A1A2E',
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  turnIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  instructionTextContainer: {
    flex: 1,
  },
  distanceText: {
    ...typography.h3,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
  },
  instructionText: {
    ...typography.body,
    color: colors.textLight,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  sosButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 3,
    borderColor: colors.white,
  },
  sosButtonText: {
    ...typography.caption,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
    marginTop: -2,
  },
  rightActions: {
    alignItems: 'flex-end',
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statItem: {
    flex: 1,
  },
  statValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: colors.success,
  },
  statUnit: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.textMedium,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMedium,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  safetyScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  safetyScoreText: {
    ...typography.small,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
    marginLeft: 4,
  },
  watchersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchersText: {
    ...typography.caption,
    color: colors.textMedium,
    marginLeft: 4,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endTripBtn: {
    flex: 1,
    marginRight: spacing.sm,
  },
  emergencyBtn: {
    flex: 1.5,
    marginLeft: spacing.sm,
  },
});
