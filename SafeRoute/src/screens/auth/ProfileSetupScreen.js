import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';

export default function ProfileSetupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    gender: '',
    address: '',
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    navigation.replace('MainApp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Complete Profile" showBack />
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Step 1 of 3 - Basic Info</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '33%' }]} />
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Profile Picture Upload */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder}>
                <MaterialCommunityIcons name="account" size={60} color={colors.textLight} />
              </View>
              <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
                <MaterialCommunityIcons name="camera" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.uploadText}>Upload Photo</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              icon="account-outline"
              value={formData.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
            />
            
            <Input
              label="Email Address (Optional)"
              placeholder="Enter your email"
              icon="email-outline"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
            
            {/* Simple TextInputs for DOB and Gender for now, 
                ideally would be Picker/DatePicker components */}
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Input
                  label="Date of Birth"
                  placeholder="DD/MM/YYYY"
                  icon="calendar-blank"
                  value={formData.dob}
                  onChangeText={(text) => handleChange('dob', text)}
                />
              </View>
              <View style={styles.halfWidth}>
                <Input
                  label="Gender"
                  placeholder="Select"
                  icon="gender-male-female"
                  value={formData.gender}
                  onChangeText={(text) => handleChange('gender', text)}
                />
              </View>
            </View>
            
            <Input
              label="Home Address"
              placeholder="Enter your residential address"
              icon="home-outline"
              value={formData.address}
              onChangeText={(text) => handleChange('address', text)}
              multiline
              numberOfLines={3}
              style={{ height: 100 }}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Continue"
              onPress={handleSubmit}
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  progressContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  progressText: {
    ...typography.caption,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadText: {
    ...typography.small,
    color: colors.primary,
    fontFamily: 'Poppins_500Medium',
  },
  formSection: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  buttonContainer: {
    marginTop: spacing.xl,
  },
});
