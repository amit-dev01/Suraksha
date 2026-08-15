import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Header from '../../components/common/Header';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';

const { height } = Dimensions.get('window');
const BLR_LAT = 12.9352;
const BLR_LNG = 77.6245;

const DURATIONS = [
  { id: '15m', label: '15 min' },
  { id: '1h', label: '1 hr' },
  { id: '4h', label: '4 hr' },
  { id: 'infinite', label: 'Until stopped' },
];

const VIEWERS = [
  { id: 1, name: 'Mom', time: '10:45 AM', active: true },
  { id: 2, name: 'Dad', time: '10:50 AM', active: true },
  { id: 3, name: 'Rahul', time: '11:05 AM', active: false },
];

export default function LiveLocationScreen({ navigation }) {
  const [activeDuration, setActiveDuration] = useState('1h');
  const [activeSeconds, setActiveSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopSharing = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
          <Marker coordinate={{ latitude: BLR_LAT, longitude: BLR_LNG }}>
            <View style={styles.userMarkerContainer}>
              <View style={styles.userPulse} />
              <View style={styles.userDot}>
                <Avatar size={32} initials="PK" />
              </View>
            </View>
          </Marker>

          {/* Example viewer marker */}
          <Marker coordinate={{ latitude: 12.9452, longitude: 77.6145 }}>
            <View style={styles.viewerMarker}>
              <Avatar size={24} initials="M" />
            </View>
          </Marker>
        </MapView>
        
        <SafeAreaView style={styles.floatingHeader} pointerEvents="box-none">
          <TouchableOpacity 
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.statusHeader}>
            <View style={styles.statusTitleRow}>
              <View style={styles.liveIndicator} />
              <Text style={styles.sheetTitle}>Sharing Live Location</Text>
            </View>
            <Text style={styles.timerText}>{formatTime(activeSeconds)}</Text>
          </View>

          <Text style={styles.sectionLabel}>Share for</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.durationScroll}>
            {DURATIONS.map(dur => (
              <TouchableOpacity
                key={dur.id}
                style={[
                  styles.durationChip,
                  activeDuration === dur.id && styles.durationChipActive
                ]}
                onPress={() => setActiveDuration(dur.id)}
              >
                <Text style={[
                  styles.durationText,
                  activeDuration === dur.id && styles.durationTextActive
                ]}>
                  {dur.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.viewersHeaderRow}>
            <Text style={styles.sectionLabel}>People who can see you</Text>
            <TouchableOpacity style={styles.addMoreBtn}>
              <MaterialCommunityIcons name="plus" size={16} color={colors.primary} />
              <Text style={styles.addMoreText}>Add More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewersList}>
            {VIEWERS.map(viewer => (
              <View key={viewer.id} style={styles.viewerCard}>
                <Avatar size={40} initials={viewer.name} showOnline={viewer.active} />
                <View style={styles.viewerInfo}>
                  <Text style={styles.viewerName}>{viewer.name}</Text>
                  <Text style={styles.viewerTime}>
                    {viewer.active ? `Viewing since ${viewer.time}` : `Last seen at ${viewer.time}`}
                  </Text>
                </View>
                <TouchableOpacity style={styles.stopViewerBtn}>
                  <MaterialCommunityIcons name="close" size={20} color={colors.textMedium} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <Button
            title="Stop Sharing"
            variant="danger"
            icon="stop-circle-outline"
            onPress={handleStopSharing}
            style={styles.stopBtn}
            fullWidth
          />
          
        </ScrollView>
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
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  backBtn: {
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
  userMarkerContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPulse: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(46, 213, 115, 0.3)',
  },
  userDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.success,
  },
  viewerMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.info,
  },
  bottomSheet: {
    flex: 1,
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
    marginTop: -20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statusTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginRight: spacing.sm,
  },
  sheetTitle: {
    ...typography.h3,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
  },
  timerText: {
    ...typography.h3,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.success,
  },
  sectionLabel: {
    ...typography.small,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.textMedium,
    marginBottom: spacing.sm,
  },
  durationScroll: {
    marginBottom: spacing.xl,
    flexDirection: 'row',
  },
  durationChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  durationChipActive: {
    backgroundColor: colors.primaryLight + '20',
    borderColor: colors.primary,
  },
  durationText: {
    ...typography.body,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
  },
  durationTextActive: {
    color: colors.primary,
    fontFamily: 'Poppins_600SemiBold',
  },
  viewersHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  addMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  addMoreText: {
    ...typography.caption,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.primary,
    marginLeft: 2,
  },
  viewersList: {
    marginBottom: spacing.xl,
  },
  viewerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  viewerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  viewerName: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  viewerTime: {
    ...typography.caption,
    color: colors.textMedium,
  },
  stopViewerBtn: {
    padding: spacing.xs,
  },
  stopBtn: {
    marginTop: spacing.sm,
  },
});
