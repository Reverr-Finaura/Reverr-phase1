import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../../utils';
import {InputField} from '../../../Components';
import {CustomButton} from '../../../Components';
import {styles} from './style';
import {useSelector, useDispatch} from 'react-redux';
import {add_user} from '../../../Redux/actions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const LoginScreen = ({navigation}) => {
  var [isSecure, setisSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [emailerror, setemailerror] = useState(false);
  const [passerror, setpasserror] = useState(false);
  const [password, setPassword] = useState('');
  const [serverError, SetServerError] = useState('');
  const [userLogedin, setUserLogedin] = useState(true);

  var dispatch = useDispatch();
  const loginUser = async (email, password) => {
    var user_request_obj = {
      success: false,
      failiure: false,
      failiure_message: null,
      userType: 'Individual',
    };

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      if (e.code === 'auth/wrong-password') {
        //alert('Wrong password try again!');
        user_request_obj.failiure = true;
        user_request_obj.failiure_message = 'Wrong Password try again!';
        return user_request_obj;
        //console.log("Wrong password try again")
      }
      if (e.code === 'auth/user-not-found') {
        user_request_obj.failiure = true;
        user_request_obj.failiure_message =
          'No user registered with this email!';
        return user_request_obj;
      }
    }
    const savedUser = await firestore().collection('Users').doc(email).get();
    console.log('Its a :' + savedUser._data.userType);
    dispatch(add_user(savedUser._data));
    user_request_obj.success = true;
    user_request_obj.userType = savedUser._data.userType;
    console.log(savedUser);
    return user_request_obj;
  };

  const IsEmpty = async () => {
    if (!email) {
      setemailerror(true);
    } else {
      if (!password) {
        setpasserror(true);
      } else {
        //setUserLogedin(false);
        setUserLogedin(false);
        var response = await loginUser(email.trim(), password);
        console.log(response);
        if (response.success == true) {
          setUserLogedin(true);
          if (response.userType == 'Individual') {
            return navigation.replace('IndividualTab');
          } else {
            console.log("I am an Mentor")
            return navigation.replace('EditCalender');
          }
        } else if (response.failiure == true) {
          setUserLogedin(true);
          alert('Invalid Credentials!');
          //navigation.replace('Login')
        }
      }
    }
  };

  if (!userLogedin) {
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
        <View style={styles.pageInfo}>
          <Text
            style={[
              styles.Text,
              {fontSize: 24, color: AppColors.FontsColor, marginBottom: 13},
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
        </View>
        <View style={{marginTop: Height / 12}}>
          <InputField
            iconName="envelope"
            placeholder="Enter Email"
            size={25}
            error={emailerror}
            onChangeText={e => {
              setEmail(e);
              if (e != '') {
                setemailerror(false);
              }
            }}
            Title="Email Adress"
          />
          <InputField
            size={35}
            error={passerror}
            secureTextEntry={isSecure}
            PasswordIcon={isSecure ? 'eye-slash' : 'eye'}
            showIconolor={AppColors.infoFonts}
            showIconsize={25}
            Eyelick={() => {
              setisSecure(prev => !prev);
            }}
            placeholder="Enter your password"
            onChangeText={p => {
              setPassword(p);
              if (p != '') {
                setpasserror(false);
              }
            }}
            Title="Password"
          />
          <CustomButton
            Title="Login"
            onPress={() => IsEmpty()}
            style={{marginTop: 20}}
          />
          <TouchableOpacity
            style={styles.forgetpass}
            onPress={() => {
              navigation.navigate('ForgotPassword');
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
              navigation.navigate('SignUp');
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

export {LoginScreen};
