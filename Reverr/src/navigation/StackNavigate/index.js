import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  StartupVerification,
  SplashFirst,
  SplashSecond,
  SplashThird,
  ProfileSetUp,
} from '../../scenes';
import ThanksScreen from '../../scenes/thanks-screen';

const Stack = createNativeStackNavigator();

const StackNavigate = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="StartupVerification"
        component={StartupVerification}
      />
      <Stack.Screen name="Splash1" component={SplashFirst} />
      <Stack.Screen name="Splash2" component={SplashSecond} />
      <Stack.Screen name="Splash3" component={SplashThird} />
      <Stack.Screen name="ProfileSetUp" component={ProfileSetUp} />
      <Stack.Screen name="Thanks" component={ThanksScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigate;
