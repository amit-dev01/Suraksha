import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, typography } from '../../theme';

const Avatar = ({ source, size = 48, showOnline = false, initials, style }) => {
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const onlineDotStyle = {
    width: size * 0.25,
    height: size * 0.25,
    borderRadius: (size * 0.25) / 2,
    backgroundColor: colors.success,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: colors.white,
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      {source ? (
        <Image source={source} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
      ) : (
        <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
          {initials ? initials.substring(0, 2).toUpperCase() : '?'}
        </Text>
      )}
      
      {showOnline && <View style={onlineDotStyle} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    color: colors.white,
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default Avatar;
