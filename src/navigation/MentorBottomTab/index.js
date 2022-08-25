import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppoinmentScreen, DashBoard, MentorHomeScreen} from '../../scenes';
import {EditCalender} from '../../scenes';
import {Test} from '../../scenes';
import {Messages} from '../../scenes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();

export const MentorBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 2,
          borderTopColor: 'gray',
          backgroundColor: '#012437',
          height: 64,
        },
        tabBarLabelStyle: {
          marginBottom: 10,
        },
        tabBarActiveTintColor: '#0077b7',
      }}>
      <Tab.Screen
        name="Home"
        component={MentorHome}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 32,
                height: 32,
                marginTop: 8,
                tintColor: focused ? '#0077b7' : 'gray',
              }}
              source={require('../../assets/images/Home.png')}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Dashboard"
        component={DashBoard}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 32,
                height: 32,
                marginTop: 8,
                tintColor: focused ? '#0077b7' : 'gray',
              }}
              source={require('../../assets/images/GraduationCap.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Appoinment"
        component={AppoinmentScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 32,
                height: 32,
                marginTop: 8,
                tintColor: focused ? '#0077b7' : 'gray',
              }}
              source={require('../../assets/images/appointment.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calender"
        component={EditCalender}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 32,
                height: 32,
                marginTop: 8,
                tintColor: focused ? '#0077b7' : 'gray',
              }}
              source={require('../../assets/images/CalendarBlank.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export const MentorHome = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DashBoard" component={MentorHomeScreen} />
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
};
