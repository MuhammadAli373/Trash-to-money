import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ProfileScreen() {
  // In a real app, you would fetch this data from your backend or local storage
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+998 90 123 45 67',
    dateOfBirth: '01/01/1990',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.info}>{user.firstName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.info}>{user.lastName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.info}>{user.phoneNumber}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.info}>{user.dateOfBirth}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    width: 120,
  },
  info: {
    flex: 1,
  },
});