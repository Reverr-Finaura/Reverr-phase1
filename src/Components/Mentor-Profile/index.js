import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import styles from './styles';
import {CustomTextCard} from '../CustomTextCard';
import {Details} from '../Details';
import {useSelector} from 'react-redux';
import {Rating} from '../Ratings';
import {CustomButton} from '../CustomButton';
import App from '../../App';
import {AppColors, smallString} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import firestore from '@react-native-firebase/firestore';

export const MentorDetails = props => {
  const navigaton = useNavigation();
  const [optionIndex, setIndex] = useState(0);
  const [pressed, setPressed] = useState(false);
  const state = useSelector(state => state.UserReducer);
  const selectedmentor = props.route.params.mentorDetails;
  const [selectedmentorPrice, setSelectedmentorPrice] = useState();
  const [loader, setLoader] = useState(false);

//TO GET EXPIRY DATE
function getDesireDay(date, days) {
  return new Date(date.setDate(date.getDate() + days));
}
//TO MAKE ORDER ID
function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const handlePrePayment=async()=>{
  
  let oId = makeid(12);
  let amt = selectedmentor?.plans[0] / 2;
    if (amt < 501) {
      amt = 500;
    } else {
      if (amt < 751) {
        amt = 750;
      } else{
        if(amt<1001){
          amt=1000
        }else{
          if(amt<1501){
            amt=1500
          }else {
            amt = amt+50;
          }
        }
      }
    }
  const order = {
    orderId: oId,
    currency: 'INR',
    amount: amt,
    // amount: 0.1,
    secret: '$2b$10$wu8ujbqHIaelkAQ.MfmRE.eVx.7iVOBfbyIbsD1zRSWvgzsFf4goe',
  };
  console.log(order, 'order');
console.log("mentorUniqueID",selectedmentor.mentorUniqueID)
  const headers = {
    'Content-Type': 'application/json',
  };
  setLoader(true);
  //<--- set true loader --->
  const res = await axios
    .post('http://54.172.20.42:3000/cftoken', order, {
      headers: headers,
    })
    .then(res => {
      order.token = res.data.cftoken;
      cashfree(order);
    })
    .catch(err => {
      console.log(err);
    });
}

const cashfree = order => {
  var map = {
    orderId: order.orderId,
    orderAmount: order.amount.toString(),
    appId: '21235619dae90a7c71fa82b24c653212',
    tokenData: order.token,
    orderCurrency: order.currency,
    orderNote: ' ',
    notifyUrl: 'https://test.gocashfree.com/notify',
    customerName: state.user.name,
    customerPhone: state.user.mobile?state.user.mobile:state.user.phone,
    customerEmail: state.user.email,
  };
  console.log(map);
  RNPgReactNativeSDK.startPaymentWEB(map, 'PROD', result => {
    //console.log('openUI');
    setLoader(false);
    //<---- set false loader here ---->

    var payment = {
      paymentMode: '',
      orderId: '',
      txTime: '',
      referenceId: '',
      txMsg: '',
      signature: '',
      orderAmount: '',
      txStatus: '',
      vendor: selectedmentor.email,
      user: state.user.email,
    };

    var obj = JSON.parse(result, function (key, value) {
      if (key == 'paymentMode') payment.paymentMode = value;
      else if (key == 'orderId') payment.orderId = value;
      else if (key == 'txTime') payment.txTime = value;
      else if (key == 'referenceId') payment.referenceId = value;
      else if (key == 'txMsg') payment.txMsg = value;
      else if (key == 'signature') payment.signature = value;
      else if (key == 'orderAmount') payment.orderAmount = value;
      else if (key == 'txStatus') payment.txStatus = value;
    });
    handleResponse(payment);
  });
};

const handleResponse = async res => {
  var id;
  await firestore()
    .collection('Payments')
    .add(res)
    .then(data => {
      // console.log("added successfully",data._documentPath._parts[1])
      id = data._documentPath._parts[1];
      //console.log('payment:' + id);
      // console.log(res, 'res');
      //updateUser(id, res);
    });

  if (res.txStatus == 'SUCCESS') {
    setLoader(true);
    //INITIATE SPLIT PAYMENT
    initiateSplitPayment(res).then(()=>{
    firestore()
      .collection('Users')
      .doc(selectedmentor.email)
      .update({
        orders: firestore.FieldValue.arrayUnion(id),
      })
      .then(() => {
        firestore()
          .collection('Users')
          .doc(selectedmentor.email)
          .update({
            clients: firestore.FieldValue.arrayUnion(state.user.email),
          })
          .then(() => {
            firestore()
              .collection('Users')
              .doc(state.user.email)
              .update({
                mentors: firestore.FieldValue.arrayUnion(
                  selectedmentor.email,
                ),
              })
              .then(() => {
                console.log('All Information stored');
                setLoader(false);
                navigaton.navigate('scheduleappointment', {
                  mentor: selectedmentor,
                });
              });
          });
      });
    //<--- add id to mentor's orders array --->
    //<--- add user's email to mentor's client --->
    //<--- add mentor's email to user's mentor's --->
  })
  } else {
    // console.log('payment:' + id);
    Alert.alert('Payment failed!', 'try again ' + id, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
    //<--- Payment failed! try again --->
    
  }
};
// INITIATE SPLIT PAYMENT
const initiateSplitPayment=async(payment)=>{
  const headers = {
    'Content-Type': 'application/json',
    "X-Client-Id":"21235619dae90a7c71fa82b24c653212",
    "X-Client-Secret":"b3fcd2aee2a93a9d7efedcd88936046a43506c5c",
  };

  const data=
    {
      "split": [
        {
              "vendorId":  selectedmentor.mentorUniqueID,
              "amount": (selectedmentor.plans[0]/2)*0.9,
              "percentage": null
          }
      ],
      "splitType": "ORDER_AMOUNT"
  }
  
  await axios.post(`https://api.cashfree.com/api/v2/easy-split/orders/${payment.orderId}/split`,data,{headers: headers}).then((res)=>{console.log("sucess split",res.data)}).catch((err)=>{console.log("Failure Split",err.message)})
}


  const Ratings = () => {
    return <Rating />;
  };
  //console.log(selectedmentor, 'selectedmentordat');

  useEffect(() => {
    setSelectedmentorPrice(
      selectedmentor?.plans[0] / 2 <= 500
        ? 500
        : selectedmentor?.plans[0] / 2 > 500 &&
          selectedmentor?.plans[0] / 2 <= 750
        ? 750
        : selectedmentor?.plans[0] / 2 > 750 &&
          selectedmentor?.plans[0] / 2 <= 1000
        ? 1000
        : selectedmentor?.plans[0] / 2 > 1000 &&
          selectedmentor?.plans[0] / 2 <= 1500
        ? 1500
        : selectedmentor?.plans[0] / 2 + 50,
    );
  }, []);
  // console.log(selectedmentor?.image);
  const renderOptions = index => {
    switch (index) {
      case 0:
        return (
          <View style={{display: 'flex'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '400',
                bottom: '6%',
                marginHorizontal: 16,
              }}>
              {smallString(selectedmentor?.about, 520)}
            </Text>
          </View>
        );
      case 1:
        return (
          <View style={{display: 'flex'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '400',
                marginHorizontal: 16,
              }}>
              {selectedmentor?.experience}
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={{display: 'flex'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '400',
                marginHorizontal: 16,
              }}>
              {selectedmentor?.domain}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    selectedmentor && (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigaton.goBack()}>
            <Image
              source={require('../../assets/images/Back.png')}
              style={styles.button}
            />
          </TouchableOpacity>
        </View>

        <Image source={{uri: selectedmentor?.image}} style={styles.mentor} />
        <LinearGradient
          colors={[AppColors.primarycolor, '#012437']}
          start={{x: 0, y: 1.3}}
          end={{x: 0.3, y: 0.5}}
          style={{
            marginHorizontal: '5%',
            borderRadius: 10,
            paddingVertical: '2%',
          }}>
          <Text style={styles.mentorName}>{selectedmentor?.name}</Text>
          <Text style={styles.mentorProfession}>
            {selectedmentor?.industry}
          </Text>
        </LinearGradient>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '12%',
            paddingStart: '2%',
          }}>
          <CustomTextCard
            title="Industry"
            subTitle={selectedmentor?.industry}
          />

          <CustomTextCard
            title="Appoinment"
            subTitle={'₹ ' + selectedmentorPrice + '/30 Min'}
          />
          <TouchableOpacity
            style={{
              marginTop: '-7.6%',
              width: '30%',
              height: '100%',
              overflow: 'hidden',
              borderRadius: 12,
              marginRight: '2%',
            }}>
            <ImageBackground
              style={{
                paddingHorizontal: '5%',
                paddingVertical: '5%',
                borderRadius: 12,
              }}
              source={require('../../assets/images/Rectangle2.png')}>
              <Text style={{color: AppColors.FontsColor, marginBottom: '4%'}}>
                Rating
              </Text>
              <Rating />
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          <Details
            buttons={['About', 'Experience', 'Domain']}
            afterClickEvent={setIndex}
          />
          {renderOptions(optionIndex)}
        </View>
        <View style={{paddingBottom: 90}}>
          {selectedmentor.mentorCalendlyLink? (
            <CustomButton
            onPress={()=>{handlePrePayment()}}
              // onPress={() => {
              //   navigaton.navigate('scheduleappointment', {
              //     mentor: selectedmentor,
              //   });
              // }}
              title="Schedule"
            />
          ): <CustomButton
              onPress={() => {
                navigaton.navigate('CalanderAppointments', {
                  mentor: selectedmentor,
                });
              }}
              title="Schedule"
            /> }
        </View>
        <Modal
            visible={loader}
            onRequestClose={() => {
              setLoader(false);
            }}
            transparent={true}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(1, 1, 1, 0.08)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: AppColors.FontsColor,
                  width: '90%',
                  alignItems: 'center',
                  paddingVertical: '5%',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    color: AppColors.primarycolor,
                    fontSize: 19,
                    marginVertical: '10%',
                  }}>
                  Please Wait..
                </Text>
                <ActivityIndicator
                  color={AppColors.ActiveColor}
                  size={45}
                  style={{marginBottom: '5%'}}
                />
              </View>
            </View>
          </Modal>
      </ScrollView>
    )
  );
};
