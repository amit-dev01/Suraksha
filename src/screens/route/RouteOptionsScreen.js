import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Button from '../../components/common/Button';
import RouteCard from '../../components/common/RouteCard';
import { mockRoutes } from '../../utils/mockData';

const { height } = Dimensions.get('window');

// Mock coordinates for polylines
const BLR_LAT = 12.9352;
const BLR_LNG = 77.6245;
const DEST_LAT = 12.9716;
const DEST_LNG = 77.5946;

const SAFE_ROUTE_COORDS = [
  { latitude: BLR_LAT, longitude: BLR_LNG },
  { latitude: 12.9452, longitude: 77.6145 },
  { latitude: 12.9552, longitude: 77.6045 },
  { latitude: DEST_LAT, longitude: DEST_LNG },
];

const MODERATE_ROUTE_COORDS = [
  { latitude: BLR_LAT, longitude: BLR_LNG },
  { latitude: 12.9452, longitude: 77.6345 },
  { latitude: 12.9652, longitude: 77.6145 },
  { latitude: DEST_LAT, longitude: DEST_LNG },
];

const AVOID_ROUTE_COORDS = [
  { latitude: BLR_LAT, longitude: BLR_LNG },
  { latitude: 12.9252, longitude: 77.6045 },
  { latitude: 12.9552, longitude: 77.5845 },
  { latitude: DEST_LAT, longitude: DEST_LNG },
];

export default function RouteOptionsScreen({ navigation }) {
  const [selectedRouteId, setSelectedRouteId] = useState(mockRoutes[0].id);

  const handleStartNavigation = () => {
    navigation.navigate('Navigation');
  };

  const renderRouteCard = (route) => {
    const isSelected = selectedRouteId === route.id;
    let badgeColor, badgeText;

    switch (route.type) {
      case 'safest':
        badgeColor = colors.success;
        badgeText = 'Recommended';
        break;
      case 'moderate':
        badgeColor = colors.warning;
        badgeText = 'Moderate Risk';
        break;
      case 'avoid':
        badgeColor = colors.danger;
        badgeText = 'Not Recommended';
        break;
      default:
        badgeColor = colors.primary;
        badgeText = 'Unknown';
    }

    return (
      <RouteCard
        key={route.id}
        route={route}
        isSelected={isSelected}
        onPress={() => setSelectedRouteId(route.id)}
        badgeColor={badgeColor}
        badgeText={badgeText}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Top 55% Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: (BLR_LAT + DEST_LAT) / 2,
            longitude: (BLR_LNG + DEST_LNG) / 2,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
        >
          {/* Routes */}
          <Polyline 
            coordinates={AVOID_ROUTE_COORDS} 
            strokeColor={colors.danger} 
            strokeWidth={4} 
            lineDashPattern={selectedRouteId === 'route_c' ? [] : [10, 10]}
            zIndex={selectedRouteId === 'route_c' ? 3 : 1}
          />
          <Polyline 
            coordinates={MODERATE_ROUTE_COORDS} 
            strokeColor={colors.warning} 
            strokeWidth={5} 
            lineDashPattern={selectedRouteId === 'route_b' ? [] : [10, 10]}
            zIndex={selectedRouteId === 'route_b' ? 3 : 1}
          />
          <Polyline 
            coordinates={SAFE_ROUTE_COORDS} 
            strokeColor={colors.success} 
            strokeWidth={6} 
            lineDashPattern={selectedRouteId === 'route_a' ? [] : [10, 10]}
            zIndex={selectedRouteId === 'route_a' ? 3 : 1}
          />

          {/* Markers */}
          <Marker coordinate={{ latitude: BLR_LAT, longitude: BLR_LNG }}>
            <View style={[styles.markerPin, { backgroundColor: colors.success }]}>
              <View style={styles.markerInner} />
            </View>
          </Marker>
          
          <Marker coordinate={{ latitude: DEST_LAT, longitude: DEST_LNG }}>
            <View style={[styles.markerPin, { backgroundColor: colors.danger }]}>
              <MaterialCommunityIcons name="map-marker" size={24} color={colors.danger} />
            </View>
          </Marker>
        </MapView>

        {/* Floating UI on Map */}
        <SafeAreaView style={styles.floatingUI} pointerEvents="box-none">
          <View style={styles.topBar}>
            <TouchableOpacity 
              style={styles.circleBtn}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
            </TouchableOpacity>

            <View style={styles.summaryPill}>
              <Text style={styles.summaryText}>Koramangala to Cubbon Park</Text>
            </View>

            <View style={styles.rightButtons}>
              <TouchableOpacity style={styles.circleBtn}>
                <MaterialCommunityIcons name="layers-outline" size={24} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.circleBtn, { marginTop: spacing.sm }]}>
                <MaterialCommunityIcons name="crosshairs-gps" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* Bottom Sheet (45% height) */}
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        
        <Text style={styles.sheetTitle}>Choose Route</Text>
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {mockRoutes.map(renderRouteCard)}
        </ScrollView>
        
        <View style={styles.actionContainer}>
          <Button
            title="Start Safe Navigation"
            variant="success"
            icon="navigation"
            onPress={handleStartNavigation}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapContainer: {
    height: height * 0.55,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerPin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  markerInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  floatingUI: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  summaryPill: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  summaryText: {
    ...typography.small,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  rightButtons: {
    alignItems: 'center',
  },
  bottomSheet: {
    height: height * 0.45,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    marginTop: -20, // Overlap the map
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  sheetTitle: {
    ...typography.h3,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  actionContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.white,
  },
});
