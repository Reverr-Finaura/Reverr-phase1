import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {BackButton, CustomButton} from '../../../Components/index';
import {AppColors} from '../../../utils';
import {styles} from './style';
import firestore from '@react-native-firebase/firestore';
import emailjs from 'emailjs-com';
import auth from '@react-native-firebase/auth';

//import {sendPasswordResetEmail} from '@react-native-firebase/auth';
const ForgotPassword = ({navigation}) => {
  const [email, setemail] = useState('');
  var Name = '';
  var forgotPassword = async email => {
    console.log(email);
    await auth()
      .sendPasswordResetEmail(email)
      .then(user => {
        alert('Check your inbox!');
        console.log('mail sent to: ' + user);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const EmailOtp = () => {
    const OTP = Math.floor(Math.random() * 1000000 + 1);
    const msg = 'Your OTP for verification is ' + OTP;

    var templateParams = {
      name: Name,
      email: email,
      subject: 'OTP for account verification',
      message: msg,
    };
    emailjs.init('user_FR6AulWQMZry87FBzhKNu');
    emailjs
      .send('service_lfmmz8k', 'template_6lqwjap', templateParams)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(templateParams, 'send email');

    return OTP;
  };
  // console.log(Name);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <View style={{marginTop: 10}}>
          <BackButton
            IconSize={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.pageInfo}>
          <Text
            style={[
              styles.Text,
              {fontSize: 24, color: AppColors.FontsColor, marginBottom: 13},
            ]}>
            Forgot Password
          </Text>
          <Text
            style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
            Please receive your password reset{' '}
          </Text>
          <Text
            style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
            instructions
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.inputHeader}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Your email/Phone no."
            placeholderTextColor={AppColors.infoFonts}
            onChangeText={e => {
              setemail(e);
            }}
            value={email}
          />
          <CustomButton
            Title="Send Password"
            style={{marginTop: 20}}
            onPress={async () => {
              const savedUser = await firestore()
                .collection('Users')
                .doc(email)
                .get();
              //console.log(savedUser)
              if (savedUser._data === undefined) {
                alert('Wrong mail Id');
              } else {
                Name = savedUser._data.name;
                var password = savedUser._data.password;
                //var OTP = EmailOtp();
                //alert('Please check your inbox');
                // navigation.navigate('OtpVerification', {
                //   Otp: OTP,
                //   Email: email,
                //   Password: password,
                //   redirect_screen:"Login"
                // });
                await forgotPassword(email);
                //alert('check your inbox')
                //setemail('');
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.replace('Login');
            }}>
            <Text
              style={[
                styles.inputHeader,
                {fontSize: 12, alignSelf: 'center', marginTop: 20},
              ]}>
              I remember the password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export {ForgotPassword};
