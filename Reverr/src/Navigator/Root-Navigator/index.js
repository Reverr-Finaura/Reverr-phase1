import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgotPassword,
  IndividuaProfile,
  LoginScreen,
  OtpScreen,
  ResetPassword,
  SignupScreen,
  Test,
  Settings,
  EditProfile,
  MentorProfile,
  Messages,
  ChatScreen,
  SavedScreen,
} from '../../scenes';
import {indivisualTabs} from '../Indivisual-Navigator';
import {mentorTab} from '../Mentor-Navigator';
const Stack = createNativeStackNavigator();

const Root_Navigator = props => {
  return (
    <Stack.Navigator initialRouteName={props?.initialroutereference}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OtpVerification"
        component={OtpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Test"
        component={IndividuaProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Test2"
        component={MentorProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditIndivisualProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Saved"
        component={SavedScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export {Root_Navigator};
