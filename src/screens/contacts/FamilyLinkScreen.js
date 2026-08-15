import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

export default function FamilyLinkScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Family Linking" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="account-group" size={64} color={colors.primary} />
          </View>
          <Text style={styles.title}>Connect Your Family</Text>
          <Text style={styles.subtitle}>
            Link accounts with your family members for automatic location sharing during commutes and instant SOS alerts.
          </Text>
        </View>

        <View style={styles.actionCard}>
          <MaterialCommunityIcons name="qrcode-scan" size={32} color={colors.text} />
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Scan QR Code</Text>
            <Text style={styles.actionSubtitle}>Scan a family member's code</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textLight} />
        </View>

        <View style={styles.actionCard}>
          <MaterialCommunityIcons name="link-variant" size={32} color={colors.text} />
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Share Invite Link</Text>
            <Text style={styles.actionSubtitle}>Send via WhatsApp or SMS</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textLight} />
        </View>

        <View style={styles.pendingSection}>
          <Text style={styles.sectionTitle}>Pending Invites</Text>
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="email-open-outline" size={40} color={colors.textLight} />
            <Text style={styles.emptyText}>No pending invites</Text>
          </View>
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
  content: {
    padding: spacing.md,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    paddingTop: spacing.lg,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMedium,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  actionTitle: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  actionSubtitle: {
    ...typography.caption,
    color: colors.textMedium,
  },
  pendingSection: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    ...typography.body,
    color: colors.textMedium,
    marginTop: spacing.sm,
  },
});
