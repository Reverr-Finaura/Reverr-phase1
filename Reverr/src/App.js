/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, StatusBar} from 'react-native';
import AppLayout from './layouts/app/app.layout';
import AppStack from './Navigations/AppStack';
import BottomNavigation from './Navigations/BottomNavigation';
import {AppColors} from './utils/Constants';
export default function App() {
  return (
    <AppLayout>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.primarycolor}
      />
      <AppStack />
    </AppLayout>
  );
}
