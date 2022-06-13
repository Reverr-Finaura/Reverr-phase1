/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React,{useEffect,useState} from 'react';
import {Text} from 'react-native';
import AppLayout from './layouts/app/app.layout';
import { Root_Navigator } from './Navigator';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
export default function App() {
  const [user,setUser]=useState();
  const [initializing,setInitializing]=useState(true);
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
  }, []);
  if(initializing){
    return null;
  }
  return (
    <AppLayout>
      <Provider store={store}>
      <NavigationContainer>
        <Root_Navigator initialroutereference={user?"Test":"Login"}/>
      {/* <Text>Hello World</Text> */} 
      </NavigationContainer>
      </Provider>
    </AppLayout>
  );
}
