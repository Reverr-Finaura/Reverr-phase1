/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StatusBar} from 'react-native';
import StackNavigate from './navigation/StackNavigate';
import {Text} from 'react-native';
import {AppLayout} from './layouts/app/app.layout';
import {AppColors} from './utils/Constants';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AppLayout>
        <StatusBar
          barStyle="light-content"
          backgroundColor={AppColors.primarycolor}
        />
        <StackNavigate />
      </AppLayout>
    </NavigationContainer>
  );
}
