import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import Header from '../../components/common/Header';

export default function LiveLocationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Live Location" showBack onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.title}>Live Location Sharing</Text>
        <Text style={styles.description}>You are currently sharing your location with 3 contacts.</Text>
        {/* Map and contact list goes here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: 10,
  },
  description: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
