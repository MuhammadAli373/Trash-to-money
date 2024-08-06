import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import getTranslation from '../translations'; // Adjust this path if needed

const languages = [
  { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState(languages[0]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setLanguage(languages.find(lang => lang.code === savedLanguage) || languages[0]);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const selectLanguage = async (lang) => {
    setLanguage(lang);
    setShowLanguageModal(false);
    try {
      await AsyncStorage.setItem('selectedLanguage', lang.code);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const handleLogin = async () => {
    // Implement your login logic here
    console.log('Login attempted');
  };

  const safeTranslation = (key) => {
    if (!language || !language.code) {
      console.error('Language or language code is undefined');
      return key; // Return the key as a fallback
    }
    return getTranslation(key, language.code) || key;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.content}>
              <TouchableOpacity 
                style={styles.languageSelector} 
                onPress={() => setShowLanguageModal(true)}
              >
                <Text style={styles.languageFlag}>{language.flag} {language.name}</Text>
              </TouchableOpacity>

              <Text style={styles.title}>{safeTranslation('login')}</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{safeTranslation('phoneNumber')}</Text>
                <View style={styles.phoneInputWrapper}>
                  <Text style={styles.countryCode}>+998</Text>
                  <TextInput
                    style={styles.phoneInput}
                    placeholder={safeTranslation('enterPhoneNumber')}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{safeTranslation('password')}</Text>
                <View style={styles.passwordInputWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder={safeTranslation('enterPassword')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.flex} />

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>{safeTranslation('login')}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.registerLink} 
                onPress={() => navigation.navigate('PhoneInput')}
              >
                <Text style={styles.registerLinkText}>
                  {safeTranslation('dontHaveAccount')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setShowLanguageModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.languageModalContent}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={styles.languageOption}
                  onPress={() => selectLanguage(lang)}
                >
                  <Text style={styles.languageOptionText}>{lang.flag} {lang.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  languageSelector: {
    alignSelf: 'flex-start',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginBottom: 20,
  },
  languageFlag: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    overflow: 'hidden',
  },
  countryCode: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRightWidth: 1,
    borderRightColor: '#DDD',
  },
  phoneInput: {
    flex: 1,
    padding: 15,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
  },
  flex: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    alignItems: 'center',
    padding: 10,
  },
  registerLinkText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  languageModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    minWidth: 200,
  },
  languageOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  languageOptionText: {
    fontSize: 16,
  },
});