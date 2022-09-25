import {View, Text, Dimensions, Appearance} from 'react-native';
import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {BottomNavigate} from '../BottomNavigate';
import {DrawerContent} from '../../Components';

const h = Dimensions.get('window').height;

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  return (
    <Drawer.Navigator
      initialRouteName="drawer"
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: 'transparent',
          width: '69%',
          justifyContent: 'center',
        },
      }}>
      <Drawer.Screen name=" drawer" component={BottomNavigate} />
    </Drawer.Navigator>
  );
};

export {DrawerNavigation};
