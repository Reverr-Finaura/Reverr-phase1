import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  StartupVerification,
  SplashFirst,
  SplashSecond,
  SplashThird,
  ProfileSetUp,
  Plans,
  Rooms,
  NewsDetails,
  Webview,
  FundingForm,
  OnBoarding,
  TermConditions,
  DashBoard,
  EditCalender,
  Notifications,
  MentorList,
  ViewProfile,
  Requests,
  CountdownTimer,
} from '../../scenes';
import ThanksScreen from '../../scenes/thanks-screen';
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
  CreatePost,
  CommentsScreen,
  CalanderScreen,
  AddedMentors,
  IntroSplash,
  SavedScreen,
  StartCourse,
  ReadingInstruction,
  Courses,
  OpenBook,
  Home,
  ChatScreen,
  VideoCall,
  CalanderAppointments,
} from '../../scenes';
import {BottomNavigate, MentorNavigator} from '../BottomNavigate';
import {ArticalDetails} from '../../scenes';
import {MentorBottomTab} from '../MentorBottomTab';
import {MentorDetails} from '../../Components';
import {DrawerNavigation} from '../drawerNavigation';
import {MatchScreen} from '../../scenes/MatchScreen';
import {CourseList} from '../../scenes/learn-screen';
import {VibeBoarding} from '../../Components/VibeBoarding';
import { ShowMoreVibe } from '../../scenes/ShowMoreVibe';
import { LikeScreen } from '../../scenes/LikesScreen';
const Stack = createNativeStackNavigator();

const StackNavigate = props => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="IntroSplash">
      <Stack.Screen
        name="StartupVerification"
        component={StartupVerification}
      />
      {/* <Stack.Screen name="home" component={Home} /> */}
      <Stack.Screen name="IndividualTab" component={DrawerNavigation} />
      <Stack.Screen name="onBoarding" component={OnBoarding} />
      <Stack.Screen name="Splash1" component={SplashFirst} />
      <Stack.Screen name="Splash2" component={SplashSecond} />
      <Stack.Screen name="Splash3" component={SplashThird} />
      <Stack.Screen name="ProfileSetUp" component={ProfileSetUp} />
      <Stack.Screen name="Thanks" component={ThanksScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="OtpVerification" component={OtpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="IndividualProfile" component={IndividuaProfile} />
      <Stack.Screen name="MentorProfile" component={MentorProfile} />
      <Stack.Screen name="Mentor" component={BottomNavigate} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="SavedScreen" component={SavedScreen} />
      <Stack.Screen name="EditIndivisualProfile" component={EditProfile} />
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="comments" component={CommentsScreen} />
      <Stack.Screen name="Calender" component={CalanderScreen} />
      <Stack.Screen name="AddedMentors" component={AddedMentors} />
      <Stack.Screen name="IntroSplash" component={IntroSplash} />
      <Stack.Screen name="ArticalDetails" component={ArticalDetails} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
      <Stack.Screen name="WebView" component={Webview} />
      <Stack.Screen name="StartCourse" component={StartCourse} />
      <Stack.Screen name="Instruction" component={ReadingInstruction} />
      <Stack.Screen name="OpenBook" component={OpenBook} />
      <Stack.Screen name="TermConditions" component={TermConditions} />
      <Stack.Screen name="FundingForm" component={FundingForm} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="Notification" component={Notifications} />
      <Stack.Screen name="VideoCall" component={VideoCall} />
      <Stack.Screen name="MentorList" component={MentorList} />
      <Stack.Screen name="MentorDetails" component={MentorDetails} />
      <Stack.Screen name="Requests" component={Requests} />
      <Stack.Screen
        name="CalanderAppointments"
        component={CalanderAppointments}
      />
      <Stack.Screen name="EditCalender" component={EditCalender} />
      {/* <Stack.Screen name="Messages" component={}/> */}
      <Stack.Screen name="MentorBottomTab" component={MentorBottomTab} />
      <Stack.Screen name="videoCall" component={VideoCall} />
      <Stack.Screen name="MatchScreen" component={MatchScreen} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="Countdown" component={CountdownTimer} />
      <Stack.Screen name="VibeBoarding" component={VibeBoarding} />
      <Stack.Screen name="LikeScreen" component={LikeScreen} />
      <Stack.Screen name="ShowMoreVibe" component={ShowMoreVibe} />
    </Stack.Navigator>
  );
};

export {StackNavigate};
