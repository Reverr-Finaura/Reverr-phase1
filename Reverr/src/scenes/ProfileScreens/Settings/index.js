import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {AppColors} from '../../../utils';
import {BackButton} from '../../../Components';
import {TitleCard} from '../../../Components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {styles} from './style';
import {set_allLoaded} from '../../../Redux/actions';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const Settings = props => {
  const navigation = useNavigation();

  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();

  function savedScreen() {
    console.log('pressed');
    navigation.navigate('SavedScreen');
  }

  const logout = async () => {
    await auth()
      .signOut()
      .then(() => {
        console.log('User Signed out!');
        navigation.replace('Login');
      })
      .catch(err => {
        console.log('error in signing out');
      });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <BackButton
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          style={{
            color: AppColors.FontsColor,
            fontFamily: 'Poppins-Regular',
            marginStart: Width / 3.3,
            fontSize: 22,
          }}>
          Settings
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            savedScreen();
          }}
          style={{height: '7%', marginTop: '25%'}}>
          <TitleCard firstText="Saved" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            //if(state.user.userType=='individual'){
            navigation.navigate('EditIndivisualProfile');
            //}else{
            //navigation.navigate('EditMentorProfile')
            //}
          }}
          style={{height: '7%', marginTop: '7%'}}>
          <TitleCard firstText="Edit profile" />
        </TouchableOpacity>
        <TouchableOpacity style={{height: '7%', marginTop: '7%'}}>
          <TitleCard firstText="Change password" />
        </TouchableOpacity>
        <TouchableOpacity style={{height: '7%', marginTop: '7%'}}>
          <TitleCard firstText="Terms and conditions" />
        </TouchableOpacity>
        <TouchableOpacity style={{height: '7%', marginTop: '7%'}}>
          <TitleCard firstText="Contact us" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{height: '7%', marginTop: '7%'}}>
          <TitleCard firstText="Logout" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Calender');
          }}
          style={{height: '7%', marginTop: '7%'}}>
          <TitleCard firstText="Calender" />
        </TouchableOpacity>
        {state && state?.user && state.user.userType && (
          <TouchableOpacity
            onPress={() => {
              //logout();
              //dispatch(set_allLoaded(false))
              navigation.navigate('Rooms');
            }}
            style={{height: '7%', marginTop: '7%'}}>
            <TitleCard firstText="Rooms" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.dp}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: state.user && state.user.image}}
        />
      </View>
    </View>
  );
};

export {Settings};
