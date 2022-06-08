import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
  } from 'react-native';
  import React, {useState} from 'react';
  import { AppColors, loginUser } from '../../../utils';
  import {InputField} from '../../../Components'
  import { CustomButton } from '../../../Components';
  import { styles } from './style';
  const Height = Dimensions.get('window').height;
  const Width = Dimensions.get('window').width;
  
  const LoginScreen = () => {
    var [isSecure, setisSecure] = useState(true);
    const [email, setEmail] = useState('');
    const [emailerror, setemailerror] = useState(false);
    const [passerror, setpasserror] = useState(false);
    const [password, setPassword] = useState('');
    
    const IsEmpty = async() => {
      if (!email) {
        setemailerror(true);
      } else {
        if (!password) {
          setpasserror(true);
        } else {
         
          var response=await loginUser(email,password);
          console.log(response);
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
  
 
  export {LoginScreen};