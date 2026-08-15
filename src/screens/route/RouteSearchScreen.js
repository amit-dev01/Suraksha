import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

const SAVED_PLACES = [
  { id: '1', name: 'Home', icon: 'home' },
  { id: '2', name: 'Work', icon: 'briefcase' },
  { id: '3', name: 'College', icon: 'school' },
];

const RECENT_SEARCHES = [
  { id: 'rs1', address: 'Phoenix Marketcity, Mahadevapura' },
  { id: 'rs2', address: 'Central Library, Cubbon Park' },
  { id: 'rs3', address: 'Indiranagar 100ft Road' },
];

export default function RouteSearchScreen({ navigation }) {
  const [source, setSource] = useState('Current Location');
  const [destination, setDestination] = useState('');

  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const handleSearch = () => {
    navigation.navigate('RouteOptions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Plan Your Route" 
        showBack 
        rightIcon="history"
        onRightPress={() => {}}
      />

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.timelineContainer}>
            <View style={styles.timelineDotGreen} />
            <View style={styles.timelineLine} />
            <View style={styles.timelineDotRed} />
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={source}
                onChangeText={setSource}
                placeholder="Where from?"
                placeholderTextColor={colors.textLight}
              />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={destination}
                onChangeText={setDestination}
                placeholder="Where to?"
                placeholderTextColor={colors.textLight}
                autoFocus
              />
            </View>
          </View>

          <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
            <MaterialCommunityIcons name="swap-vertical" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Saved Places */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Places</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
            {SAVED_PLACES.map(place => (
              <TouchableOpacity key={place.id} style={styles.chip}>
                <MaterialCommunityIcons name={place.icon} size={16} color={colors.textMedium} />
                <Text style={styles.chipText}>{place.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.chip, styles.addChip]}>
              <MaterialCommunityIcons name="plus" size={16} color={colors.primary} />
              <Text style={[styles.chipText, { color: colors.primary }]}>Add</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recent Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {RECENT_SEARCHES.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.recentItem}
              onPress={() => setDestination(item.address)}
            >
              <MaterialCommunityIcons name="clock-outline" size={20} color={colors.textMedium} />
              <Text style={styles.recentText}>{item.address}</Text>
              <MaterialCommunityIcons name="arrow-top-left" size={20} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomSection}>
        <Button
          title="Find Safe Routes"
          onPress={handleSearch}
          disabled={!source || !destination}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.md,
  },
  inputSection: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: spacing.md,
    paddingVertical: spacing.sm,
  },
  timelineDotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  timelineDotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.danger,
  },
  inputsContainer: {
    flex: 1,
  },
  inputWrapper: {
    height: 40,
    justifyContent: 'center',
  },
  input: {
    ...typography.body,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  swapButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: 'center',
    marginLeft: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  chipsScroll: {
    flexDirection: 'row',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addChip: {
    backgroundColor: colors.primaryLight + '20',
    borderColor: colors.primaryLight + '50',
  },
  chipText: {
    ...typography.small,
    fontFamily: 'Poppins_500Medium',
    color: colors.textMedium,
    marginLeft: spacing.xs,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recentText: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.md,
  },
  bottomSection: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
