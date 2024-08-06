import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoadingAnimation = () => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const loadingAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(flipAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(loadingAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotate = loadingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.View style={[styles.logoWrapper, { transform: [{ rotateY: spin }] }]}>
          <View style={styles.logoSide}>
            <Ionicons name="trash-outline" size={60} color="white" />
          </View>
          <View style={[styles.logoSide, styles.backSide]}>
            <Ionicons name="cash-outline" size={60} color="white" />
          </View>
        </Animated.View>
      </View>
      <Animated.View style={[styles.loadingIcon, { transform: [{ rotate }] }]}>
        <Ionicons name="reload-outline" size={30} color="white" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  logoContainer: {
    width: 150,
    height: 150,
    perspective: 1000,
  },
  logoWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
  logoSide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#45a049',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backSide: {
    transform: [{ rotateY: '180deg' }],
  },
  loadingIcon: {
    marginTop: 30,
  },
});

export default LoadingAnimation;