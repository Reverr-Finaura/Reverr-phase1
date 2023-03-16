import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../../utils';
import {CustomButton, BackButton, InputField} from '../../../Components';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import emailjs from 'emailjs-com';
import {styles} from './style';

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
  const [loading, setLoading] = useState(false);
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

  //console.log(data)
  const IsEmpty = async () => {
    // console.log('i ma enpty');
    setLoading(true);
    if (name === '') {
      setnameerror(true);
      setLoading(false);
    } else {
      if (password == '') {
        setPasswordError(true);
        setLoading(false);
      } else {
        if (ConfirmPassword == '') {
          setConfirmPasswordError(true);
          setLoading(false);
        } else {
          if (mobile == '') {
            setMobileError(true);
            setLoading(false);
          } else {
            if (password != ConfirmPassword) {
              setLoading(false);
              alert('Password not matched!!');
            } else {
              const savedUser = await firestore()
                .collection('Users')
                .doc(email)
                .get();
              if (savedUser._data != undefined) {
                alert('user already exists with that email');
              } else {
                const savedUser = await firestore()
                  .collection('Users')
                  .doc(email)
                  .get();
                if (savedUser._data != undefined) {
                  setLoading(false);
                  alert('user already exists with that email');
                } else {
                  var OTP = EmailOtp();
                  alert('Please check your inbox');
                  setLoading(false);
                  navigation.navigate('OtpVerification', {
                    OTP: OTP,
                    Email: email.toLowerCase().trim(),
                    Password: password,
                    Name: name.toLowerCase(),
                    Mobile: mobile,
                    UserType: UserType,
                  });
                  setname('');
                  setemail('');
                  setpassword('');
                  setConfirmPassword('');
                  setMobile('');
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
      from_name: "Reverr",
      to_name: data.Name,
      to_email: data.Email,
      otp:OTP,
    };
    emailjs.init('user_FR6AulWQMZry87FBzhKNu');
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

  if (loading == true) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView style={styles.screen}>
        <BackButton
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.inputstyle}
          Title="Sign up"
        />
        <View style={{marginTop: 10}}>
          <InputField
            placeholder="Enter-name"
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
            Title="Name"
          />

          <InputField
            placeholder="Enter email"
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
            PasswordIcon={isSecure2 ? 'eye-slash' : 'eye'}
            Eyelick={() => {
              setisSecure2(prev => !prev);
            }}
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
            onPress={IsEmpty}
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
                navigation.navigate('Login');
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
    </TouchableWithoutFeedback>
  );
};

export {SignupScreen};
