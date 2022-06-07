import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  FundingStack,
  HomeStack,
  LearnStack,
  MentorStack,
  RoomsStack,
} from './StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {AppColors} from '../utils/Constants';

const MyTab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <MyTab.Navigator>
        <MyTab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              marginBottom: 7,
              fontFamily: 'Poppins-Bold',
              fontSize: 10,
            },
            tabBarHideOnKeyboard: true,
            tabBarActiveBackgroundColor: AppColors.bottomBg,
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: AppColors.FontsColor,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: 60,
              backgroundColor: AppColors.bottomBg,
            },
            tabBarIcon: tabinfo => {
              return (
                <Icon
                  name="home"
                  size={30}
                  color={tabinfo.focused ? '#40BFFF' : 'gray'}
                  style={{
                    marginTop: 5,
                  }}
                />
              );
            },
          }}
        />
        <MyTab.Screen
          name="MentorTab"
          component={MentorStack}
          options={{
            headerShown: false,
            headerStyle: {
              borderBottomColor: '#D4D4D4',
              borderBottomWidth: 2,
            },
            headerTitleStyle: {
              fontFamily: 'Poppins-Bold',
              color: '#223263',
              marginStart: 20,
              marginTop: 15,
            },
            tabBarLabel: 'Mentor',
            tabBarLabelStyle: {
              marginBottom: 7,
              fontFamily: 'Poppins-Bold',
              fontSize: 10,
            },
            tabBarHideOnKeyboard: true,
            tabBarActiveBackgroundColor: AppColors.bottomBg,
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: AppColors.FontsColor,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: 60,
              backgroundColor: AppColors.bottomBg,
            },
            tabBarIcon: tabinfo => {
              return (
                <Icon2
                  name="user-cog"
                  size={25}
                  color={tabinfo.focused ? '#40BFFF' : '#A6A6A6'}
                  style={{
                    marginTop: 5,
                  }}
                />
              );
            },
          }}
        />
        <MyTab.Screen
          name="FundingTab"
          component={FundingStack}
          options={{
            headerShown: false,
            headerTintColor: 'blue',
            tabBarLabel: 'Funding',
            tabBarLabelStyle: {
              marginBottom: 7,
              fontFamily: 'Poppins-Bold',
              fontSize: 10,
            },
            tabBarHideOnKeyboard: true,
            tabBarActiveBackgroundColor: AppColors.bottomBg,
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: AppColors.FontsColor,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: 60,
              backgroundColor: AppColors.bottomBg,
            },
            tabBarIcon: tabinfo => {
              return (
                <Ionic
                  name="calculator"
                  size={30}
                  color={tabinfo.focused ? '#40BFFF' : '#A6A6A6'}
                  style={{
                    marginTop: 5,
                  }}
                />
              );
            },
          }}
        />
        <MyTab.Screen
          name="RoomTab"
          component={RoomsStack}
          options={{
            headerShown: false,
            headerTintColor: 'blue',
            tabBarLabel: 'Room',
            tabBarLabelStyle: {
              marginBottom: 7,
              fontFamily: 'Poppins-Bold',
              fontSize: 10,
            },
            tabBarHideOnKeyboard: true,
            tabBarActiveBackgroundColor: AppColors.bottomBg,
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: AppColors.FontsColor,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: 60,
              backgroundColor: AppColors.bottomBg,
            },
            tabBarIcon: tabinfo => {
              return (
                <Icon2
                  name="users"
                  size={28}
                  color={tabinfo.focused ? '#40BFFF' : '#A6A6A6'}
                  style={{
                    marginTop: 5,
                  }}
                />
              );
            },
          }}
        />
        <MyTab.Screen
          name="LearnTab"
          component={LearnStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Learn',
            tabBarLabelStyle: {
              marginBottom: 7,
              fontFamily: 'Poppins-Bold',
              fontSize: 10,
            },
            tabBarActiveBackgroundColor: AppColors.bottomBg,
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: AppColors.FontsColor,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: 60,
              backgroundColor: AppColors.bottomBg,
            },
            tabBarIcon: tabinfo => {
              return (
                <Icon2
                  name="graduation-cap"
                  size={28}
                  color={tabinfo.focused ? '#40BFFF' : '#A6A6A6'}
                  style={{
                    marginTop: 5,
                  }}
                />
              );
            },
          }}
        />
      </MyTab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;
