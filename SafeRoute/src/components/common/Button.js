import React from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
}) => {
  const isOutline = variant === 'outline';
  
  const getGradientColors = () => {
    switch (variant) {
      case 'danger':
        return [colors.danger, colors.dangerDark];
      case 'success':
        return [colors.successLight, colors.success];
      case 'secondary':
        return [colors.textLight, colors.textMedium];
      case 'primary':
      default:
        return [colors.primaryLight, colors.primary];
    }
  };

  const getTextColor = () => {
    if (disabled && !isOutline) return colors.white;
    if (disabled && isOutline) return colors.textLight;
    if (isOutline) return colors.primary;
    return colors.white;
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.md };
      case 'large':
        return { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl };
      case 'medium':
      default:
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.lg };
    }
  };

  const content = (
    <View style={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={size === 'small' ? 16 : 20}
              color={getTextColor()}
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.text,
              { color: getTextColor() },
              size === 'small' ? typography.small : typography.body,
              typography.h3, // Make button text a bit bolder
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </View>
  );

  const containerStyle = [
    styles.container,
    fullWidth && styles.fullWidth,
    getPadding(),
    isOutline && styles.outlineContainer,
    disabled && styles.disabledContainer,
    style,
  ];

  if (isOutline) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        style={containerStyle}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[fullWidth && styles.fullWidth, style]}
    >
      <LinearGradient
        colors={disabled ? [colors.textLight, colors.textLight] : getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.container, getPadding()]}
      >
        {content}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  fullWidth: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledContainer: {
    borderColor: colors.textLight,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
});

export default Button;
