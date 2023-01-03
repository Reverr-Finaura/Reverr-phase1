import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppColors} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../Redux/actions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//import { AuthContext } from '../Navigations/AuthProvider';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const IntroSplash = () => {
  const navigation = useNavigation();
  //const [user, setUser] = useState(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const state = useSelector(state => state.UserReducer);
  const [user, setuser] = useState();
  const dispatch = useDispatch();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setuser(user);
    // if(user){
    //     dispatch(setUser(user.email));
    // }
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //if(subscriber){
    setTimeout(() => {
      auth().onAuthStateChanged(async user => {
        if (!user) {
          return navigation.replace('Login');
        } else {
          await firestore()
            .collection('Users')
            .doc(user.email)
            .get()
            .then(inst => {
              console.log(inst);
              dispatch(setUser(inst._data));
              if (inst?._data?.userType == 'Mentor') {
                return navigation.replace('MentorBottomTab');
              } else {
                //console.log(inst._data)
                return navigation.replace('IndividualTab');
              }
            });
        }
      });
    }, 2000);
  }, []);

  //if (initializing) return null;

  // setTimeout(() => {
  //     auth().onAuthStateChanged(user=>{
  //         if(!user){
  //             navigation.replace("Login")
  //             }else{
  //                 dispatch(setUser(user.email));
  //                 if(state.user.userType=='Mentor'){
  //                     return navigation.replace('MentorProfile');
  //                 }else{
  //                     console.log(state.user)
  //                     navigation.navigate('home')
  //                 }

  //             }
  //     })
  // }, 2000);

  return (
    <View style={styles.Screen}>
      <View style={styles.container}>
        <Image
          style={styles.Logo}
          source={require('../../assets/images/MainLogo.png')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.logoText}>Reverr</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  container: {
    alignItems: 'center',
  },
  Logo: {
    marginTop: Height / 5,
  },
  logoText: {
    color: 'gray',
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 35,
  },
  textContainer: {
    position: 'absolute',
    marginTop: Height / 1.4,
  },
});

export {IntroSplash};
