import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const paymentMethods = [
  { id: '1', name: 'Credit Card' },
  { id: '2', name: 'PayPal' },
  { id: '3', name: 'Bank Transfer' },
];

export default function PaymentMethodScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Payment Methods</Text>
      {paymentMethods.map((method) => (
        <TouchableOpacity key={method.id} style={styles.methodItem}>
          <Text style={styles.methodName}>{method.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Payment Method</Text>
      </TouchableOpacity>
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
  methodItem: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  methodName: {
    fontSize: 16,
  },
  addButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});