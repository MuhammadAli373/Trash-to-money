import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const TASHKENT_COORDINATES = {
  latitude: 41.2995,
  longitude: 69.2401,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

function MapContent({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <MapView
        style={styles.map}
        initialRegion={TASHKENT_COORDINATES}
      >
        <Marker coordinate={TASHKENT_COORDINATES} title="Tashkent" />
      </MapView>
      <SafeAreaView style={styles.buttonContainer} pointerEvents="box-none">
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.trashButton}
          onPress={() => {/* Handle trash disposal */}}
        >
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default function MapScreen({ navigation }) {
  return (
    <SafeAreaProvider>
      <MapContent navigation={navigation} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  menuButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  trashButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});