import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Header from '../../components/common/Header';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [locationTracking, setLocationTracking] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <MaterialCommunityIcons name="bell-outline" size={24} color={colors.textMedium} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingSubtitle}>Receive alerts for safe routes</Text>
              </View>
              <Switch value={notifications} onValueChange={setNotifications} color={colors.primary} />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingRow}>
              <MaterialCommunityIcons name="crosshairs-gps" size={24} color={colors.textMedium} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Background Location</Text>
                <Text style={styles.settingSubtitle}>Required for auto-detection</Text>
              </View>
              <Switch value={locationTracking} onValueChange={setLocationTracking} color={colors.primary} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <MaterialCommunityIcons name="lock-outline" size={24} color={colors.textMedium} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Change Password</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textLight} />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingRow}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color={colors.danger} />
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.danger }]}>Delete Account</Text>
              </View>
            </View>
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.caption,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.textMedium,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  settingInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  settingTitle: {
    ...typography.body,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
  },
  settingSubtitle: {
    ...typography.caption,
    color: colors.textMedium,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 56,
  },
});
