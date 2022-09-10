import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../../utils';
import {Menu} from '../../dumy-Data/drawerMenu';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {white} from 'react-native-paper/lib/typescript/styles/colors';
import firestore from '@react-native-firebase/firestore';
import auth, {deleteUser, firebase} from '@react-native-firebase/auth';

const DrawerContent = () => {
  const state = useSelector(state => state.UserReducer);
  const navigation = useNavigation();

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
    const authCredential = provider.credential(
      UserDetails.currentUser.email,
      password,
    );
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
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          color: AppColors.FontsColor,
          fontSize: 19,
          fontWeight: 'bold',
        }}
      >
        Profile
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('IndividualProfile')}
      >
        <Image
          source={{uri: state.user.image}}
          style={{
            width: 90,
            height: 90,
            borderRadius: 90,
            marginTop: '3%',
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          color: AppColors.FontsColor,
          fontSize: 19,
          fontWeight: 'bold',
          marginTop: '3%',
        }}
      >
        {state.user.name}
      </Text>
      <View style={{marginVertical: '5%', paddingHorizontal: '9%'}}>
        <FlatList
          data={Menu}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: '4%',
              }}
              onPress={() => {
                navigation.navigate(item.path);
              }}
            >
              <Image
                source={item.icon}
                style={{tintColor: AppColors.BtnClr, width: 27, height: 27}}
              />
              <Text
                style={{
                  color: AppColors.BtnClr,
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginStart: '7%',
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity onPress={createTwoButtonAlert}>
            <Text style={{color: 'red', fontSize: 18, fontWeight: 'bold'}}>
              Delete Account
            </Text>
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
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.text}>Upgrade to </Text>
        <Text
          style={{
            color: AppColors.ActiveColor,
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          Premium
        </Text>
      </View>
      <Text style={styles.text}>and receive exclusive access to:</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.6}>
        <Text style={styles.text}>Upgrade</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.poupopbg,
    borderRadius: 30,
    paddingTop: '5%',
  },
  text: {
    color: AppColors.FontsColor,
    textAlign: 'center',
    fontSize: 15,
  },
  button: {
    backgroundColor: 'black',
    marginHorizontal: '20%',
    paddingVertical: '2%',
    marginVertical: '5%',
    borderRadius: 10,
    marginBottom: '16%',
  },
});
export {DrawerContent};
