import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Avatar from '../../components/common/Avatar';
import Header from '../../components/common/Header';
import { mockUser } from '../../utils/mockData';

export default function ProfileScreen() {
  const [autoDetect, setAutoDetect] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const renderSectionHeader = (title) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderSettingItem = ({ icon, title, type = 'arrow', onPress, value, onValueChange, isDestructive }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={type === 'toggle'}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, isDestructive && { backgroundColor: colors.dangerLight + '20' }]}>
          <MaterialCommunityIcons 
            name={icon} 
            size={22} 
            color={isDestructive ? colors.danger : colors.textMedium} 
          />
        </View>
        <Text style={[styles.settingTitle, isDestructive && { color: colors.danger }]}>{title}</Text>
      </View>
      
      {type === 'arrow' && (
        <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textLight} />
      )}
      
      {type === 'toggle' && (
        <Switch
          trackColor={{ false: colors.border, true: colors.primaryLight }}
          thumbColor={value ? colors.primary : colors.white}
          onValueChange={onValueChange}
          value={value}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile & Settings" />
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar size={72} initials={mockUser.name} />
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{mockUser.name}</Text>
                {mockUser.isVerified && (
                  <MaterialCommunityIcons name="check-decagram" size={20} color={colors.primary} style={styles.verifiedIcon} />
                )}
              </View>
              <Text style={styles.phone}>{mockUser.phone}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editBtn}>
            <MaterialCommunityIcons name="pencil" size={16} color={colors.primary} />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        <View style={styles.settingsContainer}>
          
          {renderSectionHeader('ACCOUNT')}
          <View style={styles.card}>
            {renderSettingItem({ icon: 'account-outline', title: 'Personal Info' })}
            <View style={styles.divider} />
            {renderSettingItem({ icon: 'card-account-details-outline', title: 'ID Verification' })}
            <View style={styles.divider} />
            {renderSettingItem({ icon: 'account-group-outline', title: 'Family Linking' })}
          </View>

          {renderSectionHeader('SAFETY')}
          <View style={styles.card}>
            {renderSettingItem({ icon: 'alert-outline', title: 'SOS Settings' })}
            <View style={styles.divider} />
            {renderSettingItem({ icon: 'map-marker-outline', title: 'Location Preferences' })}
            <View style={styles.divider} />
            {renderSettingItem({ 
              icon: 'car-connected', 
              title: 'Auto Journey Detection', 
              type: 'toggle',
              value: autoDetect,
              onValueChange: setAutoDetect
            })}
            <View style={styles.divider} />
            {renderSettingItem({ 
              icon: 'wifi-off', 
              title: 'Offline Mode via SMS', 
              type: 'toggle',
              value: offlineMode,
              onValueChange: setOfflineMode
            })}
          </View>

          {renderSectionHeader('PRIVACY')}
          <View style={styles.card}>
            {renderSettingItem({ icon: 'shield-lock-outline', title: 'Privacy Settings' })}
            <View style={styles.divider} />
            {renderSettingItem({ icon: 'incognito', title: 'Anonymous Mode' })}
            <View style={styles.divider} />
            {renderSettingItem({ icon: 'block-helper', title: 'Blocked Users' })}
          </View>

          {renderSectionHeader('APP')}
          <View style={styles.card}>
            {renderSettingItem({ icon: 'translate', title: 'Language (English)' })}
            <View style={styles.divider} />
            {renderSettingItem({ icon: 'theme-light-dark', title: 'Theme (System)' })}
            <View style={styles.divider} />
            {renderSettingItem({ icon: 'information-outline', title: 'About Safe Route' })}
            <View style={styles.divider} />
            {renderSettingItem({ icon: 'help-circle-outline', title: 'Help & Support' })}
            <View style={styles.divider} />
            {renderSettingItem({ icon: 'logout', title: 'Logout', isDestructive: true })}
          </View>
          
        </View>
        
        <Text style={styles.versionText}>App Version 1.0.0</Text>
        
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
    paddingBottom: spacing.xxl,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profileInfo: {
    marginLeft: spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    ...typography.h3,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
  },
  verifiedIcon: {
    marginLeft: spacing.xs,
  },
  phone: {
    ...typography.body,
    color: colors.textMedium,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight + '15',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primaryLight + '30',
  },
  editBtnText: {
    ...typography.small,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  settingsContainer: {
    flex: 1,
  },
  sectionHeader: {
    ...typography.caption,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.textMedium,
    marginLeft: spacing.xs,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingTitle: {
    ...typography.body,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 60, // Align with text
  },
  versionText: {
    ...typography.caption,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
});
