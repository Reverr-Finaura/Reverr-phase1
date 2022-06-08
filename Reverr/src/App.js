/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text} from 'react-native';
import { LoginScreen,SignupScreen,OtpScreen,ForgotPassword } from './scenes';
import AppLayout from './layouts/app/app.layout';

export default function App() {
  return (
    <AppLayout>
      <Text>Hello World</Text>
      {/* <ForgotPassword/> */}
      {/* <SignupScreen/> */}
    </AppLayout>
  );
}
