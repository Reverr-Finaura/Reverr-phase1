import React, {useEffect, useId, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {BackButton, IndividualHeaderLayout} from '../../Components';
import GradientHeader from '../Components/components/GradientHeader';
import ProfileCard from '../Components/components/ProfileCard';
import Theme from '../utils/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const Premium = () => {
  const navigation = useNavigation();
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [premuser, setPremuser] = useState(false);
  const [LikedData, setLikedData] = useState([]);
  useEffect(() => {
    const GetLikedPeople = async () => {
      var Data = [];

      state.user.people_liked_me && Data.push(...state.user.people_liked_me);
      state.user.people_super_liked_me &&
        Data.push(...state.user.people_super_liked_me);

      Data?.map(async item => {
        const dataliked = await firestore().collection('Users').doc(item).get();

        const RecievedData = dataliked.data();
        console.log('12345==================rer===>', RecievedData);

        // console.log(dataliked._data, 'kssk');
        // alert(RecievedData, 'alll set');

        setLikedData(prev => [...prev, RecievedData]);
      });

      setshow(true);
    };

    const CheckPremiumUser = () => {
      if (state.user.hasVibePremium) {
        if (state.user.hasVibePremium === true) {
          state.user.Premium.map(item => {
            if (item.id === 'VIBE') {
              if (new Date(item.DateOfExpiry.seconds * 1000) >= new Date()) {
                setPremuser(true);
              }
            }
          });
        }
      }
    };
    GetLikedPeople();
    CheckPremiumUser();
  }, []);
  if (LikedData.length > 0 && !premuser)
    return (
      <View style={{flex: 1}}>
        <GradientHeader />
        <LinearGradient
          colors={[Theme.backgroundColor, '#1B1D8B']}
          style={styles.container}>
          <Text style={styles.title}>
            Buy premium to connect with people who are interested in your
            profile
          </Text>

          <Text style={styles.bluetitle}>
            {LikedData[0].name} and {LikedData.length} others liked your profile
          </Text>

          <ProfileCard user={LikedData[0]} />

          <ImageBackground
            imageStyle={{width: '100%', resizeMode: 'contain'}}
            source={Theme.blurview}
            style={[styles.blur]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('premiumPlans')}
              style={[styles.btn, styles.shadowProp]}>
              <Text style={{fontSize: 16, color: '#FFF', fontWeight: 'bold'}}>
                Get Premium
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </LinearGradient>
      </View>
    );
  else if (LikedData.length > 0 && premuser)
    return (
      <View style={{flex: 1}}>
        <GradientHeader />
        <LinearGradient
          colors={[Theme.backgroundColor, '#1B1D8B']}
          style={styles.container}>
          <Text style={styles.title}>
            These people are interested to connect with you.
          </Text>

          <Text style={styles.bluetitle}>
            {LikedData[0].name} and {LikedData.length} others liked your profile
          </Text>
          {LikedData.map((user, index) => {
            <ProfileCard user={user} />;
          })}
        </LinearGradient>
      </View>
    );
  else
    return (
      <View style={{flex: 1}}>
        <GradientHeader />
        <LinearGradient
          colors={[Theme.backgroundColor, '#1B1D8B']}
          style={styles.container}>
          <Text style={{color: 'white'}}>No Records Found!</Text>
        </LinearGradient>
      </View>
    );
};
export default Premium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  title: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginTop: 25,
  },
  bluetitle: {
    color: Theme.primaryColor,
    fontWeight: '600',
    fontSize: 14,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginVertical: 15,
  },
  blur: {
    width: '85%',
    height: 360,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    resizeMode: 'contain',
    borderRadius: 100,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColor,
    alignSelf: 'center',
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: -15, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 25,
  },
});
