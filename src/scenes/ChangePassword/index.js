import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils';
import {InputField} from '../../Components';
import {CustomButton} from '../../Components';
import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  deleteUser,
  firebase,
  updatePassword,
} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
const ChangePassword = () => {
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const Handleok = () => {
    console.log('at handle ok');
    setcurrentPassword('');
    setNewPassword('');
    setconfirmPassword('');
  };
  const createTwoButtonAlert = () => {
    console.log('button');
    Alert.alert('Password Changed', 'Password Changed Sucessfully', [
      {text: 'OK', onPress: () => Handleok()},
    ]);
  };

  const HandleChangePassword = async () => {
    console.log('handle here');
    if (newPassword == confirmPassword) {
      const UserDetails = auth();
      const provider = firebase.auth.EmailAuthProvider;
      // Passing  credential to Email auth
      const authCredential = provider.credential(
        UserDetails.currentUser.email,
        currentPassword,
      );

      // reauthintcateing user
      await UserDetails.currentUser.reauthenticateWithCredential(
        authCredential,
      );

      UserDetails.currentUser
        .then(
          firebase
            .auth()
            .currentUser.updatePassword(newPassword)
            .then(async () => {
              // Updating in user db .
              console.log('password updated');
              await firestore()
                .collection('Users')
                .doc(state.user.email)
                .update({
                  password: newPassword,
                });
              // show Alert
              createTwoButtonAlert();
            })
            .catch(error => {
              // An error ocurred
              console.log('error', error);
            }),
        )
        .catch(error => {
          console.log('error', error);
        });
    } else {
      Alert.alert('Password not Matched', 'Please Enter Correct Password', [
        {text: 'OK', onPress: () => console.log('ok')},
      ]);
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <View style={{marginTop: Height / 12}}>
          <InputField
            iconName="envelope"
            placeholder="Enter Current Password"
            size={25}
            value={currentPassword}
            onChangeText={text => {
              setcurrentPassword(text);
            }}
            Title="Current Password"
          />
          <InputField
            size={35}
            showIconolor={AppColors.infoFonts}
            showIconsize={25}
            value={newPassword}
            placeholder="Enter New password"
            onChangeText={text => {
              setNewPassword(text);
            }}
            Title=" New Password"
          />
          <InputField
            size={35}
            // error={passerror}
            // secureTextEntry={isSecure}
            // PasswordIcon={isSecure ? 'eye-slash' : 'eye'}
            showIconolor={AppColors.infoFonts}
            showIconsize={25}
            Eyelick={() => {
              setisSecure(prev => !prev);
            }}
            placeholder="Confirm New password"
            value={confirmPassword}
            onChangeText={text => {
              setconfirmPassword(text);
            }}
            Title=" Confirm Password"
          />
          <CustomButton
            Title="Change Password"
            onPress={() => HandleChangePassword()}
            style={{marginTop: 20}}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    backgroundColor: AppColors.primarycolor,
  },
  pageInfo: {
    marginTop: '2%',
  },
  Text: {
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

export {ChangePassword};
