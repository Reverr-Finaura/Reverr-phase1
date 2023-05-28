import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {BackButton, InputField} from '../../../../../Components';
import {CustomButton} from '../../../../../Components';
import {styles} from './style';
import {useSelector, useDispatch} from 'react-redux';
import {add_user} from '../../../../../Redux/actions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AppColors} from '../../../../../utils';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const LoginViaEmail = () => {
  var [isSecure, setisSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [emailerror, setemailerror] = useState(false);
  const [passerror, setpasserror] = useState(false);
  const [password, setPassword] = useState('');
  const [serverError, SetServerError] = useState('');
  const [userLogedin, setUserLogedin] = useState(true);
  const [loading, setLoading] = useState(false);
  // const test = useSelector(state => state.app.tesing);
  // console.log(test);
  const navigation = useNavigation();
  var dispatch = useDispatch();
  const loginUser = async (useremail, password) => {

    var user_request_obj = {
      success: false,
      failiure: false,
      failiure_message: null,
      userType: 'Individual',
    };

    try {
      await auth().signInWithEmailAndPassword(useremail, password);
    } catch (e) {
      if (e.code === 'auth/wrong-password') {
        // alert('Wrong password try again!');
        user_request_obj.failiure = true;
        user_request_obj.failiure_message = 'Wrong Password try again!';
        console.log("Wrong password try again")
        return user_request_obj;
      }
      if (e.code === 'auth/user-not-found') {
        console.log('No user registered with this email!');
        user_request_obj.failiure = true;
        user_request_obj.failiure_message =
          'No user registered with this email!';
        return user_request_obj;
      }
    }
    const savedUser = await firestore().collection('Users').doc(useremail).get();
    //  console.log('Its a :' + savedUser._data.userType);
    dispatch(add_user(savedUser._data));
    user_request_obj.success = true;
    user_request_obj.userType = savedUser._data.userType;
    console.log(savedUser);
    return user_request_obj;
  };

  const Login = async () => {
    setLoading(true);
    var useremail = email.toLowerCase()
    firestore()
      .collection('Users')
      .doc(useremail.trim())
      .get()
      .then(async documentSnapshot => {
        if (documentSnapshot.exists) {
          if (documentSnapshot.data().userType === 'Individual') {
            setUserLogedin(false);
            var response = await loginUser(useremail.trim(), password);
            if (response.success == true) {
              setUserLogedin(true);
              setLoading(false);
              navigation.replace('MyDrawer');
            } else if (response.failiure == true) {
              console.log(useremail.trim(), password, password)
              setUserLogedin(true);
              setLoading(false);
              alert('Invalid Credentials!');
              //navigation.replace('Login')
            }
          } else {
            setLoading(false);
            alert('User Not Register');
          }
        } else {
          setLoading(false);
          alert('User not Register');
        }
      });
  };

  // if (!userLogedin) {
  //   return (
  //     <View style={styles.screen}>
  //       <ActivityIndicator size="large" color="#fff" />
  //     </View>
  //   );
  // }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <LinearGradient colors={['#070972', '#0C0C0D']} style={styles.screen}>
        <BackButton />
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
        <ScrollView>
          <Text style={styles.heading}>Login</Text>
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
              source={require('../../../../../assets/images/illustration/loginillusto.png')}
            />
          </View>
          <View style={{marginHorizontal: '4%'}}>
            <InputField
              placeholder="Enter Your Email"
              size={25}
              error={emailerror}
              onChangeText={e => {
                setEmail(e);
              }}
              Title="Email Address"
            />
            <InputField
              size={35}
              error={passerror}
              style={{marginTop: '2%'}}
              secureTextEntry={isSecure}
              PasswordIcon={isSecure ? 'eye-slash' : 'eye'}
              showIconolor={AppColors.infoFonts}
              showIconsize={25}
              Eyelick={() => {
                setisSecure(prev => !prev);
              }}
              placeholder="Enter Your Password"
              onChangeText={p => {
                setPassword(p);
              }}
              Title="Password"
            />
          </View>
          <CustomButton Title="Login" onPress={() => Login()} style={{}} />
          <View style={styles.signuplink}>
            <Text
              style={{
                color: AppColors.infoFonts,
                fontFamily: 'Poppins-Regular',
              }}>
              Don’t have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text
                style={{
                  color: AppColors.buttonColor,
                  fontFamily: 'Poppins-Regular',
                }}>
                Sign up!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* <View style={styles.screen}>
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
        </View> */}
    </TouchableWithoutFeedback>
  );
};

export {LoginViaEmail};
