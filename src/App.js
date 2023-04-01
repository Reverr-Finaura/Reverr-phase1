/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StackNavigate } from './navigation/StackNavigate';
import auth from '@react-native-firebase/auth';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
//import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {AppLayout} from './layouts';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { AppColors } from './utils';

const theme = {
  ...DefaultTheme,
};

export default function App() {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  //const dispatch=useDispatch();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) {
    return null;
  }
  return (
    <AppLayout>
      {/* <Text style={{color:"white"}}>Hello</Text> */}
      <Provider store={store}>
        {/* <Text>Hello</Text> */}
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar backgroundColor={AppColors.primarycolor} />
            {/* <Root_Navigator/> */}
            <StackNavigate />
            {/* <Text>Hello World</Text> */}
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </AppLayout>
  );
}




// import React, { useRef, useEffect, useState, } from 'react';
// import { View, Image, Animated, Text, style } from 'react-native';

// const FadeInOutImage = ({ source, style }) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const [fadeIn, setFadeIn] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (fadeIn) {
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 100, // Set the duration of the fade in animation
//           useNativeDriver: true // Add this line to improve performance
//         }).start(() => {
//           setFadeIn(false);
//         });
//       } else {
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 1000, // Set the duration of the fade out animation
//           useNativeDriver: true // Add this line to improve performance
//         }).start(() => {
//           setFadeIn(true);
//         });
//       }
//     }, 500); // Set the interval duration to 2 seconds (1000ms = 1 second)

//     return () => clearInterval(interval);
//   }, [fadeAnim, fadeIn]);

//   return (
//     <Animated.View style={{ ...style, opacity: fadeAnim }}>

//       <Image style={{ alignSelf: "center", justifyContent: "center", resizeMode: "contain", width: "100%", height: "100%" }}
//         source={require('../src/assets/images/loader.png')}


//       />

//     </Animated.View>
//   );
// };

// export default FadeInOutImage;
