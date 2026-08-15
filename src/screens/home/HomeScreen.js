import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
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
} from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import QuickActionCard from '../../components/common/QuickActionCard';
import { mockUser, mockRecentJourneys } from '../../utils/mockData';

export default function HomeScreen({ navigation }) {
  const pulseValue = useSharedValue(1);

  React.useEffect(() => {
    pulseValue.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedPulse = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseValue.value }],
      opacity: 2 - pulseValue.value,
    };
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.userInfo}>
              <Avatar size={48} initials="PK" showOnline={true} />
              <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Good Morning 👋</Text>
                <Text style={styles.userName}>{mockUser.name}</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <Badge text="Safe" variant="success" size="small" style={{ marginRight: spacing.sm }} />
              <TouchableOpacity style={styles.notificationBtn} onPress={() => navigation.navigate('Notifications')}>
                <MaterialCommunityIcons name="bell-outline" size={24} color={colors.text} />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>3</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={16} color={colors.primary} />
            <Text style={styles.locationText} numberOfLines={1}>{mockUser.location}</Text>
            <TouchableOpacity>
              <Text style={styles.changeLocationText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          style={styles.searchContainer}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('MapTab')}
        >
          <MaterialCommunityIcons name="magnify" size={24} color={colors.textMedium} style={styles.searchIcon} />
          <Text style={styles.searchText}>Where do you want to go safely?</Text>
          <MaterialCommunityIcons name="microphone" size={24} color={colors.primary} />
        </TouchableOpacity>

        {/* SOS Emergency Card */}
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('SOSTab')}
        >
          <LinearGradient
            colors={[colors.dangerLight || '#FF6B81', colors.danger]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sosCard}
          >
            <View style={styles.sosCardHeader}>
              <View>
                <Text style={styles.sosTitle}>Emergency SOS</Text>
                <Text style={styles.sosSubtitle}>Tap the button in case of emergency</Text>
              </View>
              <View style={styles.pulseContainer}>
                <Animated.View style={[styles.pulseRing, animatedPulse]} />
                <MaterialCommunityIcons name="radio-tower" size={24} color={colors.white} />
              </View>
            </View>

            <View style={styles.sosCardBody}>
              <View style={styles.sosButtonContainer}>
                <View style={styles.sosButton}>
                  <MaterialCommunityIcons name="alert" size={32} color={colors.danger} />
                </View>
              </View>
              
              <View style={styles.sosChecklist}>
                <View style={styles.checkItem}>
                  <MaterialCommunityIcons name="check-circle" size={16} color={colors.white} />
                  <Text style={styles.checkText}>Alerts contacts</Text>
                </View>
                <View style={styles.checkItem}>
                  <MaterialCommunityIcons name="check-circle" size={16} color={colors.white} />
                  <Text style={styles.checkText}>Shares location</Text>
                </View>
                <View style={styles.checkItem}>
                  <MaterialCommunityIcons name="check-circle" size={16} color={colors.white} />
                  <Text style={styles.checkText}>Notifies police</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <QuickActionCard
              title="Safe Route"
              subtitle="Find safest path"
              icon="map-marker-path"
              gradientColors={['#9b59b6', '#8e44ad']}
              onPress={() => navigation.navigate('MapTab')}
            />
            <QuickActionCard
              title="Live Location"
              subtitle="Share real-time"
              icon="cellphone-marker"
              gradientColors={['#2ecc71', '#27ae60']}
            />
          </View>

          <View style={styles.gridRow}>
            <QuickActionCard
              title="Trusted Group"
              subtitle="Manage contacts"
              icon="account-group"
              gradientColors={['#f39c12', '#e67e22']}
              onPress={() => navigation.navigate('ContactsTab')}
            />
            <QuickActionCard
              title="Police Nearby"
              subtitle="Find stations"
              icon="shield-account"
              gradientColors={['#3498db', '#2980b9']}
            />
          </View>
        </View>

        {/* Recent Journeys */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Journeys</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.journeysContainer}>
          {mockRecentJourneys.map((journey) => (
            <View key={journey.id} style={styles.journeyCard}>
              <View style={styles.journeyMapPlaceholder}>
                <MaterialCommunityIcons name="map" size={40} color={colors.border} />
                <View style={styles.journeyBadge}>
                  <MaterialCommunityIcons name="shield-check" size={12} color={colors.white} />
                  <Text style={styles.journeyBadgeText}>{journey.safetyScore}%</Text>
                </View>
              </View>
              <View style={styles.journeyInfo}>
                <Text style={styles.journeyRoute} numberOfLines={1}>{journey.from} to {journey.to}</Text>
                <Text style={styles.journeyTime}>{journey.timestamp}</Text>
                <View style={styles.journeyMeta}>
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="clock-outline" size={12} color={colors.textMedium} />
                    <Text style={styles.metaText}>{journey.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="map-marker-distance" size={12} color={colors.textMedium} />
                    <Text style={styles.metaText}>{journey.distance}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        
        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingContainer: {
    marginLeft: spacing.sm,
  },
  greetingText: {
    ...typography.caption,
    color: colors.textMedium,
  },
  userName: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBtn: {
    padding: spacing.xs,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.danger,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  notificationCount: {
    color: colors.white,
    fontSize: 8,
    fontFamily: 'Poppins_700Bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...typography.small,
    color: colors.textMedium,
    marginLeft: spacing.xs,
    marginRight: spacing.sm,
    maxWidth: '70%',
  },
  changeLocationText: {
    ...typography.small,
    color: colors.primary,
    fontFamily: 'Poppins_500Medium',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 52,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchText: {
    flex: 1,
    ...typography.body,
    color: colors.textLight,
  },
  sosCard: {
    height: 176,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  sosCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  sosTitle: {
    ...typography.h2,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
  },
  sosSubtitle: {
    ...typography.small,
    color: colors.white,
    opacity: 0.9,
  },
  pulseContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  sosCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  sosButtonContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosChecklist: {
    alignItems: 'flex-start',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  checkText: {
    ...typography.caption,
    color: colors.white,
    marginLeft: spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  seeAllText: {
    ...typography.small,
    color: colors.primary,
    fontFamily: 'Poppins_500Medium',
  },
  gridContainer: {
    marginBottom: spacing.lg,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  journeysContainer: {
    paddingRight: spacing.lg,
  },
  journeyCard: {
    width: 240,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginRight: spacing.md,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  journeyMapPlaceholder: {
    height: 60,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  journeyBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  journeyBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 2,
  },
  journeyInfo: {
    padding: spacing.md,
  },
  journeyRoute: {
    ...typography.small,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 2,
  },
  journeyTime: {
    ...typography.caption,
    color: colors.textMedium,
    marginBottom: spacing.sm,
  },
  journeyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    ...typography.caption,
    color: colors.textMedium,
    marginLeft: 4,
  },
});
