import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const { height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('login');
  const [phone, setPhone] = useState('');

  const handleSendOtp = () => {
    navigation.navigate('Otp', { phone: `+91 ${phone}` });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Gradient Section */}
        <LinearGradient
          colors={[colors.primaryLight, colors.primaryDark]}
          style={styles.topSection}
        >
          <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.logoContainer}>
              <View style={styles.shield}>
                <MaterialCommunityIcons name="shield-check" size={56} color={colors.primary} />
              </View>
              <Text style={styles.welcomeText}>Welcome to Safe Route</Text>
              <Text style={styles.subWelcomeText}>Your trusted safety companion</Text>
            </View>
          </SafeAreaView>
          {/* Curve at bottom */}
          <View style={styles.curve} />
        </LinearGradient>

        {/* Bottom Form Section */}
        <View style={styles.bottomSection}>
          <View style={styles.card}>
            
            {/* Tab Switcher */}
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'login' && styles.activeTab]}
                onPress={() => setActiveTab('login')}
              >
                <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
                onPress={() => setActiveTab('signup')}
              >
                <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+91</Text>
                  <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textMedium} />
                </View>
                <Input
                  placeholder="Enter mobile number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  style={styles.phoneInput}
                />
              </View>

              <Button
                title={activeTab === 'login' ? "Send OTP" : "Create Account"}
                onPress={handleSendOtp}
                style={styles.mainButton}
              />

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <MaterialCommunityIcons name="google" size={24} color="#DB4437" />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <MaterialCommunityIcons name="apple" size={24} color={colors.text} />
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <Text style={styles.termsText}>
            By continuing, you agree to our{'\n'}
            <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    height: height * 0.4,
    width: '100%',
    position: 'relative',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40, // Space for overlapping card
  },
  logoContainer: {
    alignItems: 'center',
  },
  shield: {
    width: 90,
    height: 90,
    backgroundColor: colors.white,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeText: {
    ...typography.h2,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
  },
  subWelcomeText: {
    ...typography.body,
    color: colors.white,
    opacity: 0.8,
  },
  curve: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    marginTop: -20, // Overlap the curve slightly
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    marginBottom: spacing.xl,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: 4,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  activeTab: {
    backgroundColor: colors.white,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    ...typography.body,
    fontFamily: 'Poppins_500Medium',
    color: colors.textMedium,
  },
  activeTabText: {
    color: colors.primary,
    fontFamily: 'Poppins_600SemiBold',
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    ...typography.small,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    height: 52,
    marginRight: spacing.sm,
  },
  countryCodeText: {
    ...typography.body,
    fontFamily: 'Poppins_500Medium',
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    marginBottom: 0, // Override default margin from Input component
  },
  mainButton: {
    marginTop: spacing.md,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
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
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xs,
  },
  socialButtonText: {
    ...typography.body,
    fontFamily: 'Poppins_500Medium',
    marginLeft: spacing.sm,
  },
  termsText: {
    ...typography.caption,
    color: colors.textMedium,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  linkText: {
    color: colors.primary,
    fontFamily: 'Poppins_600SemiBold',
  },
});
