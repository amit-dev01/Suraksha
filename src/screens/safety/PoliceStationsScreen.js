import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { mockPoliceStations } from '../../utils/mockData';

const { height } = Dimensions.get('window');
const BLR_LAT = 12.9352;
const BLR_LNG = 77.6245;

const FILTERS = ['All', 'Within 1km', '24/7', 'Verified'];

export default function PoliceStationsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const renderStationCard = (station) => (
    <View key={station.id} style={styles.stationCard}>
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <View style={styles.shieldIcon}>
            <MaterialCommunityIcons name="shield-star" size={24} color={colors.white} />
          </View>
          <View style={styles.titleInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.stationName}>{station.name}</Text>
              {station.verified && (
                <MaterialCommunityIcons name="check-decagram" size={16} color={colors.primary} style={styles.verifiedIcon} />
              )}
            </View>
            <Text style={styles.distance}>{station.distance}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={18} color={colors.textMedium} />
          <Text style={styles.addressText} numberOfLines={2}>{station.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="phone-outline" size={18} color={colors.textMedium} />
          <Text style={styles.phoneText}>{station.phone}</Text>
        </View>
        
        {station.isOpen24_7 && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>Open 24/7</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardActions}>
        <Button
          title="Directions"
          variant="outline"
          icon="directions"
          style={styles.actionBtn}
          fullWidth={false}
        />
        <Button
          title="Call Now"
          variant="primary"
          icon="phone"
          style={styles.actionBtn}
          fullWidth={false}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerContainer}>
        <Header 
          title="Police Stations" 
          showBack 
          rightIcon="filter-variant"
          onRightPress={() => {}}
        />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filtersScroll}
        >
          {FILTERS.map(filter => (
            <TouchableOpacity 
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: BLR_LAT,
            longitude: BLR_LNG,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={{ latitude: BLR_LAT, longitude: BLR_LNG }} title="You">
            <View style={styles.userMarker}>
              <View style={styles.userMarkerInner} />
            </View>
          </Marker>

          {mockPoliceStations.map(station => (
            <Marker 
              key={station.id}
              coordinate={{ latitude: station.latitude, longitude: station.longitude }}
              title={station.name}
            >
              <View style={styles.policeMarker}>
                <MaterialCommunityIcons name="shield-star" size={16} color={colors.white} />
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {mockPoliceStations.map(renderStationCard)}
      </ScrollView>

      {/* FAB Emergency Call */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <MaterialCommunityIcons name="phone-alert" size={28} color={colors.white} />
        <Text style={styles.fabText}>100</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    backgroundColor: colors.white,
    zIndex: 10,
  },
  filtersScroll: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.info + '15',
    borderColor: colors.info,
  },
  filterText: {
    ...typography.small,
    fontFamily: 'Poppins_500Medium',
    color: colors.textMedium,
  },
  filterTextActive: {
    color: colors.info,
    fontFamily: 'Poppins_600SemiBold',
  },
  mapContainer: {
    height: height * 0.35,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  userMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary + '50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  userMarkerInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  policeMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.info,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: 100, // Space for FAB
  },
  stationCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.info,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationName: {
    ...typography.h3,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    flex: 1,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  distance: {
    ...typography.caption,
    color: colors.info,
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 2,
  },
  cardBody: {
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  addressText: {
    ...typography.body,
    color: colors.textMedium,
    marginLeft: spacing.sm,
    flex: 1,
  },
  phoneText: {
    ...typography.body,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
    marginLeft: spacing.sm,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.successLight + '30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginTop: spacing.xs,
  },
  tagText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.success,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  fabText: {
    ...typography.h3,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
    marginLeft: spacing.sm,
  },
});
