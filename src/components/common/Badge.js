import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, typography, borderRadius } from '../../theme';

const Badge = ({ text, variant = 'info', size = 'medium', style }) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return colors.successLight;
      case 'warning':
        return colors.warning;
      case 'danger':
        return colors.danger;
      case 'info':
      default:
        return colors.primaryLight;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'success':
        return colors.successDark || '#1A8F4A'; // Assuming we want a darker text for contrast
      case 'warning':
        return '#8A5A00';
      case 'danger':
        return colors.white;
      case 'info':
      default:
        return colors.white;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingHorizontal: 6, paddingVertical: 2 };
      case 'large':
        return { paddingHorizontal: 12, paddingVertical: 6 };
      case 'medium':
      default:
        return { paddingHorizontal: 8, paddingVertical: 4 };
    }
  };

  const getTextStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: 10 };
      case 'large':
        return typography.small;
      case 'medium':
      default:
        return typography.caption;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        getPadding(),
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: getTextColor() },
          getTextStyles(),
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default Badge;
