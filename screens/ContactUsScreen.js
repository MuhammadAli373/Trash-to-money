import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';

export default function ContactUsScreen() {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Here you would typically send the message to your backend
    Alert.alert('Message Sent', 'Thank you for your message. We will get back to you soon.');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
      <View style={styles.contactInfo}>
        <Text style={styles.contactInfoText}>Email: support@example.com</Text>
        <Text style={styles.contactInfoText}>Phone: +998 90 123 45 67</Text>
        <Text style={styles.contactInfoText}>Address: 123 Main St, Tashkent, Uzbekistan</Text>
      </View>
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
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  contactInfo: {
    marginTop: 30,
  },
  contactInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});