import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const dummyOrders = [
  { id: '1', date: '2023-07-01', amount: '5000 UZS' },
  { id: '2', date: '2023-06-28', amount: '7500 UZS' },
  { id: '3', date: '2023-06-25', amount: '6000 UZS' },
];

export default function OrderHistoryScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderDate}>{item.date}</Text>
      <Text style={styles.orderAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={dummyOrders}
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
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  orderDate: {
    fontSize: 16,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});