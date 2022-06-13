import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ThanksScreen from '../../scenes/thanks-screen';
import {SplashFirst} from '../../scenes/splash-screens/splash1';
import {SplashSecond} from '../../scenes/splash-screens/splash2';
import {SplashThird} from '../../scenes/splash-screens/splash3';
import {ProfileSetUp} from '../../scenes/profilesetup';
import {StartupVerification} from '../../scenes/startup-verification';
import {LoginScreen, OnBoarding, SignupScreen} from '../../scenes';

const Stack = createNativeStackNavigator();

const StackNavigate = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="onboarding" component={OnBoarding} />
      <Stack.Screen
        name="StartupVerification"
        component={StartupVerification}
      />

      <Stack.Screen name="Splash2" component={SplashSecond} />
      <Stack.Screen name="Splash3" component={SplashThird} />
      <Stack.Screen name="ProfileSetUp" component={ProfileSetUp} />
      <Stack.Screen name="Thanks" component={ThanksScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigate;
