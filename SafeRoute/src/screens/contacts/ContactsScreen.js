import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Header from '../../components/common/Header';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { mockContacts, mockTrustedFriends } from '../../utils/mockData';

export default function ContactsScreen() {
  const renderContactCard = (contact) => (
    <View key={contact.id} style={styles.contactCard}>
      <View style={styles.contactLeft}>
        <Avatar size={48} initials={contact.name} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactRelation}>{contact.relationship}</Text>
          <Text style={styles.contactPhone}>{contact.phone}</Text>
        </View>
      </View>
      
      <View style={styles.contactRight}>
        <View style={styles.priorityBadge}>
          <Text style={styles.priorityText}>Priority {contact.priority}</Text>
        </View>
        <TouchableOpacity style={styles.optionsBtn}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.textMedium} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFriendAvatar = (friend) => (
    <View key={friend.id} style={styles.friendItem}>
      <Avatar size={56} initials={friend.name} showOnline={friend.online} />
      <Text style={styles.friendName} numberOfLines={1}>{friend.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Trusted Contacts" 
        rightIcon="plus"
        onRightPress={() => {}}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="information" size={24} color={colors.primary} />
          <Text style={styles.infoText}>
            These contacts will receive an SMS with your live location when you activate SOS.
          </Text>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Emergency Contacts ({mockContacts.length}/5)</Text>
        </View>
        
        {mockContacts.map(renderContactCard)}
        
        {mockContacts.length < 5 && (
          <Button
            title="Add from Contacts"
            variant="outline"
            icon="account-plus"
            style={styles.addBtn}
          />
        )}
        
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Trusted Group / Friends</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <View style={styles.friendsGrid}>
          {mockTrustedFriends.map(renderFriendAvatar)}
          
          <View style={styles.friendItem}>
            <TouchableOpacity style={styles.addFriendCircle}>
              <MaterialCommunityIcons name="plus" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.friendName}>Add More</Text>
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
    paddingBottom: spacing.xxl,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight + '20',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLight + '40',
  },
  infoText: {
    flex: 1,
    ...typography.caption,
    color: colors.primaryDark,
    marginLeft: spacing.sm,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactInfo: {
    marginLeft: spacing.md,
  },
  contactName: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  contactRelation: {
    ...typography.caption,
    color: colors.primary,
    fontFamily: 'Poppins_500Medium',
  },
  contactPhone: {
    ...typography.caption,
    color: colors.textMedium,
  },
  contactRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priorityBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  priorityText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.textMedium,
  },
  optionsBtn: {
    padding: 4,
  },
  addBtn: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.caption,
    color: colors.textMedium,
    marginHorizontal: spacing.md,
    fontFamily: 'Poppins_500Medium',
  },
  friendsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  friendItem: {
    alignItems: 'center',
    width: '25%',
    marginBottom: spacing.lg,
  },
  friendName: {
    ...typography.caption,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
    marginTop: spacing.sm,
  },
  addFriendCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
