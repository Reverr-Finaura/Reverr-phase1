import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppColors} from '../utils/Constants';
import InputField from '../Components/InputField';
import CustomButton from '../Components/Buttons/CustomButton';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  var [isSecure, setisSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [emailerror, setemailerror] = useState(false);
  const [passerror, setpasserror] = useState(false);
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <View style={styles.pageInfo}>
          <Text
            style={[
              styles.Text,
              {
                fontSize: 28,
                fontFamily: 'Poppins-Regular',
                color: AppColors.FontsColor,
                marginBottom: 13,
              },
            ]}>
            Login
          </Text>
          <Text
            style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
            Welcome back!
          </Text>
          <Text
            style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
            Please login to continue
          </Text>
          {/*  <AlertBox text="dhruv" /> */}
        </View>
        <View style={{marginTop: Height / 20}}>
          <InputField Title="Email Adress / Phone" />
          <InputField
            Title="Password"
            secureTextEntry={isSecure}
            Eyelick={() => setisSecure(!isSecure)}
            PasswordIcon={isSecure ? 'eye-slash' : 'eye'}
          />
          <CustomButton Title="Login" style={{marginTop: '16%'}} />
          <TouchableOpacity
            style={styles.forgetpass}
            onPress={() => {
              //navigation.navigate('Forgotp');
            }}>
            <Text style={styles.fg}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signuplink}>
          <Text
            style={{color: AppColors.infoFonts, fontFamily: 'Poppins-Regular'}}>
            Don’t have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('onboarding');
            }}>
            <Text
              style={{
                color: AppColors.FontsColor,
                fontFamily: 'Poppins-Regular',
              }}>
              Sign up!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    backgroundColor: AppColors.primarycolor,
  },
  pageInfo: {
    marginTop: '2%',
  },
  Text: {
    marginEnd: '40%',
  },
  forgetpass: {
    marginTop: '10%',
    alignItems: 'center',
  },
  fg: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  signuplink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20%',
    justifyContent: 'center',
  },
});

export default LoginScreen;
