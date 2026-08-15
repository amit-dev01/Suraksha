import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { mockContacts } from '../../utils/mockData';

export default function SosActiveScreen({ navigation }) {
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [cancelPressTimer, setCancelPressTimer] = useState(null);
  const [isPressingCancel, setIsPressingCancel] = useState(false);

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

  const handleCancelPressIn = () => {
    setIsPressingCancel(true);
    const timer = setTimeout(() => {
      navigation.replace('SosCancelled');
    }, 2000); // Require 2 seconds long press
    setCancelPressTimer(timer);
  };

  const handleCancelPressOut = () => {
    setIsPressingCancel(false);
    if (cancelPressTimer) {
      clearTimeout(cancelPressTimer);
      setCancelPressTimer(null);
    }
  };

  const renderContactStatus = (contact) => {
    let borderColor, icon, statusText;

    switch (contact.status) {
      case 'viewing':
        borderColor = colors.success;
        icon = 'eye';
        statusText = 'Viewing your location';
        break;
      case 'delivered':
        borderColor = colors.success;
        icon = 'check-all';
        statusText = 'Delivered';
        break;
      case 'sent':
        borderColor = colors.info;
        icon = 'check';
        statusText = 'Sent';
        break;
      case 'pending':
        borderColor = colors.warning;
        icon = 'clock-outline';
        statusText = 'Pending delivery';
        break;
      default:
        borderColor = colors.border;
        icon = 'dots-horizontal';
        statusText = 'Unknown';
    }

    return (
      <View key={contact.id} style={[styles.contactCard, { borderColor }]}>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactRelation}>{contact.relationship}</Text>
        </View>
        <View style={styles.statusInfo}>
          <MaterialCommunityIcons name={icon} size={16} color={borderColor} />
          <Text style={[styles.statusText, { color: borderColor }]}>{statusText}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Banner */}
      <View style={styles.banner}>
        <MaterialCommunityIcons name="alert-circle" size={24} color={colors.white} />
        <Text style={styles.bannerText}>EMERGENCY ACTIVE</Text>
        <Text style={styles.timerText}>{formatTime(activeSeconds)}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 12.9352,
              longitude: 77.6245,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              coordinate={{ latitude: 12.9352, longitude: 77.6245 }}
              title="Your Location"
            >
              <View style={styles.markerContainer}>
                <View style={styles.markerPulse} />
                <View style={styles.markerCenter} />
              </View>
            </Marker>
          </MapView>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {/* Recording Indicator */}
        <View style={styles.recordingCard}>
          <View style={styles.recordingInfo}>
            <MaterialCommunityIcons name="microphone" size={24} color={colors.danger} />
            <View style={styles.recordingTextContainer}>
              <Text style={styles.recordingTitle}>Recording Evidence</Text>
              <Text style={styles.recordingSubtitle}>Audio & Video being uploaded securely</Text>
            </View>
          </View>
          <View style={styles.recordingTimer}>
            <View style={[styles.liveDot, { backgroundColor: colors.danger }]} />
            <Text style={styles.recordingTimeText}>{formatTime(activeSeconds)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Contact Status</Text>

        {/* Police Status */}
        <View style={[styles.contactCard, { borderColor: colors.info }]}>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>Police Control Room</Text>
            <Text style={styles.contactRelation}>Nearest Station</Text>
          </View>
          <View style={styles.statusInfo}>
            <MaterialCommunityIcons name="radio-tower" size={16} color={colors.info} />
            <Text style={[styles.statusText, { color: colors.info }]}>Notified • Dispatching help</Text>
          </View>
        </View>

        {/* Family/Friends Status */}
        {mockContacts.slice(0, 3).map(renderContactStatus)}

      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.callPoliceBtn}>
          <MaterialCommunityIcons name="phone" size={24} color={colors.info} />
          <Text style={styles.callPoliceText}>Call Police (100)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.cancelBtn, isPressingCancel && styles.cancelBtnActive]}
          onPressIn={handleCancelPressIn}
          onPressOut={handleCancelPressOut}
          activeOpacity={0.9}
        >
          <Text style={styles.cancelBtnText}>
            {isPressingCancel ? "HOLD TO CANCEL..." : "I'M SAFE - CANCEL SOS"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.longPressHint}>Long press to cancel</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  banner: {
    backgroundColor: colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  bannerText: {
    ...typography.h3,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
    marginLeft: spacing.sm,
    flex: 1,
  },
  timerText: {
    ...typography.h3,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.white,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl * 2,
  },
  mapContainer: {
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 71, 87, 0.3)',
  },
  markerCenter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: colors.white,
  },
  liveBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: spacing.xs,
  },
  liveText: {
    ...typography.caption,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
  },
  recordingCard: {
    backgroundColor: '#2D2D44',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  recordingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recordingTextContainer: {
    marginLeft: spacing.md,
  },
  recordingTitle: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.white,
  },
  recordingSubtitle: {
    ...typography.caption,
    color: colors.textLight,
  },
  recordingTimer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingTimeText: {
    ...typography.small,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.danger,
  },
  sectionTitle: {
    ...typography.h3,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.white,
    marginBottom: spacing.md,
  },
  contactCard: {
    backgroundColor: '#2D2D44',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.white,
  },
  contactRelation: {
    ...typography.caption,
    color: colors.textLight,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    ...typography.caption,
    fontFamily: 'Poppins_500Medium',
    marginLeft: 4,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: '#1A1A2E',
    borderTopWidth: 1,
    borderTopColor: '#2D2D44',
  },
  callPoliceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.info,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  callPoliceText: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.info,
    marginLeft: spacing.sm,
  },
  cancelBtn: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  cancelBtnActive: {
    backgroundColor: colors.successLight,
  },
  cancelBtnText: {
    ...typography.h3,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
  },
  longPressHint: {
    ...typography.caption,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
