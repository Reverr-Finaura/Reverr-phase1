import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../../utils';
import {BackButton, CustomButton} from '../../../components';
import {styles} from './style';
const OtpScreen = props => {
  //const navigation = useNavigation();
  const [otp, setOtp] = React.useState('');
  const Otp = props?.route?.params?.Otp;
  //weather via forgot password or signup
  const redirect_screen = props?.route?.params?.redirect_screen;
  const Email = props?.route?.params?.Email;
  const Password = props?.route?.params?.Password;

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
              //navigation.goBack();
            }}
          />
        </View>
        <View style={styles.pageInfo}>
          <Text
            style={[
              styles.Text,
              {fontSize: 24, color: AppColors.FontsColor, marginBottom: 13},
            ]}>
            Confirmation
          </Text>
          <Text
            style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
            Please enter the vertification code{' '}
          </Text>
          <Text
            style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
            from the email we just send you
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.inputHeader}>OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="code"
            placeholderTextColor={AppColors.infoFonts}
            onChangeText={o => {
              setOtp(o);
            }}
            maxLength={6}
            keyboardType="number-pad"
          />
          <CustomButton
            Title="Confirm"
            style={{marginTop: 20}}
            onPress={() => {
              if (Otp != otp) {
                alert('wrong otp');
              } else {
                //   navigation.navigate('Reset', {
                //     EmailID: Email,
                //     Password: Password,
                //   });
              }
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <Text
              style={{
                color: AppColors.infoFonts,
                fontFamily: 'Poppins-Regular',
                fontSize: 13,
              }}>
              Don’t get it?{' '}
            </Text>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginStart: -20,
              }}>
              <Text style={[styles.inputHeader, {fontSize: 13}]}>
                Resend code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export {OtpScreen};
