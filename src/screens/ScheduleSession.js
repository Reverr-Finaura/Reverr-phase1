import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import GradientHeader from '../Components/components/GradientHeader';
import {useSelector} from 'react-redux';
import AboutCard from '../Components/components/ScheduleCards/AboutCard';
import AppointmentCard from '../Components/components/ScheduleCards/AppointmentCard';
import Stars from '../Components/components/Stars';
import Theme from '../utils/Theme';
import {BackButton} from '../Components';
import {AppColors} from '../utils';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import firestore from '@react-native-firebase/firestore'


function ScheduleSession(props) {
  const navigaton = useNavigation();
  const state = useSelector(state => state.UserReducer);
  const details = props.route.params.details;
  var selectedmentor = details;
  const [loader, setLoader] = useState(false)

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
const handlePrePayment = ()=>{
  // navigaton.navigate('scheduleappointment', {
  //   mentor: selectedmentor,
  // });
  var mentoremail = details.email;
  var mentorid="";
  for(var i =0; i<mentoremail.length; i++){
    
    if(mentoremail[i]=='@')
      break;
    mentorid+=mentoremail[i];
    
  }

  var uemail = state.user.email;
  var uid = "";

  for(var i =0; i<uemail.length; i++){
    
    if(uemail[i]=='@')
      break;
      uid+=uemail[i];
    
  }
   
  var url = "https://founder.reverr.io/schedule/"+mentorid+"/"+uid;
  Clipboard.setString(url)
  
  alert("The link to schedule the meeting with this mentor has been copied to your clipboard, please open that link in a browser to our website to continue scheduling...")
  console.log(url)
}

const handlePrePayment1=async(selectedmentor)=>{
  
  let oId = makeid(12);
  let amt = selectedmentor?.plans[0] / 2;
  if(amt<5){
    amt=amt
  }else{
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
    .post('https://server.reverr.io/cftoken', order, {
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

  //console.log(details,",sdjsjdsjdjo");

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
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
      <GradientHeader />
      <View style={{paddingVertical: '2%', paddingLeft: '5%'}}>
        <BackButton />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.upperWrapper}>
        <TouchableOpacity>
            <Image source={Theme.arrowleft} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity>
            <Image source={Theme.heart} style={{height:25,width:25,resizeMode:'contain'}}/>
        </TouchableOpacity>
        </View>  */}

        <View style={styles.contentWrapper}>
          <View
            style={{
              backgroundColor: AppColors.FontsColor,
              height: 230,
              width: 230,
              borderRadius: 200,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: details.image}}
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            />
          </View>
          <Text style={styles.maintitle}>{details.name}</Text>
          <Text style={styles.designation}>{details.industry}</Text>

          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              flexDirection: 'row',
              paddingBottom: 15,
            }}>
            <Stars rating={4} />
            <Text
              style={{color: Theme.primaryColor, fontSize: 10, marginTop: 5}}>
              {' '}
              18 Reviews
            </Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 20, paddingBottom: 98}}>
          <AppointmentCard plans = {details.plans}/>
          <AboutCard about={details} />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {handlePrePayment(details)}}
        style={styles.corner}>
        <Text style={{fontSize: 16, color: '#FFF', fontWeight: 'bold'}}>
          Schedule
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default ScheduleSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
  },
  upperWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    paddingBottom: 15,
    marginTop: 25,
  },
  arrow: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
  contentWrapper: {
    alignItems: 'center',
  },
  maintitle: {
    fontSize: 24,
    paddingTop: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  designation: {
    fontSize: 16,
    paddingTop: 8,
    color: '#A6A6A6',
    fontWeight: '600',
  },
  corner: {
    resizeMode: 'contain',
    borderRadius: 100,
    position: 'absolute',
    bottom: 10,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColor,
    alignSelf: 'center',
  },
});
