import React from 'react';
import { Image } from 'react-native';



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Funding, Home, Learn, Mentor, Room} from '../../scenes'

const Tab = createBottomTabNavigator();

export const BottomNavigate = () =>  {
  return (
    <Tab.Navigator 
    screenOptions={{
    headerShown:false ,
    tabBarStyle:{
    borderTopWidth:2,
    borderTopColor:'gray',
    backgroundColor:"#012437",
    height:64
    },
    tabBarLabelStyle:{
        marginBottom:10
    },
    tabBarActiveTintColor:'#0077b7'
   }}  
    >
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon:({focused}) => (
           <Image 
           style={{
            width:32,
            height:32,
            marginTop:8,
            tintColor: focused ? '#0077b7' : 'gray'
           }}
           source={require('../../assets/images/Home.png')}/>
        )
      }} />
      <Tab.Screen name="Mentor" component={Mentor} 
         options={{
           tabBarIcon:({focused}) => (
         <Image 
           style={{
            width:32,
            height:32,
            marginTop:8,
            tintColor: focused ? '#0077b7' : 'gray'
           }}
           source={require('../../assets/images/Mentor.png')}/>
         )
      }} 
      />
      <Tab.Screen name="Funding" component={Funding}
       options={{
        tabBarIcon:({focused}) => (
      <Image 
        style={{
         width:32,
         height:32,
         marginTop:8,
         tintColor: focused ? '#0077b7' : 'gray'
        }}
        source={require('../../assets/images/Funding.png')}/>
      )
   }} 
      />
      <Tab.Screen name="Rooms" component={Room}
       options={{
        tabBarIcon:({focused}) => (
      <Image 
        style={{
         width:32,
         height:32,
         marginTop:8,
         tintColor: focused ? '#0077b7' : 'gray'
        }}
        source={require('../../assets/images/Room.png')}/>
      )
   }} 
      />
      <Tab.Screen name="Learn" component={Learn} 
       options={{
        tabBarIcon:({focused}) => (
      <Image 
        style={{
         width:32,
         height:32,
         marginTop:8,
         tintColor: focused ? '#0077b7' : 'gray'
        }}
        source={require('../../assets/images/Learn.png')}/>
      )
   }} 
      />

    </Tab.Navigator>
  );
}