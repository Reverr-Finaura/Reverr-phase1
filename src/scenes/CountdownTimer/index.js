import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import CountDown from 'react-native-countdown-component';
import {IndividualHeaderLayout} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
const CountdownTimer = ({toshowtimer, settoshowtimer}) => {
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const [Tostart, settostart] = useState(0);
  const [show, setshow] = useState(false);
  useEffect(() => {
    const ExpiredMilliSecond = state.user.CardsUpdatedTime;
    console.log('expired', ExpiredMilliSecond);
    const CurrentTime = new Date();
    const CurrentTimeInMilliSecond = CurrentTime.getTime();
    console.log('current', CurrentTimeInMilliSecond);
    const ToStartFrom = ExpiredMilliSecond - CurrentTimeInMilliSecond;
    console.log('yo', ToStartFrom);
    const ToSecond = Math.abs(ToStartFrom / 1000);
    settostart(ToSecond);
    setshow(true);
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
            }}
          >
            <View>
              <CountDown
                until={20}
                size={25}
                timeToShow={['H', 'M', 'S']}
                timeLabel={{d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds'}}
                timeLabelStyle={{backgroundColor: 'black', color: 'white'}}
                digitStyle={{backgroundColor: '#0077B7'}}
                onFinish={() => LoadMoreVibeCard()}
              />
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </IndividualHeaderLayout>
  );
};

export {CountdownTimer};
