import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, borderRadius, spacing } from '../../theme';

export default function QuickActionCard({
  title,
  subtitle,
  icon,
  gradientColors,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.gridCard} onPress={onPress}>
      <LinearGradient colors={gradientColors} style={styles.gridGradient}>
        <View style={styles.gridCardHeader}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name={icon} size={24} color={colors.white} />
          </View>
          <MaterialCommunityIcons name="arrow-top-right" size={20} color={colors.white} />
        </View>
        <Text style={styles.gridCardTitle}>{title}</Text>
        <Text style={styles.gridCardSubtitle}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gridCard: {
    width: '48%',
    height: 120,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  gridGradient: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  gridCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridCardTitle: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.white,
  },
  gridCardSubtitle: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.8,
  },
});
