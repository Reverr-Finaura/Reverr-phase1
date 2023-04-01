import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../../utils';
import {CustomButton, BackButton, OtpInputs} from '../../../Components/index';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';
import {convertSeconds} from '../../../utils/Helper/helper';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const OtpScreen = props => {
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [timeLeft, setTimeLeft] = useState(240);
  const navigation = useNavigation();
  const [otp, setOtp] = React.useState('');
  const Otp = props?.route?.params?.OTP;
  //weather via forgot password or signup
  const Name = props?.route?.params?.Name;
  const Mobile = props?.route?.params?.Mobile;
  const Email = props?.route?.params?.Email;
  const Password = props?.route?.params?.Password;
  const DateOfBirth = props?.route?.params?.Dob;
  const dispatch = useDispatch();
  const [isUserSignedUp, setIsUserSignedUp] = useState(false);

const userDetailsObj = {
  name:Name,
  mobile:Mobile,
  email:Email,
  password:Password,
  dob:DateOfBirth
}

//console.log(DateOfBirth,"dob");
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <LinearGradient colors={['#070972', '#0C0C0D']} style={styles.screen}>
        <BackButton/>
        <Modal
          visible={isUserSignedUp}
          onRequestClose={() => {
            setIsUserSignedUp(false);
          }}
          transparent={true}>
          <View
            style={{
              backgroundColor: 'rgba(1, 1, 1, 0.6)',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                height: '20%',
                borderRadius: 20,
              }}>
              <Text style={{color: AppColors.primarycolor, fontSize: 22}}>
                Verifying...
              </Text>
            </View>
          </View>
        </Modal>
        <Text style={styles.heading}>OTP</Text>
        <Text
          style={{
            color: AppColors.BtnClr,
            textAlign: 'center',
            marginVertical: '2%',
          }}>
          Please enter the OTP sent to your mobile / Email
        </Text>
        <View style={{alignItems: 'center', marginTop: '8%'}}>
          <Image
            style={{width: Width / 1.8, height: Height / 3.1}}
            source={require('../../../assets/images/illustration/otp.png')}
          />
          <OtpInputs
            setPin1={setPin1}
            setPin2={setPin2}
            setPin3={setPin3}
            setPin4={setPin4}
            setPin5={setPin5}
          />

          <Text
            style={{
              color: AppColors.BtnClr,
              textAlign: 'center',
              marginVertical: '2%',
              marginTop: '12%',
            }}>
            Didn’t recieve an OTP?
          </Text>
          {timeLeft == 0 ? (
            <View
              style={{
                marginTop: '5%',
              }}>
              <TouchableOpacity>
                <Text
                  style={{color: AppColors.buttonColor, fontWeight: 'bold'}}>
                  Resend
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                marginTop: '5%',
              }}>
              <Text style={{color: AppColors.buttonColor, fontWeight: 'bold'}}>
                {convertSeconds(timeLeft)}
              </Text>
            </View>
          )}
          <CustomButton
            Title="Submit"
            style={{marginTop: 20}}
            onPress={async () => {
              let enterdOtp = `${pin1}${pin2}${pin3}${pin4}${pin5}`;
              if (Otp != enterdOtp) {
                console.log(Otp);
                console.log(otp);
                alert('wrong otp');
              } else {
                
                navigation.replace("PersonalProfile",{
                  userDetailsObj:userDetailsObj
                })
              }
            }}
          />
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export {OtpScreen};
