/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import {AppLayout} from './layouts';
import StackNavigate from './navigation/StackNavigate';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <AppLayout>
      <NavigationContainer>
        <StatusBar backgroundColor={'#000c12'} />
        <StackNavigate />
      </NavigationContainer>
    </AppLayout>
  );
}
