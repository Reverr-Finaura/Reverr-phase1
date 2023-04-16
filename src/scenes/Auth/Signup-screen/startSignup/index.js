import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {BackButton, CustomButton} from '../../../../Components';
import {AppColors} from '../../../../utils';
import {useNavigation} from '@react-navigation/native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const StartSignup = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <LinearGradient colors={['#070972', '#0C0C0D']} style={styles.screen}>
        <BackButton />
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: Width / 1.3, height: Height / 2.6}}
              source={require('../../../../assets/images/illustration/signupf.png')}
            />
          </View>
          <Text style={styles.heading}>Sign Up</Text>
          <View
            style={{
              height: 1.5,
              backgroundColor: AppColors.buttonColor,
              marginHorizontal: '7%',
              marginTop: '4%',
            }}
          />
          <CustomButton
            Title="Sign Up"
            onPress={() => {
              navigation.navigate('SignUpForm');
            }}
            style={{marginTop: 20}}
          />
          {/* <View style={{marginVertical: '5%'}}>
            <View
              style={{
                height: 1.5,
                backgroundColor: AppColors.BtnClr,
                marginHorizontal: '7%',
                marginVertical: '10%',
              }}
            />
            <Text
              style={{
                color: AppColors.BtnClr,
                position: 'absolute',
                bottom: '40%',
                right: '30%',
                backgroundColor: '#0C0C0D',
                paddingHorizontal: '6%',
              }}>
              or continue with
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.button,
              {
                borderWidth: 2,
                borderColor: AppColors.FontsColor,
                backgroundColor: AppColors.FontsColor,
              },
            ]}>
            <Image
              style={{marginHorizontal: '5%'}}
              source={require('../../../../assets/images/illustration/google.png')}
            />
            <Text style={[styles.buttonText, {color: AppColors.primarycolor}]}>
              Google
            </Text>
          </TouchableOpacity> */}
          <View style={styles.signuplink}>
            <Text
              style={{
                color: AppColors.infoFonts,
                fontFamily: 'Poppins-Regular',
              }}>
              Already have an account?
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
        </ScrollView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default StartSignup;
