import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import ThanksScreen from '../../scenes/thanks-screen';
import {
  ForgotPassword,
  IndividuaProfile,
  StartLogin,
  LoginViaEmail,
  LoginViaPhone,
  OtpScreen,
  ResetPassword,
  SignupForm,
  StartSignup,
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
  PremiumPlans,
  OnBoarding,
  SplashFirst,
  SplashSecond,
  SplashThird,
  PersonalProfile,
  NewsDetails,
  TermConditions,
  FundingForm,
  Notifications,
  Requests,
  EditCalender,
  ViewProfile,
  CountdownTimer,
  LikeScreen,
  MentorList,
  StartupVerification,
  ScheduleAppointment,
  Webview,
  Rooms,
  EduAndExp,
  LookingFor,
  Intrest,
  Social,
} from '../../scenes';
import {BottomNavigate, MentorNavigator} from '../BottomNavigate';
import {ArticalDetails} from '../../scenes';
import {MentorBottomTab} from '../MentorBottomTab';
import {MentorDetails} from '../../Components';
import {DrawerNavigation} from '../drawerNavigation';
import {MatchScreen} from '../../scenes/MatchScreen';
import {CourseList} from '../../scenes/learn-screen';
import {VibeBoarding} from '../../Components/VibeBoarding';
import {ShowMoreVibe} from '../../scenes/ShowMoreVibe';
import {ChangePassword} from '../../scenes/ChangePassword';
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
      <Stack.Screen name="PersonalProfile" component={PersonalProfile} />
      <Stack.Screen name="Thanks" component={ThanksScreen} />
      <Stack.Screen name="Login" component={StartLogin} />
      <Stack.Screen name="eduAndexp" component={EduAndExp} />
      <Stack.Screen name="lookingfor" component={LookingFor} />
      <Stack.Screen name="intrest" component={Intrest} />
      <Stack.Screen name="social" component={Social} />
      <Stack.Screen name="LoginViaPhone" component={LoginViaPhone} />
      <Stack.Screen name="LoginViaEmail" component={LoginViaEmail} />
      <Stack.Screen name="SignUp" component={StartSignup} />
      <Stack.Screen name="SignUpForm" component={SignupForm} />
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
      <Stack.Screen
        name="scheduleappointment"
        component={ScheduleAppointment}
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
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="premiumPlans" component={PremiumPlans} />
    </Stack.Navigator>
  );
};

export {StackNavigate};
