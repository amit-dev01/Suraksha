import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { colors, borderRadius, spacing } from '../../theme';

const Card = ({ children, style, onPress, elevation = 2 }) => {
  const containerStyle = [
    styles.card,
    {
      shadowOpacity: elevation * 0.05,
      shadowRadius: elevation * 2,
      elevation: elevation,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={containerStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default Card;
