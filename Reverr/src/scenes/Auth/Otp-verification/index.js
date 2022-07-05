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
import { useDispatch } from 'react-redux';
import { add_user } from '../../../Redux/actions';

const OtpScreen = props => {
  const navigation = useNavigation();
  const [otp, setOtp] = React.useState('');
  const Otp = props?.route?.params?.OTP;
  //weather via forgot password or signup
  const Name=props?.route?.params?.Name;
  const Mobile=props?.route?.params?.Mobile;
  const Email = props?.route?.params?.Email;
  const Password = props?.route?.params?.Password;
  const dispatch=useDispatch();
  const [isUserSignedUp, setIsUserSignedUp] = useState(true);
  const SignUpUser = async () => {
    setIsUserSignedUp(false);
    const user_object={
      Appointement_request: [],
      saved: [],
      rating: 0,
      email: Email,
      name: Name,
      password: Password,
      about: '',
      totalRating: 0,
      userType:'Individual',
      notification: [],
      experience: '',
      image: 'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6',
      experience: '',
      industry: '',
      linkedin: '',
      orders: [],
      reviews: [],
      phone:Mobile
    }
    console.log(user_object);
    await auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then(async () => {
        console.log('User account created & signed in!');
        await firestore()
          .collection('Users')
          .doc(Email)
          .set(user_object)
          .then(() => {
            setIsUserSignedUp(true);
            //console.log(user)
            
            navigation.navigate('onBoarding',{
              Email:Email,
              user_object:user_object
          })})

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
        <ActivityIndicator size="large" color="#fff" />
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
          
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export {OtpScreen};
