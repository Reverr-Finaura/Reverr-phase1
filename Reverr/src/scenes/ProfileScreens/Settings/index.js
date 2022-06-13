import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
  import React from 'react';
  import { AppColors } from '../../../utils';
  import { BackButton } from '../../../Components';
  import { TitleCard } from '../../../Components';
  import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { styles } from './style';

  
  const Width = Dimensions.get('screen').width;
  const Height = Dimensions.get('screen').height;
  
  const Settings = props => {
    
    const navigation = useNavigation();
    
    const state=useSelector(state=>state.UserReducer);
    function savedScreen() {
      //navigation.navigate('Saved');
    }


    const logout=async()=>{
       await auth().signOut().then(()=>{
           console.log('User Signed out!');
           navigation.replace('Login')
       }).catch(err=>{
           console.log("error in signing out")
       })
    }
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
              navigation.navigate('EditIndivisualProfile');
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
  