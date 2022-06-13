import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../../utils';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {CustomButton, InputField} from '../../../components';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const LoginScreen = () => {
  const [isSecure, setisSecure] = useState(false);
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
              navigation.navigate('signup');
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

export default LoginScreen;
