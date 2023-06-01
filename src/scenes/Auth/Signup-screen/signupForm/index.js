import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../../../utils';
import {CustomButton, BackButton, InputField} from '../../../../Components';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import emailjs from 'emailjs-com';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DDMMYYYY} from '../../../../utils/Helper/helper';
import axios from 'axios'

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const SignupForm = props => {
  var [isSecure1, setisSecure1] = useState(true);
  var [isSecure2, setisSecure2] = useState(true);
  const [name, setname] = useState('');
  const [code, setcode] = useState('');
  const [nameerror, setnameerror] = useState(false);
  const [email, setemail] = useState('');
  const [emailerror, setemailerror] = useState(false);
  const [password, setpassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [dob, setDob] = useState('');
  const [dobError, setDobError] = useState(false);
  const navigation = useNavigation();
  // Get UserType from UserSelectScreen
  const UserType = props?.route?.params?.UserType;
  var data = {
    userType: UserType,
    Name: name,
    Email: email.trim(),
    Password: password,
    Mobile: mobile,
  };

  const signup = async () => {
    console.log(nameerror);
    // console.log('i ma enpty');
    if (name === '') {
      setnameerror(true);
      return;
    }
    if (email === '') {
      setemailerror(true);
      return;
    }
    if (mobile === '') {
      setMobileError(true);
      return;
    }
    if (dob === '') {
      setDobError(true);
      return;
    }
    if (password === '') {
      setPasswordError(true);
      return;
    }
    if (confirmPassword === '') {
      setConfirmPasswordError(true);
      return;
    }
    if (password != confirmPassword) {
      alert('password not matched');
      return;
    }
    setLoading(true);
    const savedUser = await firestore().collection('Users').doc(email).get();
    if (savedUser._data != undefined) {
      setLoading(false);
      alert('user already exists with that email');
    } else {
      var OTP = EmailOtp();
      await SendSMS(OTP);
      //alert('Please check your inbox');
      setLoading(false);
      navigation.navigate('OtpVerification', {
        OTP: OTP,
        Email: email.toLowerCase().trim(),
        Password: password,
        Name: name.toLowerCase(),
        Mobile: mobile,
        Dob: DDMMYYYY(dob),
        UserType: UserType,
      });
      setname('');
      setemail('');
      setpassword('');
      setConfirmPassword('');
      setMobile('');
      setDob('');
    }
  };

  const EmailOtp = () => {
    const OTP = Math.floor(Math.random() * 90000) + 10000;
    const msg = 'Your OTP for verification is ' + OTP;

    var templateParams = {
      from_name: 'Reverr',
      to_name: data.Name,
      to_email: data.Email,
      otp: OTP,
    };
    emailjs.init('dVExxiI8hYMCyc0sY');
    emailjs
      .send('service_lfmmz8k', 'template_n3pcht5', templateParams)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(templateParams, 'send email');

    return OTP;
  };

  const SendSMS = async (OTP)=>{
    const res = await axios.post("https://server.reverr.io/sendSmsCode", {
      to: data.Mobile,
      message: `Your Reverr Signup OTP is ${OTP}`,
      code: code
    });
    console.log("otpMobile SUCCESS!",res)
  }
  // const EmailOtp = () => {
  //   const OTP = Math.floor(Math.random() * 100000 + 1);
  //   const msg = 'Your OTP for verification is ' + OTP;

  //   var templateParams = {
  //     name: data.Name,
  //     email: data.Email,
  //     subject: 'OTP for account verification',
  //     message: msg,
  //   };
  //   emailjs.init('user_FR6AulWQMZry87FBzhKNu');
  //   emailjs
  //     .send('service_lfmmz8k', 'template_6lqwjap', templateParams)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   console.log(templateParams, 'send email');

  //   return OTP;
  // };

  return (
    <View style={{flex: 1}}>
      <LinearGradient colors={['#070972', '#0C0C0D']} style={styles.screen}>
        <View style={{paddingVertical: '3%'}}>
          <BackButton />
        </View>
        <Modal
          visible={loading}
          onRequestClose={() => {
            setLoading(false);
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
                width: '35%',
                height: '17%',
                borderRadius: 20,
              }}>
              <ActivityIndicator size="large" color={AppColors.buttonColor} />
            </View>
          </View>
        </Modal>
        {showPicker && (
          <DateTimePicker
            value={dob == '' ? new Date() : new Date(dob)}
            mode={'date'}
            maximumDate={new Date()}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={(event, value) => {
              setDob(value);
              setShowPicker(false);
            }}
            textColor={AppColors.secondry}
          />
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Sign Up</Text>
          <Text
            style={{
              color: AppColors.BtnClr,
              textAlign: 'center',
              marginVertical: '2%',
            }}>
            Enter your Information
          </Text>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: Width / 1.3, height: Height / 2.6}}
              source={require('../../../../assets/images/illustration/signupf.png')}
            />
          </View>
          <View style={{paddingHorizontal: '3%'}}>
            <InputField
              placeholder="Enter Full Name"
              size={25}
              value={name}
              error={nameerror}
              onChangeText={e => {
                setname(e);
                if (e != '') {
                  setnameerror(false);
                }
              }}
              style={styles.inputstyle}
              Title="Full Name"
            />

            <InputField
              placeholder="Enter Your Email Id"
              size={25}
              value={email}
              error={emailerror}
              onChangeText={e => {
                setemail(e);
                if (e != '') {
                  setemailerror(false);
                }
              }}
              style={styles.inputstyle}
              Title="Email Address"
            />

            <InputField
              iconName="mobile"
              placeholder="Enter Your Phone Number"
              size={45}
              value={mobile}
              error={mobileError}
              onChangeText={m => {
                setMobile(m);
                if (m != '') {
                  setMobileError(false);
                }
              }}
              maxLength={10}
              style={styles.inputstyle}
              keyboardType="number-pad"
              Title="Phone Number"
            />
            <InputField
              iconName="Code"
              placeholder="Enter Your Country code like 91 for India"
              size={45}
              value={code}
              error={mobileError}
              onChangeText={m => {
                setcode(m);
                if (m != '') {
                  setMobileError(false);
                }
              }}
              maxLength={10}
              style={styles.inputstyle}
              keyboardType="number-pad"
              Title="Country Code"
            />
            <View style={{marginTop: '3%'}}>
              <Text
                style={{
                  color: AppColors.FontsColor,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  paddingVertical: '3%',
                }}>
                Date Of Birth
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowPicker(true);
                  setDobError(false);
                }}
                activeOpacity={0.6}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: '3.5%',
                  borderRadius: 6,
                  paddingHorizontal: '4%',
                  borderWidth: dobError ? 2 : 0,
                  borderColor: dobError ? 'red' : AppColors.FontsColor,
                  backgroundColor: AppColors.FontsColor,
                  justifyContent: 'space-between',
                }}>
                {dob == '' ? (
                  <Text>Date Of Birth</Text>
                ) : (
                  <Text style={{color: AppColors.primarycolor}}>
                    {DDMMYYYY(dob).toString()}
                  </Text>
                )}
                <Icon name="calendar-outline" size={25} />
              </TouchableOpacity>
            </View>
            <InputField
              iconName="lock"
              size={35}
              value={password}
              error={passwordError}
              onChangeText={p1 => {
                setpassword(p1);
                if (p1 != '') {
                  setPasswordError(false);
                }
              }}
              secureTextEntry={isSecure1}
              PasswordIcon={isSecure1 ? 'eye-slash' : 'eye'}
              Eyelick={() => {
                setisSecure1(prev => !prev);
              }}
              style={styles.inputstyle}
              placeholder="Create password"
              Title="Password"
            />
            <InputField
              size={35}
              value={confirmPassword}
              error={confirmPasswordError}
              onChangeText={p2 => {
                setConfirmPassword(p2);
                if (p2 !== '') {
                  setConfirmPasswordError(false);
                }
              }}
              style={styles.inputstyle}
              secureTextEntry={isSecure2}
              PasswordIcon={isSecure2 ? 'eye-slash' : 'eye'}
              Eyelick={() => {
                setisSecure2(prev => !prev);
              }}
              showIconsize={25}
              placeholder="**********"
              Title=" Confirm Password"
            />
          </View>
          <View style={{paddingVertical: '5%'}}>
            <CustomButton
              Title="Create Account"
              onPress={() => {
                signup();
              }}
              style={{marginTop: 10}}
            />
            <View style={styles.signuplink}>
              <Text
                style={{
                  color: AppColors.infoFonts,
                  fontFamily: 'Poppins-Regular',
                }}>
                Already a user?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('login');
                }}>
                <Text
                  style={{
                    color: AppColors.buttonColor,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export {SignupForm};
