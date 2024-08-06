import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const tariffs = [
  { id: '1', name: 'Basic', price: '10000 UZS/month' },
  { id: '2', name: 'Standard', price: '20000 UZS/month' },
  { id: '3', name: 'Premium', price: '30000 UZS/month' },
];

export default function TariffsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.tariffItem}>
      <Text style={styles.tariffName}>{item.name}</Text>
      <Text style={styles.tariffPrice}>{item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tariffs</Text>
      <FlatList
        data={tariffs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tariffItem: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  tariffName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tariffPrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
});