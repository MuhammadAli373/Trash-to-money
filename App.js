import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import all screens
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import PhoneInputScreen from './screens/PhoneInputScreen';
import VerificationScreen from './screens/VerificationScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import SetPasswordScreen from './screens/SetPasswordScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import TariffsScreen from './screens/TariffsScreen';
import DocumentationScreen from './screens/DocumentationScreen';
import FAQScreen from './screens/FAQScreen';
import ContactUsScreen from './screens/ContactUsScreen';

// Import the SideMenu component
import SideMenu from './components/SideMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer({ navigation }) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      await AsyncStorage.setItem('userLoggedOut', 'true');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Replace 'Login' with your desired screen
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideMenu {...props} onLogout={handleLogout} />}
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#f5f5f5',
          width: 240,
        },
      }}
    >
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Drawer.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Drawer.Screen name="Tariffs" component={TariffsScreen} />
      <Drawer.Screen name="Documentation" component={DocumentationScreen} />
      <Drawer.Screen name="FAQ" component={FAQScreen} />
      <Drawer.Screen name="ContactUs" component={ContactUsScreen} />
    </Drawer.Navigator>
  );
}


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="PhoneInput" component={PhoneInputScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
            <Stack.Screen name="MainApp" component={MainDrawer} />

            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <Stack.Screen name="MainApp" component={MainDrawer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
