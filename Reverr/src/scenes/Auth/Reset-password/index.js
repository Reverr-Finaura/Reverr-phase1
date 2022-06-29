import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {CustomButton, BackButton} from '../../../components/index';
import {styles} from './style';
import auth from '@react-native-firebase/auth';
const ResetPassword = props => {
  const navigation = useNavigation();
  const EmailID = props.route.params.EmailID;
  const redirect_screen = props.route.params.redirect_screen;
  const oldPassword = props.route.params.Password;
  const [Password, setPassword] = useState('');
  const [Password2, setPassword2] = useState('');

  //const {login, updatePassword} = useContext(AuthContext);
  // forgotPassword = (Email) => {
  //     firebase.auth().sendPasswordResetEmail(Email)
  //       .then(function (user) {
  //         alert('Please check your email...')
  //       }).catch(function (e) {
  //         console.log(e)
  //       })
  //   }
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
            }}
          />
        </View>
        <View style={styles.pageInfo}>
          <Text
            style={[
              styles.Text,
              {fontSize: 24, color: AppColors.FontsColor, marginBottom: 13},
            ]}>
            Reset Password
          </Text>
          <Text
            style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
            Please receive your password reset{' '}
          </Text>
          <Text
            style={[styles.Text, {fontSize: 14, color: AppColors.infoFonts}]}>
            instructions
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.inputHeader}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={AppColors.infoFonts}
            onChangeText={p1 => {
              setPassword(p1);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Conferm Password"
            placeholderTextColor={AppColors.infoFonts}
            onChangeText={p2 => {
              setPassword2(p2);
            }}
          />
          <CustomButton
            Title="Set Password"
            style={{marginTop: 20}}
            onPress={async () => {
              if (Password != Password2) {
                alert('Password not Matched!!');
              } else {
                await firestore()
                  .collection('Users')
                  .doc(EmailID)
                  .update({
                    password: Password,
                  })
                  .then(async () => {
                    //await forgotpassword(EmailID);
                    navigation.replace(redirect_screen);
                  })
                  .catch(err => {
                    alert("Password hasn't been updated,please try again!");
                    navigation.goBack();
                  });
              }
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export {ResetPassword};
