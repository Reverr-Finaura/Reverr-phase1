import { View, Text ,Image, TouchableOpacity, Dimensions, StatusBar} from 'react-native';
import React from 'react';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import { AppColors } from '../../../../utils';
import { useNavigation } from '@react-navigation/native';

const Height = Dimensions.get('window').height;
  const Width = Dimensions.get('window').width;

const StartLogin = () => {

    const navigation = useNavigation()
  return (
    <LinearGradient colors={['#070972', '#0C0C0D']} style={styles.screen}>
    <StatusBar backgroundColor={'#070972'} />
    <Image
    style={{width:Width/1.3,height:Height/2.6}}
      source={require('../../../../assets/images/illustration/loginillusto.png')}
    />
    <Text style={styles.heading}>Login</Text>
    <View
      style={{
        height: 1.5,
        backgroundColor: AppColors.buttonColor,
        marginHorizontal: '7%',
        marginTop: '4%',
      }}
    />
    <TouchableOpacity onPress={()=>navigation.navigate("LoginViaPhone")} activeOpacity={0.6} style={[styles.button,{backgroundColor: AppColors.buttonColor,}]}>
      <Image
        style={{marginHorizontal: '5%'}}
        source={require('../../../../assets/images/illustration/phone.png')}
      />
      <Text
        style={styles.buttonText}>
        Login via phone
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate("LoginViaEmail")} activeOpacity={0.6} style={[styles.button,{borderWidth:2,borderColor:AppColors.BtnClr}]}>
      <Image
        style={{marginHorizontal: '5%'}}
        source={require('../../../../assets/images/illustration/gmail.png')}
      />
      <Text
        style={styles.buttonText}>
        Login with email
      </Text>
    </TouchableOpacity>
    <View style={{marginVertical:'5%'}}>
    <View
      style={{
        height: 1.5,
        backgroundColor: AppColors.BtnClr,
        marginHorizontal: '7%',
        marginTop: '4%',
      }}
    />
    <Text style={{color:AppColors.BtnClr,position:'absolute',bottom:-7,right:'30%',backgroundColor:'#0C0C0D',paddingHorizontal:'6%'}}>or continue with</Text>
    </View>
    <TouchableOpacity activeOpacity={0.6} style={[styles.button,{borderWidth:2,borderColor:AppColors.FontsColor,backgroundColor:AppColors.FontsColor}]}>
      <Image
        style={{marginHorizontal: '5%'}}
        source={require('../../../../assets/images/illustration/google.png')}
      />
      <Text
        style={[styles.buttonText,{color:AppColors.primarycolor}]}>
        Google
      </Text>
    </TouchableOpacity>
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
            color: AppColors.buttonColor,
            fontFamily: 'Poppins-Regular',
          }}>
          Sign up!
        </Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
  )
}

export default StartLogin