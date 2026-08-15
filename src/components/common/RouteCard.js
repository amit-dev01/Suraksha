import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';

export default function RouteCard({
  route,
  isSelected,
  onPress,
  badgeColor,
  badgeText,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.routeCard,
        isSelected && [styles.routeCardSelected, { borderColor: badgeColor }],
      ]}
      onPress={onPress}
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
}

const styles = StyleSheet.create({
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
});
