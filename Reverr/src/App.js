/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React,{useEffect,useState} from 'react';
//import { Root_Navigator } from './Navigator';
import { StackNavigate } from './navigation/StackNavigate';
import { Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
//import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {AppLayout} from './layouts';

export default function App() {
  const [user,setUser]=useState();
  const [initializing,setInitializing]=useState(true);
  //const dispatch=useDispatch();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
  }, []);
  if(initializing){
    console.log("null")
    return null;
  }
  return (
    <AppLayout>
      {/* <Text style={{color:"white"}}>Hello</Text> */}
      <Provider store={store}>
        {/* <Text>Hello</Text> */}
      <NavigationContainer> 
      <StatusBar backgroundColor={'#000c12'} />
        {/* <Root_Navigator/> */}
        <StackNavigate/>
      {/* <Text>Hello World</Text> */} 
      </NavigationContainer>
      </Provider>
    </AppLayout>
  );
}
