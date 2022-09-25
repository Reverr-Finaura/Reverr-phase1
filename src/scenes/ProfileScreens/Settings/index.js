import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../../../utils';
import {BackButton} from '../../../Components';
import {TitleCard} from '../../../Components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {styles} from './style';
import firestore from '@react-native-firebase/firestore';
import {deleteUser, firebase} from '@react-native-firebase/auth';
import {set_allLoaded} from '../../../Redux/actions';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const Settings = props => {
  const navigation = useNavigation();

  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const [password, setpasword] = useState('');
  const [visible, setVisible] = useState(false);
  const [text, onTextChange] = useState('');
  const createTwoButtonAlert = () =>
    Alert.alert(' Delete Permanetly', 'Are you sure want to delete Account', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          HandleDelete();
        },
      },
    ]);
  // calling when password changes
  useEffect(() => {
    DeleteFunction();
  }, [password]);

  // Deleting user frrom auth
  const DeleteFunction = async () => {
    console.log(password);
    const UserDetails = auth();
    const provider = firebase.auth.EmailAuthProvider;
    if (password) {
      const authCredential = provider.credential(
        UserDetails.currentUser.email,
        password,
      );
    }

    console.log(UserDetails.currentUser.uid);
    await UserDetails.currentUser.reauthenticateWithCredential(authCredential);
    console.log(password);
    UserDetails.currentUser.delete().then(console.log('delete perm'));
  };
  // Deleting  user document here
  const HandleDelete = async () => {
    console.log('At delete');
    const UserDetail = auth();
    console.log(UserDetail);
    console.log(UserDetail.currentUser);
    await firestore()
      .collection('Users')
      .doc(state.user.email)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
    setVisible(true);
  };

  function savedScreen() {
    console.log('pressed');
    navigation.navigate('SavedScreen');
  }

  const logout = async () => {
    await auth()
      .signOut()
      .then(() => {
        console.log('User Signed out!');
        navigation.replace('Login');
      })
      .catch(err => {
        console.log('error in signing out');
      });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <BackButton
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          style={{
            color: AppColors.FontsColor,
            fontFamily: 'Poppins-Regular',
            marginStart: Width / 3.3,
            fontSize: 22,
          }}
        >
          Settings
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            savedScreen();
          }}
          style={{height: '7%', marginTop: '25%'}}
        >
          <TitleCard firstText="Saved" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            //if(state.user.userType=='individual'){
            navigation.navigate('EditIndivisualProfile');
            //}else{
            //navigation.navigate('EditMentorProfile')
            //}
          }}
          style={{height: '7%', marginTop: '7%'}}
        >
          <TitleCard firstText="Edit profile" />
        </TouchableOpacity>
        <TouchableOpacity style={{height: '7%', marginTop: '7%'}}>
          <TitleCard firstText="Change password" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: '7%', marginTop: '7%'}}
          onPress={() => {
            navigation.navigate('TermConditions');
          }}
        >
          <TitleCard firstText="Terms and conditions" />
        </TouchableOpacity>
        <TouchableOpacity style={{height: '7%', marginTop: '7%'}}>
          <TitleCard firstText="Contact us" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{height: '7%', marginTop: '7%'}}
        >
          <TitleCard firstText="Logout" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            createTwoButtonAlert();
          }}
          style={{height: '7%', marginTop: '7%'}}
        >
          <TitleCard firstText="Delete Account" />
        </TouchableOpacity>
        <Modal
          visible={visible}
          transparent={true}
          style={{justifyContent: 'center'}}
        >
          <View
            style={{
              height: 100,
              padding: 20,
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            <TextInput
              value={Text}
              onChangeText={newtext => setpasword(newtext)}
              placeholder={'Enter Your Password'}
            />
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Button title="close" onPress={() => setVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.dp}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: state.user && state.user.image}}
        />
      </View>
    </View>
  );
};

export {Settings};
