import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence,
  withSpring,
  withDelay
} from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Button from '../../components/common/Button';

export default function SosCancelledScreen({ navigation }) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.2, { duration: 400 }),
      withSpring(1, { damping: 12, stiffness: 100 })
    );
    opacity.value = withDelay(400, withTiming(1, { duration: 500 }));
  }, []);

  const animatedCheckmark = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedContent = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: withTiming(opacity.value === 1 ? 0 : 20, { duration: 500 }) }],
    };
  });

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'RootStack', params: { screen: 'MainApp' } }],
    });
    // Or simpler if just in the modal stack
    navigation.navigate('MainApp');
  };

  const renderSummaryRow = (icon, label, value) => (
    <View style={styles.summaryRow}>
      <View style={styles.summaryLabelContainer}>
        <MaterialCommunityIcons name={icon} size={20} color={colors.textMedium} />
        <Text style={styles.summaryLabel}>{label}</Text>
      </View>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.successSection}>
          <Animated.View style={[styles.checkmarkContainer, animatedCheckmark]}>
            <MaterialCommunityIcons name="check" size={60} color={colors.white} />
          </Animated.View>
          
          <Animated.View style={[styles.textCenter, animatedContent]}>
            <Text style={styles.title}>You're Safe! 💜</Text>
            <Text style={styles.subtitle}>
              Your SOS emergency alert has been successfully cancelled. Your contacts have been notified of your safety.
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={[styles.summaryCard, animatedContent]}>
          <Text style={styles.cardTitle}>Emergency Summary</Text>
          
          <View style={styles.divider} />
          
          {renderSummaryRow("clock-outline", "Duration", "04:23")}
          {renderSummaryRow("account-multiple", "Contacts alerted", "3")}
          {renderSummaryRow("shield-check", "Police notified", "Yes")}
          {renderSummaryRow("microphone", "Evidence recorded", "2 Audio")}
          {renderSummaryRow("map-marker", "Last location", "Koramangala")}
        </Animated.View>

        <Animated.View style={[styles.bottomSection, animatedContent]}>
          <Button
            title="View Recorded Evidence"
            variant="outline"
            icon="file-document-outline"
            style={styles.evidenceBtn}
            onPress={() => {}}
          />
          
          <Button
            title="Back to Home"
            onPress={handleBackToHome}
            fullWidth
          />
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  successSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  checkmarkContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  textCenter: {
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMedium,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  summaryCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    ...typography.h3,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  summaryLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.body,
    color: colors.textMedium,
    marginLeft: spacing.sm,
  },
  summaryValue: {
    ...typography.body,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  evidenceBtn: {
    marginBottom: spacing.md,
  },
});
