import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../views/HomeScreen';
import WelcomeScreen from '../views/WelcomeScreen';
import LoginScreen from '../views/LoginScreen';
import SignUpScreen from '../views/SignupScreen';
import ChangePasswordScreen from '../views/ChangePasswordScreen';
import ProfileScreen from '../views/ProfileScreen';
import ForgotPasswordScreen from '../views/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Welcome"
          options={{headerShown: false}}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUpScreen}
        />

        <Stack.Screen
          name="ChangePasswordScreen"
          options={{headerShown: false}}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name="ProfileScreen"
          options={{headerShown: false}}
          component={ProfileScreen}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          options={{headerShown: false}}
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
