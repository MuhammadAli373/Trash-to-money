import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Modal, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import getTranslation from '../translations'; // Adjust this path if needed

const languages = [
  { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export default function PhoneInputScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [language, setLanguage] = useState(languages[0]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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

  const handleRegister = () => {
    if (agreeToTerms) {
      navigation.navigate('Verification', { phoneNumber, language });
    } else {
      Alert.alert('Error', 'Please agree to the terms and conditions');
    }
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity style={styles.languageSelector} onPress={() => setShowLanguageModal(true)}>
            <Text>{language.flag} {language.name}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{safeTranslation('yourPhoneNumber')}</Text>
          <Text style={styles.subtitle}>{safeTranslation('weWillSendVerificationCode')}</Text>

          <View style={styles.phoneInputContainer}>
            <View style={styles.flagContainer}>
              <Text style={styles.flag}>🇺🇿</Text>
            </View>
            <Text style={styles.countryCode}>+998</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder={safeTranslation('enterPhoneNumber')}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity onPress={() => setAgreeToTerms(!agreeToTerms)}>
              <Ionicons name={agreeToTerms ? 'checkbox-outline' : 'square-outline'} size={24} color="#4CAF50" />
            </TouchableOpacity>
            <Text style={styles.termsText}>
              {safeTranslation('byChecking')} 
              <Text style={styles.termsLink} onPress={() => setShowTermsModal(true)}>
                {safeTranslation('termsOfUse')}
              </Text> {safeTranslation('and')} 
              <Text style={styles.termsLink} onPress={() => setShowPrivacyModal(true)}>
                {safeTranslation('privacyPolicy')}
              </Text>
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[styles.registerButton, !agreeToTerms && styles.registerButtonDisabled]} 
            onPress={handleRegister}
            disabled={!agreeToTerms}
          >
            <Text style={styles.buttonText}>{safeTranslation('register')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>{safeTranslation('alreadyHaveAccount')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Language Modal */}
      <Modal visible={showLanguageModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{safeTranslation('selectLanguage')}</Text>
            {languages.map((lang) => (
              <TouchableOpacity key={lang.code} style={styles.languageOption} onPress={() => selectLanguage(lang)}>
                <Text>{lang.flag} {lang.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowLanguageModal(false)}>
              <Text style={styles.closeButtonText}>{safeTranslation('close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Terms of Use Modal */}
      <Modal visible={showTermsModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{safeTranslation('termsOfUse')}</Text>
            <ScrollView style={styles.modalScrollView}>
              <Text>This is a placeholder for the Terms of Use. Replace with your actual terms.</Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowTermsModal(false)}>
              <Text style={styles.closeButtonText}>{safeTranslation('close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal visible={showPrivacyModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{safeTranslation('privacyPolicy')}</Text>
            <ScrollView style={styles.modalScrollView}>
              <Text>This is a placeholder for the Privacy Policy. Replace with your actual policy.</Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowPrivacyModal(false)}>
              <Text style={styles.closeButtonText}>{safeTranslation('close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  flagContainer: {
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: '#DDD',
  },
  flag: {
    fontSize: 20,
  },
  countryCode: {
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: '#DDD',
  },
  phoneInput: {
    flex: 1,
    padding: 15,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 10,
    flex: 1,
    color: '#333',
  },
  termsLink: {
    color: '#4CAF50',
  },
  bottomContainer: {
    padding: 20,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalScrollView: {
    maxHeight: 300,
    marginBottom: 15,
  },
  languageOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});