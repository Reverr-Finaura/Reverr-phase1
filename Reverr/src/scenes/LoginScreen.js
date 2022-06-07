import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
  } from 'react-native';
  import React, {useContext, useState} from 'react';
  import { AppColors } from '../utils/Constants';
  import InputField from '../Components/InputField';
  import CustomButton from '../Components/Buttons/CustomButton';
  //import {useNavigation} from '@react-navigation/native';
  //import {AuthContext} from '../Navigations/AuthProvider';
  
  const Height = Dimensions.get('window').height;
  const Width = Dimensions.get('window').width;
  
  import firestore from '@react-native-firebase/firestore';
  //import {UserContext, ChatContext, SavedArticleContext} from '../App';
  //import AlertBox from '../Componants/AlertBox';
  
  const LoginScreen = () => {
    var [isSecure, setisSecure] = useState(true);
    const [email, setEmail] = useState('');
    const [emailerror, setemailerror] = useState(false);
    const [passerror, setpasserror] = useState(false);
    const [password, setPassword] = useState('');
    //const {login} = useContext(AuthContext);
    //const navigation = useNavigation();
    //const {state, dispatch} = useContext(UserContext);
    //const {chatstate, chatdispatch} = useContext(ChatContext);
    // const {savedarticlestate, savedarticledispatch} =
    //   useContext(SavedArticleContext);
  
    // async function loadChatUser(list) {
    //   console.log(list);
    //   list.forEach(async user => {
    //     const User = await firestore().collection('Users').doc(user).get();
    //     delete User._data.password;
    //     chatdispatch({type: 'UPDATE', payload: User._data});
    //   });
    // }
    // async function loadsavedarticle(articles) {
    //   articles.map(async id => {
    //     const res = await firestore().collection('Blogs').doc(id).get();
    //     savedarticledispatch({type: 'UPDATE', payload: res.data()});
    //   });
    // }
    const IsEmpty = () => {
      if (!email) {
        setemailerror(true);
      } else {
        if (!password) {
          setpasserror(true);
        } else {
          //login(email, password);
          async function getUser(email) {
            const savedUser = await firestore()
              .collection('Users')
              .doc(email)
              .get();
              console.log(savedUser);
            //loadsavedarticle(savedUser._data.savedArticles);
            // savedUser._data.userType == 'Mentor'
            //   ? loadChatUser(savedUser._data.clients)
            //   : loadChatUser(savedUser._data.mentors);
            //dispatch({type: 'USER', payload: savedUser._data});
          }
          getUser(email);
        }
      }
    };
  
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
            {/*  <AlertBox text="dhruv" /> */}
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
              iconName="lock"
              size={35}
              error={passerror}
              secureTextEntry={isSecure}
              showIcon={isSecure ? 'eye-slash' : 'eye'}
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
            <CustomButton Title="Login" onPress={IsEmpty} style={{marginTop: 20}} />
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
                //navigation.navigate('UserType');
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
  
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: AppColors.primarycolor,
    },
    pageInfo: {
      marginTop: Height / 22,
    },
    Text: {
      fontFamily: 'Poppins-Regular',
      marginEnd: '40%',
    },
    forgetpass: {
      marginTop: '10%',
      alignItems: 'center',
    },
    fg: {
      color: AppColors.FontsColor,
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
    },
    signuplink: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '20%',
      justifyContent: 'center',
    },
  });
  
  export default LoginScreen;
  