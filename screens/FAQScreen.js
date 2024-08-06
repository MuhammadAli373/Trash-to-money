import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

const faqs = [
  {
    question: 'How does the recycling process work?',
    answer: 'Our app connects you with local recycling centers. Simply bring your recyclables to the nearest center...'
  },
  {
    question: 'What types of materials can I recycle?',
    answer: 'We accept a wide range of materials including paper, plastic, glass, and metal...'
  },
  {
    question: 'How do I earn points?',
    answer: 'You earn points for every kilogram of recyclable material you bring in. These points can be redeemed for rewards...'
  },
];

export default function FAQScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
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
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answer: {
    fontSize: 16,
  },
});