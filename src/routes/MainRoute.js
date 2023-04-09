import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Image, StyleSheet, Platform} from 'react-native';
import Home from '../screens/Tabs/Home';
import Mentor from '../screens/Tabs/Mentor';
import Funds from '../screens/Tabs/Funds';
import Learn from '../screens/Tabs/Learn';
import Theme from '../utils/Theme';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import Business from '../screens/MentorsList';
import ScheduleSession from '../screens/ScheduleSession';
import Premium from '../screens/Premium';
import CustomDrawer from '../Components/components/CustomDrawer';

//drawer screens
import Info from '../screens/Drawer/Info';
import Calendar from '../screens/Drawer/Calendar';
import MyCourses from '../screens/Drawer/MyCourses';
import MyBooks from '../screens/Drawer/MyBooks';
import Settings from '../screens/Drawer/Settings';
import {
  CalanderAppointments,
  ChatScreen,
  ChatVibeScreen,
  CommentsScreen,
  CreatePost,
  EditProfile,
  IntroSplash,
  LearnScreen,
  LikeScreen,
  LoginViaEmail,
  LoginViaPhone,
  MentorList,
  Messages,
  NewsDetails,
  OpenBook,
  Plans,
  PremiumPlans,
  ReadingInstruction,
  Requests,
  StartCourse,
  StartLogin,
  Vibe,
} from '../scenes';
import MentorsList from '../screens/MentorsList';
import ProfileSettings from '../screens/Drawer/Settings';
import NewVibe from '../screens/Tabs/Vibe';
import OthersProfile from '../screens/OthersProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="introSplash">
        <Stack.Screen
          options={{headerShown: false}}
          name="introSplash"
          component={IntroSplash}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="login"
          component={StartLogin}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="viaEmail"
          component={LoginViaEmail}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="viaPhone"
          component={LoginViaPhone}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="writecomments"
          component={CommentsScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="createpost"
          component={CreatePost}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MyDrawer"
          component={MyDrawer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ChatVibeScreen"
          component={ChatVibeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="LikeScreen"
          component={LikeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {marginLeft: -5, color: '#FFF'},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        options={{
          drawerIcon: () => <Image source={Theme.home} style={styles.icon} />,
          drawerItemStyle: {height: 0},
        }}
        name="Home "
        component={TabView}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image source={Theme.userprofile} style={styles.icon} />
          ),
        }}
        name="Edit Profile"
        component={EditProfile}
      />
      {/* <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image source={Theme.datedot} style={styles.icon} />
          ),
        }}
        name="Calendar"
        component={Calendar}
      /> */}
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image source={Theme.bookmarkline} style={styles.icon} />
          ),
        }}
        name="Saved"
        component={MyCourses}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={Theme.requests}
              style={[styles.icon, {tintColor: 'white'}]}
            />
          ),
        }}
        name="Requests"
        component={Requests}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => <Image source={Theme.info} style={styles.icon} />,
        }}
        name="Info"
        component={Info}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image source={Theme.settings} style={styles.icon} />
          ),
        }}
        name="Settings"
        component={ProfileSettings}
      />
    </Drawer.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeTab"
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Notifications"
        component={Notifications}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OthersProfile"
        component={OthersProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Premium"
        component={Premium}
      />
      <Stack.Screen
        name="newVibes"
        options={{headerShown: false}}
        component={NewVibe}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ChatScreen"
        component={ChatScreen}
      />
      <Stack.Screen
        name="Messages"
        options={{headerShown: false}}
        component={Messages}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ChatVibeScreen"
        component={ChatVibeScreen}
      />
      <Stack.Screen
        name="plans"
        options={{headerShown: false}}
        component={PremiumPlans}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NewsDetails"
        component={NewsDetails}
      />
    </Stack.Navigator>
  );
}

function MentorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="MentorStack"
        component={Mentor}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="mentorslist"
        component={MentorsList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ScheduleSession"
        component={ScheduleSession}
      />
      <Stack.Screen
        name="CalanderAppointments"
        options={{headerShown: false}}
        component={CalanderAppointments}
      />
    </Stack.Navigator>
  );
}

function LearnStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="course"
        component={LearnScreen}
      />
      <Stack.Screen
        name="StartCourse"
        options={{headerShown: false}}
        component={StartCourse}
      />
      <Stack.Screen
        name="Instruction"
        options={{headerShown: false}}
        component={ReadingInstruction}
      />
      <Stack.Screen
        name="OpenBook"
        options={{headerShown: false}}
        component={OpenBook}
      />
    </Stack.Navigator>
  );
}

function TabView() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = focused ? Theme.homeactive : Theme.home;
              break;
            case 'Mentor':
              iconSource = focused ? Theme.mentoractive : Theme.mentor;
              break;
            case 'Vibe':
              iconSource = focused ? Theme.vibeactive : Theme.vibe;
              break;
            case 'Funds':
              iconSource = focused ? Theme.fundsactive : Theme.funds;
              break;
            case 'Learn':
              iconSource = focused ? Theme.learnactive : Theme.learn;
              break;
          }

          return (
            <Image
              source={iconSource}
              style={{width: 28, height: 28, resizeMode: 'contain'}}
            />
          );
        },
        tabBarStyle: [styles.tabbarstyle],
        tabBarActiveTintColor: Theme.primaryColor,
        tabBarLabelStyle: {
          fontFamily: Theme.semi,
          fontSize: 12,
        },
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Mentor"
        component={MentorStack}
      />
      <Tab.Screen options={{headerShown: false}} name="Vibe" component={Vibe} />
      <Tab.Screen
        options={{headerShown: false}}
        name="Funds"
        component={Funds}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Learn"
        component={LearnStack}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabbarstyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 94 : 70,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#031023',
    paddingBottom: Platform.OS === 'android' ? 10 : 25,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});
