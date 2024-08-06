import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Animated,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import getTranslation from '../translations'; // Adjust path as needed

const DEFAULT_LANGUAGE = 'en'; // Set a default language

export default function VerificationScreen({ navigation, route }) {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [countdown, setCountdown] = useState(120);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const { phoneNumber, languageCode = DEFAULT_LANGUAGE } = route.params;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, key) => {
    if (key === 'Backspace' && index > 0 && !verificationCode[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyCode = () => {
    const code = verificationCode.join('');
    if (code === '1234') { // Replace with actual verification logic
      navigation.navigate('UserDetails');
    } else {
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
    }
  };

  const safeTranslation = (key) => {
    return getTranslation(key, languageCode) || key;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{safeTranslation('verificationCode')}</Text>
            <Text style={styles.subtitle}>{safeTranslation('enterVerificationCode')}</Text>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            <Animated.View style={[styles.codeContainer, { transform: [{ translateX: shakeAnimation }] }]}>
              {verificationCode.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.codeInput}
                  value={digit}
                  onChangeText={(value) => handleCodeChange(index, value)}
                  onKeyPress={({ nativeEvent: { key } }) => handleBackspace(index, key)}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              ))}
            </Animated.View>
            <Text style={styles.countdown}>
              {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
            </Text>
            <View style={styles.flex} />
            <TouchableOpacity 
              style={styles.continueButton} 
              onPress={verifyCode}
            >
              <Text style={styles.buttonText}>{safeTranslation('continue')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  countdown: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  flex: {
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});