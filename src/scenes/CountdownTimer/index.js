import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CountDown from 'react-native-countdown-component';
import {IndividualHeaderLayout} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AppColors} from '../../utils';
import {useNavigation} from '@react-navigation/native';
const CountdownTimer = ({toshowtimer, settoshowtimer}) => {
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [Tostart, settostart] = useState(0);
  const [show, setshow] = useState(false);
  const TimerCalculation = async () => {
    const data = await firestore()
      .collection('Users')
      .doc(state.user.email)
      .get();

    const ExpiredMilliSecond = data.data().CardsUpdatedTime;
    console.log('expired', ExpiredMilliSecond);
    const CurrentTime = new Date();
    const CurrentTimeInMilliSecond = CurrentTime.getTime();
    console.log('current', CurrentTimeInMilliSecond);
    const ToStartFrom = ExpiredMilliSecond - CurrentTimeInMilliSecond;
    console.log('yo', ToStartFrom);
    const ToSecond = Math.abs(ToStartFrom / 1000);
    settostart(ToSecond);
    setshow(true);
  };
  useEffect(() => {
    TimerCalculation();
    return () => TimerCalculation();
  }, []);
  console.log(Tostart);
  const LoadMoreVibeCard = async () => {
    console.log('workinf');
    await firestore().collection('Users').doc(state.user.email).update({
      CardsExpiredTime: 0,
      CardsUpdatedTime: 0,
      AllCardsSwiped: false,
    });
    settoshowtimer(false);
  };
  return (
    <IndividualHeaderLayout>
      {show ? (
        <View>
          <View
            style={{
              width: Dimensions.get('window').width / 1.1,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text
              style={{
                color: '#0077B7',
                fontWeight: 'bold',
                maxWidth: Dimensions.get('window').width / 1.2,
                fontSize: 22,
              }}>
              Buy Premium to connect with people who are interested in your
              profile.
            </Text>
            <Text
              style={{
                color: '#fff',
                marginTop: 20,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Many people viewed your profile
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingLeft: 180,
                marginVertical: 20,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: 'dodgerblue',
                  width: 180,
                  height: 180,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../assets/images/MentorCard.png')}
                />
                <Text style={{color: 'grey'}}>Alice</Text>
              </View>
              <Image
                style={{width: 250, height: 100}}
                source={require('../../assets/images/Rectangleimg.png')}
              />
            </View>
            <Text style={{color: 'grey', marginLeft: 40}}>
              Explore more options with our premium service. or Wait 24 Hours
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get('window').width / 1.1,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <View>
              <CountDown
                until={Tostart}
                size={25}
                timeToShow={['H', 'M', 'S']}
                timeLabel={{d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds'}}
                timeLabelStyle={{backgroundColor: 'black', color: 'white'}}
                digitStyle={{backgroundColor: '#0077B7'}}
                onFinish={() => LoadMoreVibeCard()}
              />
            </View>
          </View>
          <View
            style={{
              width: Dimensions.get('window').width,
              paddingHorizontal: 30,
              paddingTop: 2,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigate.navigate('premiumPlans');
              }}
              style={{
                borderRadius: 8,
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#2A72DE',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <Text style={{color: '#ffffff', fontSize: 18}}> Get Premium</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </IndividualHeaderLayout>
  );
};

export {CountdownTimer};
