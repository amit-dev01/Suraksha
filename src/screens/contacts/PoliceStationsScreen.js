import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import Header from '../../components/common/Header';
import { MaterialIcons } from '@expo/vector-icons';
import { mockPoliceStations } from '../../utils/mockData';

export default function PoliceStationsScreen({ navigation }) {
  
  const renderStation = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="local-police" size={32} color={colors.primary} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.distance}>{item.distance} away</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialIcons name="directions" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.callBtn]}>
          <MaterialIcons name="call" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Police Stations" showBack onBackPress={() => navigation.goBack()} />
      <View style={styles.mapPlaceholder}>
        <MaterialIcons name="map" size={60} color={colors.text.secondary} />
        <Text style={styles.mapText}>Map showing nearby stations</Text>
      </View>
      <FlatList
        data={mockPoliceStations}
        keyExtractor={item => item.id}
        renderItem={renderStation}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapPlaceholder: {
    height: 250,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    ...typography.body1,
    color: colors.text.secondary,
    marginTop: 10,
  },
  list: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    ...typography.subtitle1,
    color: colors.text.primary,
    marginBottom: 4,
  },
  distance: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  callBtn: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  }
});
