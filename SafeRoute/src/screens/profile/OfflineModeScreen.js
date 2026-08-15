import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Header from '../../components/common/Header';

const OFFLINE_MAPS = [
  { id: '1', name: 'Bangalore South', size: '45 MB', downloaded: true },
  { id: '2', name: 'Bangalore Central', size: '32 MB', downloaded: true },
  { id: '3', name: 'Bangalore North', size: '58 MB', downloaded: false },
  { id: '4', name: 'Bangalore East', size: '41 MB', downloaded: false },
];

export default function OfflineModeScreen({ navigation }) {
  const [isOfflineModeEnabled, setIsOfflineModeEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header 
          title="Offline Mode" 
          showBack 
        />
        <View style={styles.toggleContainer}>
          <Switch
            trackColor={{ false: colors.border, true: colors.primaryLight }}
            thumbColor={isOfflineModeEnabled ? colors.primary : colors.white}
            onValueChange={setIsOfflineModeEnabled}
            value={isOfflineModeEnabled}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Illustration & Info */}
        <View style={styles.heroSection}>
          <View style={styles.illustrationCircle}>
            <MaterialCommunityIcons name="satellite-uplink" size={64} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>SMS Fallback Active</Text>
          <Text style={styles.heroSubtitle}>
            When you have no internet connection, Safe Route will automatically send encrypted SMS messages to trigger SOS alerts and share your location.
          </Text>
        </View>

        {/* Sync Status */}
        <View style={styles.syncCard}>
          <View style={styles.syncLeft}>
            <MaterialCommunityIcons name="cloud-check" size={28} color={colors.success} />
            <View style={styles.syncInfo}>
              <Text style={styles.syncTitle}>Emergency Data Synced</Text>
              <Text style={styles.syncTime}>Last synced: Today, 09:41 AM</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.syncBtn}>
            <MaterialCommunityIcons name="sync" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Offline Maps Section */}
        <Text style={styles.sectionTitle}>Offline Maps</Text>
        <Text style={styles.sectionSubtitle}>Download maps to navigate without internet</Text>

        <View style={styles.mapsContainer}>
          {OFFLINE_MAPS.map((map, index) => (
            <View 
              key={map.id} 
              style={[
                styles.mapItem,
                index === OFFLINE_MAPS.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <View style={styles.mapIconContainer}>
                <MaterialCommunityIcons 
                  name={map.downloaded ? "map-check" : "map-outline"} 
                  size={24} 
                  color={map.downloaded ? colors.success : colors.textMedium} 
                />
              </View>
              <View style={styles.mapInfo}>
                <Text style={styles.mapName}>{map.name}</Text>
                <Text style={styles.mapSize}>{map.size}</Text>
              </View>
              <TouchableOpacity style={styles.downloadBtn}>
                <MaterialCommunityIcons 
                  name={map.downloaded ? "trash-can-outline" : "download-outline"} 
                  size={24} 
                  color={map.downloaded ? colors.danger : colors.primary} 
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrapper: {
    position: 'relative',
    zIndex: 10,
  },
  toggleContainer: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md + 4,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  illustrationCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primaryLight + '50',
  },
  heroTitle: {
    ...typography.h2,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.textMedium,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  syncCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xxl,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  syncLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncInfo: {
    marginLeft: spacing.md,
  },
  syncTitle: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  syncTime: {
    ...typography.caption,
    color: colors.textMedium,
  },
  syncBtn: {
    padding: spacing.xs,
  },
  sectionTitle: {
    ...typography.h3,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.textMedium,
    marginBottom: spacing.md,
  },
  mapsContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  mapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mapIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  mapInfo: {
    flex: 1,
  },
  mapName: {
    ...typography.body,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
  },
  mapSize: {
    ...typography.caption,
    color: colors.textLight,
  },
  downloadBtn: {
    padding: spacing.xs,
  },
});
