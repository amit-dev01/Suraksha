import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Button from '../../components/common/Button';
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
      <TouchableOpacity
        key={route.id}
        style={[
          styles.routeCard,
          isSelected && [styles.routeCardSelected, { borderColor: badgeColor }],
        ]}
        onPress={() => setSelectedRouteId(route.id)}
        activeOpacity={0.8}
      >
        {isSelected && (
          <View style={[styles.selectedAccent, { backgroundColor: badgeColor }]} />
        )}
        
        <View style={styles.cardHeader}>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.routeTitle}>{route.title}</Text>
              {isSelected && (
                <View style={[styles.badge, { backgroundColor: badgeColor + '20' }]}>
                  <Text style={[styles.badgeText, { color: badgeColor }]}>{badgeText}</Text>
                </View>
              )}
            </View>
            <Text style={styles.routeSubtitle}>{route.subtitle}</Text>
          </View>
          
          <View style={styles.scoreContainer}>
            <View style={[styles.scoreBadge, { backgroundColor: badgeColor }]}>
              <MaterialCommunityIcons name="shield-check" size={16} color={colors.white} />
              <Text style={styles.scoreText}>{route.safetyScore}</Text>
            </View>
          </View>
        </View>

        {/* Progress Bar representing safety score */}
        <View style={styles.progressBarBg}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${route.safetyScore}%`, backgroundColor: badgeColor }
            ]} 
          />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{route.duration}</Text>
            <Text style={styles.infoLabel}>{route.distance}</Text>
          </View>
          
          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="police-badge-outline" size={16} color={colors.info} />
              <Text style={styles.featureText}>{route.policeStations} Stations</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color={colors.warning} />
              <Text style={styles.featureText}>{route.lighting}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
  routeCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  routeCardSelected: {
    backgroundColor: colors.white,
    borderWidth: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeTitle: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginRight: spacing.sm,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  routeSubtitle: {
    ...typography.caption,
    color: colors.textMedium,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
  },
  scoreText: {
    ...typography.small,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
    marginLeft: 4,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginBottom: spacing.md,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  infoValue: {
    ...typography.h3,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    marginRight: 4,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textMedium,
  },
  featuresRow: {
    flexDirection: 'row',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureText: {
    fontSize: 10,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
    marginLeft: 4,
  },
  actionContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.white,
  },
});
