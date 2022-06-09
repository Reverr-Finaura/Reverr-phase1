import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import OnBoarding from './OnBoarding';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="onboarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
