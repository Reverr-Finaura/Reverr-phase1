import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../../utils';
import {CustomButton, BackButton} from '../../../Components/index';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const OtpScreen = props => {
  const navigation = useNavigation();
  const [otp, setOtp] = React.useState('');
  const Otp = props?.route?.params?.OTP;
  //weather via forgot password or signup
  const redirect_screen = props?.route?.params?.redirect_screen;
  const Email = props?.route?.params?.Email;
  const Password = props?.route?.params?.Password;
  const [isUserSignedUp, setIsUserSignedUp] = useState(true);
  const SignUpUser = async () => {
    setIsUserSignedUp(false);
    await auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then(async () => {
        console.log('User account created & signed in!');
        await firestore()
          .collection('Users')
          .doc(Email)
          .set({
            Appointement_request: [],
            saved: [],
            rating: 0,
            availability: [0, 1, 1, 1, 1, 1, 1],
            email: '',
            name: Email,
            password: Password,
            about: '',
            totalRating: 0,
            userType: props.route.params.userType
              ? props.route.params.userType
              : '',
            notification: [],
            experience: '',
            image: '',
            experience: '',
            industry: '',
            linkedin: '',
            orders: [],
            reviews: [],
          })
          .then(() => {
            setIsUserSignedUp(true);
            navigation.replace(redirect_screen);
          })
          .catch(e => {
            setIsUserSignedUp(true);
            alert(e);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('That email address is invalid!');
        }
        setIsUserSignedUp(true);
        console.error(error);
      });
  };
  if (!isUserSignedUp) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }
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
            Confirmation
          </Text>
          <Text
            style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
            Please enter the vertification code{' '}
          </Text>
          <Text
            style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
            from the email we just send you
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.inputHeader}>OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="code"
            placeholderTextColor={AppColors.infoFonts}
            onChangeText={o => {
              setOtp(o);
            }}
            maxLength={6}
            keyboardType="number-pad"
          />
          <CustomButton
            Title="Confirm"
            style={{marginTop: 20}}
            onPress={async () => {
              if (Otp != otp) {
                console.log(Otp);
                console.log(otp);
                alert('wrong otp');
              } else {
                const response = await SignUpUser(Email, Password);
              }
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <Text
              style={{
                color: AppColors.infoFonts,
                fontFamily: 'Poppins-Regular',
                fontSize: 13,
              }}>
              Don’t get it?{' '}
            </Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputHeader}>OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="code"
              placeholderTextColor={AppColors.infoFonts}
              onChangeText={o => {
                setOtp(o);
              }}
              maxLength={6}
              keyboardType="number-pad"
            />
            <CustomButton
              Title="Confirm"
              style={{marginTop: 20}}
              onPress={async () => {
                if (Otp != otp) {
                  console.log(Otp);
                  console.log(otp);
                  alert('wrong otp');
                } else {
                  const response = await SignUpUser(Email, Password);
                }
              }}
            />
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginStart: -20,
              }}>
              <Text style={[styles.inputHeader, {fontSize: 13}]}>
                Resend code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export {OtpScreen};
