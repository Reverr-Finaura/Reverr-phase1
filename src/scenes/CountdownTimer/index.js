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
const CountdownTimer = ({toshowtimer, settoshowtimer,finalSetVibePremium}) => {
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [Tostart, settostart] = useState(0);
  const [show, setshow] = useState(false);
  const[hasPremiumOfVibe,setHasPremiumOfVibe]=useState(false)
  console.log("hasPremiumInTimer",hasPremiumOfVibe)
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
    console.log("ToSecond",ToSecond)
    settostart(ToSecond);
    setshow(true);
  };
  useEffect(() => {
    TimerCalculation();
    return () => TimerCalculation();
  }, []);

  const LoadMoreVibeCard = async () => {
    console.log('loadingMoreCard');
    await firestore().collection('Users').doc(state.user.email).update({
      CardsExpiredTime: 0,
      CardsUpdatedTime: 0,
      AllCardsSwiped: false,
      Number_Of_Swips_Done:0
    });
    settoshowtimer(false);
  };

//CHECK FOR PREMIUM VIBE SUB
useEffect(()=>{

  const checkForVibePremium=async()=>{
   await firestore()
   .collection('Users')
   .doc(state.user.email)
   .get()
   .then((data)=>{
     
     if(data._data.hasVibePremium){
      if(data._data.hasVibePremium===true){
       data._data.Premium.map((item)=>{
         if(item.id==="VIBE"){
           if(new Date(item.DateOfExpiry.seconds*1000)>=new Date()){
             setHasPremiumOfVibe(true)
           }
         }
       })
      } 
     }
   })
 } 
   checkForVibePremium()
 },[])
 
//UPDATE TIMER IF USER HAS PREMIUM
useEffect(()=>{
  const undoTimer=async()=>{
if(hasPremiumOfVibe===true){
  console.log("yippee")
  LoadMoreVibeCard()
  finalSetVibePremium(true)
}}
undoTimer()
},[hasPremiumOfVibe])


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
              paddingTop: 0,
              paddingBottom: 10
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
              paddingHorizontal: 50,
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
                paddingHorizontal: 10,
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
