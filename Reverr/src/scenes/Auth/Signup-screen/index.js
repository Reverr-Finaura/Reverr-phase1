import {
<<<<<<< HEAD
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
  } from 'react-native';
  import React, {useState} from 'react';
  import { AppColors } from '../../../utils';
 import { CustomButton,BackButton,InputField } from '../../../Components';
  import firestore from '@react-native-firebase/firestore';
  import {useNavigation} from '@react-navigation/native';
  import emailjs from 'emailjs-com';
  import { styles } from './style';
  const SignupScreen = props => {
    var [isSecure1, setisSecure1] = useState(true);
    var [isSecure2, setisSecure2] = useState(true);
    const [name, setname] = useState('');
    const [nameerror, setnameerror] = useState(false);
    const [email, setemail] = useState('');
    const [emailerror, setemailerror] = useState(false);
    const [password, setpassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState(false);
    const navigation=useNavigation();
    // Get UserType from UserSelectScreen
    const UserType = props?.route?.params?.UserType;
=======
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../../utils';
import {CustomButton, BackButton, InputField} from '../../../components';
import firestore from '@react-native-firebase/firestore';
//import {useNavigation} from '@react-navigation/native';
import emailjs from 'emailjs-com';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
const SignupScreen = props => {
  var [isSecure1, setisSecure1] = useState(true);
  var [isSecure2, setisSecure2] = useState(true);
  const [name, setname] = useState('');
  const [nameerror, setnameerror] = useState(false);
  const [email, setemail] = useState('');
  const [emailerror, setemailerror] = useState(false);
  const [password, setpassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(false);
  const navigation = useNavigation();

  // Get UserType from UserSelectScreen
  const UserType = props?.route?.params?.UserType;

  if (UserType == 'Mentor') {
>>>>>>> ced3a9e4b575f9786bf11919f8c716b8ff4b256b
    var data = {
      userType: UserType,
      Name: name,
      Email: email.trim(),
      Password: password,
      Mobile: mobile,
<<<<<<< HEAD
    }

  
    //console.log(data)
    const IsEmpty = async () => {
      if (name ==='') {
        setnameerror(true);
=======
      availability: [0, 1, 1, 1, 1, 1, 1],
    };
  } else {
    var data = {
      userType: UserType,
      Name: name,
      Email: email.trim(),
      Password: password,
      Mobile: mobile,
    };
  }

  //console.log(data)
  const IsEmpty = async () => {
    if (name === '') {
      setnameerror(true);
    } else {
      if (email === '') {
        setemailerror(true);
>>>>>>> ced3a9e4b575f9786bf11919f8c716b8ff4b256b
      } else {
        if (password == '') {
          setPasswordError(true);
        } else {
          if (ConfirmPassword == '') {
            setConfirmPasswordError(true);
          } else {
            if (mobile == '') {
              setMobileError(true);
            } else {
              if (password != ConfirmPassword) {
                alert('Password not matched!!');
              } else {
                const savedUser = await firestore()
                  .collection('Users')
                  .doc(email)
                  .get();
                if (savedUser._data != undefined) {
                  alert('user already exists with that email');
                } else {
<<<<<<< HEAD
  
                  const savedUser = await firestore()
                    .collection('Users')
                    .doc(email)
                    .get();
                  if (savedUser._data != undefined) {
                    alert('user already exists with that email');
                  } else {
                    var OTP = EmailOtp();
                    alert('Please check your inbox');
                    navigation.navigate('OtpVerification', {
                      OTP: OTP,
                      Email: email.trim(),
                      Password: password,
                      Name: name,
                      Mobile: mobile,
                      UserType: UserType,
                      redirect_screen:'Test'
                    });
                    setname('');
                    setemail('');
                    setpassword('');
                    setConfirmPassword('');
                    setMobile('');
                  }
=======
                  var OTP = EmailOtp();
                  alert('Please check your inbox');
                  // navigation.navigate('emailVerify', {
                  //   OTP: OTP,
                  //   Email: email.trim(),
                  //   Password: password,
                  //   Name: name,
                  //   Mobile: mobile,
                  //   UserType: UserType,
                  // });
                  setname('');
                  setemail('');
                  setpassword('');
                  setConfirmPassword('');
                  setMobile('');
>>>>>>> ced3a9e4b575f9786bf11919f8c716b8ff4b256b
                }
              }
            }
          }
        }
      }
    }
  };

  const EmailOtp = () => {
    const OTP = Math.floor(Math.random() * 1000000 + 1);
    const msg = 'Your OTP for verification is ' + OTP;

    var templateParams = {
      name: data.Name,
      email: data.Email,
      subject: 'OTP for account verification',
      message: msg,
    };
<<<<<<< HEAD
  
    const EmailOtp = () => {
      const OTP = Math.floor(Math.random() * 1000000 + 1);
      const msg = 'Your OTP for verification is ' + OTP;
  
      var templateParams = {
        name: data.Name,
        email: data.Email,
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
=======
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

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <View style={{marginTop: 10}}>
          <BackButton IconSize={30} />
        </View>
        <ScrollView>
          <View style={styles.pageInfo}>
            <Text
              style={[
                styles.Text,
                {fontSize: 24, color: AppColors.FontsColor, marginBottom: 5},
              ]}>
              Signup
            </Text>
            <Text
              style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
              Enter your basic information below{' '}
            </Text>
          </View>
          <View style={{paddingVertical: '5%', paddingHorizontal: '2%'}}>
            <InputField
              iconName="user"
              placeholder="Your Name"
              size={35}
              value={name}
              error={nameerror}
              onChangeText={n => {
                setname(n);
                if (n != '') {
                  setnameerror(false);
                }
>>>>>>> ced3a9e4b575f9786bf11919f8c716b8ff4b256b
              }}
              style={styles.inputstyle}
              Title="Name"
            />
            <InputField
              iconName="envelope"
              placeholder="Enter email"
              size={25}
              value={email}
              error={emailerror}
              onChangeText={e => {
                setemail(e.toLowerCase());
                if (e != '') {
                  setemailerror(false);
                }
              }}
              style={styles.inputstyle}
              Title="Email Adress"
            />
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
              showIcon={isSecure1 ? 'eye-slash' : 'eye'}
              Eyelick={() => {
                setisSecure1(prev => !prev);
              }}
              showIconolor={AppColors.infoFonts}
              showIconsize={25}
              style={styles.inputstyle}
              placeholder="Create password"
              Title="Password"
            />
            <InputField
              iconName="lock"
              size={35}
              value={ConfirmPassword}
              error={confirmPasswordError}
              onChangeText={p2 => {
                setConfirmPassword(p2);
                if (p2 !== '') {
                  setConfirmPasswordError(false);
                }
              }}
              style={styles.inputstyle}
              secureTextEntry={isSecure2}
              showIcon={isSecure2 ? 'eye-slash' : 'eye'}
              Eyelick={() => {
                setisSecure2(prev => !prev);
              }}
              showIconolor={AppColors.infoFonts}
              showIconsize={25}
              placeholder="**********"
              Title=" Confirm Password"
            />
            <InputField
              iconName="mobile"
              placeholder="Your Mobile Number"
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
              Title="Mobile Number"
            />
          </View>
          <View style={{paddingVertical: '5%'}}>
            <CustomButton
              Title="Create Account"
              onPress={() => navigation.navigate('onboarding')}
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
                  //navigation.navigate('Login');
                }}>
                <Text
                  style={{
                    color: AppColors.FontsColor,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Login Now!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export {SignupScreen};
