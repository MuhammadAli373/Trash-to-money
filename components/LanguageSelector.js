import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const languages = [
  { code: 'uz', name: "O'zbek" },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
];

export default function LanguageSelectionScreen({ navigation }) {
  const selectLanguage = (languageCode) => {
    // Here you would typically set the app's language
    // For now, we'll just navigate to the next screen
    navigation.navigate('PhoneInput');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Language / Выберите язык / Tilni tanlang</Text>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={styles.languageButton}
            onPress={() => selectLanguage(lang.code)}
          >
            <Text style={styles.languageButtonText}>{lang.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  languageButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});