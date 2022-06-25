import React from 'react';
import {Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Funding, Home, Learn, Mentor, Room, Plans} from '../../scenes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MentorProfile} from '../../components/Mentor-Profile';

const Tab = createBottomTabNavigator();

export const BottomNavigate = () => {
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
        component={Home}
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
        name="Mentor"
        component={MentorNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 32,
                height: 32,
                marginTop: 8,
                tintColor: focused ? '#0077b7' : 'gray',
              }}
              source={require('../../assets/images/Mentor.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Funding"
        component={Funding}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 32,
                height: 32,
                marginTop: 8,
                tintColor: focused ? '#0077b7' : 'gray',
              }}
              source={require('../../assets/images/Funding.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={Room}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 32,
                height: 32,
                marginTop: 8,
                tintColor: focused ? '#0077b7' : 'gray',
              }}
              source={require('../../assets/images/Room.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={Learn}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 32,
                height: 32,
                marginTop: 8,
                tintColor: focused ? '#0077b7' : 'gray',
              }}
              source={require('../../assets/images/Learn.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export const MentorNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MentorStack" component={Mentor} />
      <Stack.Screen name="MentorProfile" component={MentorProfile} />
      <Stack.Screen name="Plans" component={Plans} />
    </Stack.Navigator>
  );
};
