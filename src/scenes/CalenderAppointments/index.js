import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {AppColors} from '../../utils';
import {BackButton, CustomPopup} from '../../Components';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CustomButton} from '../../Components';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
//import { UserContext } from '../../App';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import axios from 'axios';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

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

// const schedulingData = [20, 21, 22, 23, 24, 25, 26, 27];
const times1 = ['9:00', '10:00', '11:00'];
const times2 = ['12:00', '13:00', '14:00'];
const times3 = ['15:00', '16:00', '17:00'];

var montharr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
var fulldayarr = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
var dayarr = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

const CalanderAppointments = props => {
  console.log("props.route.params.mentor.plans[0]/2)*0.9",(props.route.params.mentor.plans[0]/2)*0.9)
  //const dates = props.route.params.dates;
  const [selectedDate, setSelectedDate] = useState(-1);
  const [selectedTime1, setSelectedTime1] = useState(-1);
  const [selectedTime2, setSelectedTime2] = useState(-1);
  const [selectedTime3, setSelectedTime3] = useState(-1);
  //const {state, dispatch} = useContext(UserContext);
  const state = useSelector(state => state.UserReducer);
  
  const [availability, setAvailability] = useState([0, 1, 1, 1, 1, 1, 1]);
  const [pointDay, setPointDay] = useState(0);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  var daylist = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday ',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const navigation = useNavigation();
  // console.log(dates);
  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const payment = async plan => {
    /* if (state.user.mentors.includes(props.route.params.mentor)) {
      alert('go to appoinment ');
    } else { */

    var oId = makeid(12);
    var amt = plan[0] / 2;
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
    console.log(plan[0] / 2, amt, 'plans');
    const order = {
      orderId: oId,
      currency: 'INR',
      amount: amt,
      // amount: 0.5,
      secret: '$2b$10$wu8ujbqHIaelkAQ.MfmRE.eVx.7iVOBfbyIbsD1zRSWvgzsFf4goe',
    };

    console.log(order);

    const headers = {
      'Content-Type': 'application/json',
    };
    setLoader(true);
    //<--- set true loader --->
    // https://reverrserver.herokuapp.com/cftoken
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
  };

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
        vendor: props.route.params.mentor.email,
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
      //INITIATE SPLIT PAYMENT
      initiateSplitPayment(res).then(()=>{
      firestore()
        .collection('Users')
        .doc(props.route.params.mentor.email)
        .update({
          orders: firestore.FieldValue.arrayUnion(id),
        })
        .then(() => {
          firestore()
            .collection('Users')
            .doc(props.route.params.mentor.email)
            .update({
              clients: firestore.FieldValue.arrayUnion(state.user.email),
            })
            .then(() => {
              firestore()
                .collection('Users')
                .doc(state.user.email)
                .update({
                  mentors: firestore.FieldValue.arrayUnion(
                    props.route.params.mentor.email,
                  ),
                })
                .then(() => {
                  console.log('All Information stored');
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
              "vendorId":  props.route.params.mentor.mentorUniqueID,
              "amount": (props.route.params.mentor.plans[0]/2)*0.9,
              "percentage": null
          }
      ],
      "splitType": "ORDER_AMOUNT"
  }
  
  await axios.post(`https://api.cashfree.com/api/v2/easy-split/orders/${payment.orderId}/split`,data,{headers: headers}).then((res)=>{console.log("sucess split",res.data)}).catch((err)=>{console.log("Failure Split",err.message)})
}

  var dt = new Date();
  var today = dt.getDate();
  var Tdays = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
  var schedulingData = [
    today,
    today + 1 > Tdays ? today - Tdays + 1 : today + 1,
    today + 2 > Tdays ? today - Tdays + 2 : today + 2,
    today + 3 > Tdays ? today - Tdays + 3 : today + 3,
    today + 4 > Tdays ? today - Tdays + 4 : today + 4,
    today + 5 > Tdays ? today - Tdays + 5 : today + 5,
    today + 6 > Tdays ? today - Tdays + 6 : today + 6,
  ];

  var temp = [];
  var ans = [];
  for (var i = 0; i < 7; i++) {
    if (i < dt.getDay()) {
      temp.push(dayarr[i]);
    } else {
      ans.push(dayarr[i]);
    }
  }
  for (var i = 0; i < temp.length; i++) {
    ans.push(temp[i]);
  }

  useEffect(() => {
    console.log(props.route.params.mentor.email, 'mentorEMail');
    const user = firestore()
      .collection('Users')
      .doc(props.route.params.mentor.email)
      .onSnapshot(documentSnapshot => {
        console.log('Mentor data: ', documentSnapshot.data());
        setAvailability(documentSnapshot.data().availability);
        console.log(availability);
        var today = new Date();
        var day = today.getDay();

        console.log('Today is : ' + daylist[day] + ',' + day);
        setPointDay(day);
        //setCount(7-day);
      });
  }, []);
  const submitHandler = () => {
    var date = schedulingData[selectedDate];
    var time =
      selectedTime1 != -1
        ? times1[selectedTime1]
        : selectedTime2 != -1
        ? times2[selectedTime2]
        : times3[selectedTime3];
    var month;
    if (date < today) {
      month = dt.getMonth() + 2;
    } else {
      month = dt.getMonth() + 1;
    }
    var event = {
      month,
      date,
      time,
      approved: false,
      mentor_email: props.route.params.mentor.email,
    };
    var mentor_event = {
      month,
      date,
      time,
      approved: false,
      client_email: state.user.email,
    };
    var notification_obj = {
      subject: state.user.email,
      message: 'You have an appointment request',
      type: 'appointment',
      email: props.route.params.mentor.email,
      month,
      date,
      time,
    };
    //Put this code section into Redux
    //dispatch({type: 'NEWEVENT', payload: event})
    firestore()
      .collection('Users')
      .doc(state.user.email)
      .update({
        events: [...state.user.events, event],
      })
      .then(() => {
        firestore()
          .collection('Users')
          .doc(event.mentor_email)
          .update({
            Appointement_request: firestore.FieldValue.arrayUnion(mentor_event),
            notifications: firestore.FieldValue.arrayUnion(notification_obj),
          })
          .then(() => {
            console.log('added event');
            showToast('Event added succerssfully!');
          })
          .catch(e => {
            showToast('Error in booking event!');
          });
      });
    // .then(()=>console.log("added event"))
  };
  return (
    <View style={styles.screen}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BackButton
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>New Apointment</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '5%',
          marginTop: '8%',
        }}>
        <View style={{flexDirection: 'row', marginStart: '2%'}}>
          <Text
            style={{color: 'gray', fontSize: 30, fontFamily: 'Poppins-Bold'}}>
            {today}
          </Text>
          <View style={{marginStart: '8%'}}>
            <Text
              style={{color: AppColors.BtnClr, fontFamily: 'Poppins-Regular'}}>
              {fulldayarr[dt.getDay()]}
            </Text>
            <Text
              style={{color: AppColors.BtnClr, fontFamily: 'Poppins-Regular'}}>
              {montharr[dt.getMonth()]} {dt.getFullYear()}
            </Text>
          </View>
        </View>

        <CustomButton Title="Today" style={styles.btn} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '5%',
          paddingVertical: '7%',
          borderBottomWidth: 1,

          borderBottomColor: AppColors.FontsColor,
        }}>
        {schedulingData &&
          schedulingData.length > 0 &&
          schedulingData.map((item, index) => (
            <View key={index}>
              {index == 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDate(index);
                  }}
                  style={{
                    backgroundColor:
                      selectedDate == 0 ? AppColors.buttonFont : null,
                    paddingHorizontal: 8,
                    borderRadius: 6,
                  }}>
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDay}>{ans[index]}</Text>
                  )}
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDate}>{item}</Text>
                  )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.daysName}>{ans[index]}</Text>
                    )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.date}>{item}</Text>
                    )}
                </TouchableOpacity>
              )}
              {index == 1 && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDate(index);
                  }}
                  style={{
                    backgroundColor:
                      selectedDate == 1 ? AppColors.buttonFont : null,
                    paddingHorizontal: 8,
                    borderRadius: 6,
                  }}>
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDay}>{ans[index]}</Text>
                  )}
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDate}>{item}</Text>
                  )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.daysName}>{ans[index]}</Text>
                    )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.date}>{item}</Text>
                    )}
                </TouchableOpacity>
              )}
              {index == 2 && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDate(index);
                  }}
                  style={{
                    backgroundColor:
                      selectedDate == 2 ? AppColors.buttonFont : null,
                    paddingHorizontal: 8,
                    borderRadius: 6,
                  }}>
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDay}>{ans[index]}</Text>
                  )}
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDate}>{item}</Text>
                  )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.daysName}>{ans[index]}</Text>
                    )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.date}>{item}</Text>
                    )}
                </TouchableOpacity>
              )}
              {index == 3 && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDate(index);
                  }}
                  style={{
                    backgroundColor:
                      selectedDate == 3 ? AppColors.buttonFont : null,
                    paddingHorizontal: 8,
                    borderRadius: 6,
                  }}>
                  {console.log(index + pointDay)}
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDay}>{ans[index]}</Text>
                  )}
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDate}>{item}</Text>
                  )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.daysName}>{ans[index]}</Text>
                    )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.date}>{item}</Text>
                    )}
                </TouchableOpacity>
              )}
              {index == 4 && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDate(index);
                  }}
                  style={{
                    backgroundColor:
                      selectedDate == 4 ? AppColors.buttonFont : null,
                    paddingHorizontal: 8,
                    borderRadius: 6,
                  }}>
                  {/* <Text style={styles.daysName}>{ans[index]}</Text>
                    <Text style={styles.date}>{item}</Text> */}
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDay}>{ans[index]}</Text>
                  )}
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDate}>{item}</Text>
                  )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.daysName}>{ans[index]}</Text>
                    )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.date}>{item}</Text>
                    )}
                </TouchableOpacity>
              )}
              {index == 5 && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDate(index);
                  }}
                  style={{
                    backgroundColor:
                      selectedDate == 5 ? AppColors.buttonFont : null,
                    paddingHorizontal: 8,
                    borderRadius: 6,
                  }}>
                  <Text style={styles.daysName}>{ans[index]}</Text>
                  <Text style={styles.date}>{item}</Text>
                </TouchableOpacity>
              )}
              {index == 6 && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDate(index);
                  }}
                  style={{
                    backgroundColor:
                      selectedDate == 6 ? AppColors.buttonFont : null,
                    paddingHorizontal: 8,
                    borderRadius: 6,
                  }}>
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDay}>{ans[index]}</Text>
                  )}
                  {(index + pointDay > 6 ||
                    (index + pointDay <= 6 &&
                      availability[index + pointDay] == 0)) && (
                    <Text style={styles.redDate}>{item}</Text>
                  )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.daysName}>{ans[index]}</Text>
                    )}
                  {index + pointDay <= 6 &&
                    availability[index + pointDay] == 1 && (
                      <Text style={styles.date}>{item}</Text>
                    )}
                </TouchableOpacity>
              )}
            </View>
          ))}
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.daysName}>Times</Text>
        <View style={styles.timebtnContainer}>
          {times1 &&
            times1.length > 0 &&
            times1.map((item, index) => (
              <View key={index}>
                {index == 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDate > -1) {
                        setSelectedTime1(index);
                        setSelectedTime2(-1);
                        setSelectedTime3(-1);
                      }
                    }}
                    activeOpacity={selectedDate > -1 ? 0.7 : 1}>
                    <LinearGradient
                      colors={[
                        AppColors.primarycolor,
                        selectedTime1 == 0 ? AppColors.ActiveColor : '#012437',
                      ]}
                      start={{x: 0, y: 1.3}}
                      end={{x: 0.3, y: 0.5}}
                      style={[
                        styles.timebtn,
                        {opacity: selectedDate > -1 ? 1 : 0.1},
                      ]}>
                      <Text style={styles.btnText}>{item} </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                {index == 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDate > -1) {
                        setSelectedTime1(index);
                        setSelectedTime2(-1);
                        setSelectedTime3(-1);
                      }
                    }}
                    activeOpacity={selectedDate > -1 ? 0.7 : 1}>
                    <LinearGradient
                      colors={[
                        AppColors.primarycolor,
                        selectedTime1 == 1 ? AppColors.ActiveColor : '#012437',
                      ]}
                      start={{x: 0, y: 1.3}}
                      end={{x: 0.3, y: 0.5}}
                      style={[
                        styles.timebtn,
                        {opacity: selectedDate > -1 ? 1 : 0.1},
                      ]}>
                      <Text style={styles.btnText}>{item} </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                {index == 2 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDate > -1) {
                        setSelectedTime1(index);
                        setSelectedTime2(-1);
                        setSelectedTime3(-1);
                      }
                    }}
                    activeOpacity={selectedDate > -1 ? 0.7 : 1}>
                    <LinearGradient
                      colors={[
                        AppColors.primarycolor,
                        selectedTime1 == 2 ? AppColors.ActiveColor : '#012437',
                      ]}
                      start={{x: 0, y: 1.3}}
                      end={{x: 0.3, y: 0.5}}
                      style={[
                        styles.timebtn,
                        {opacity: selectedDate > -1 ? 1 : 0.1},
                      ]}>
                      <Text style={styles.btnText}>{item} </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </View>
        <View style={styles.timebtnContainer}>
          {times2 &&
            times2.length > 0 &&
            times2.map((item, index) => (
              <View key={index}>
                {index == 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDate > -1) {
                        setSelectedTime2(index);
                        setSelectedTime1(-1);
                        setSelectedTime3(-1);
                      }
                    }}
                    activeOpacity={selectedDate > -1 ? 0.7 : 1}>
                    <LinearGradient
                      colors={[
                        AppColors.primarycolor,
                        selectedTime2 == 0 ? AppColors.ActiveColor : '#012437',
                      ]}
                      start={{x: 0, y: 1.3}}
                      end={{x: 0.3, y: 0.5}}
                      style={[
                        styles.timebtn,
                        {opacity: selectedDate > -1 ? 1 : 0.1},
                      ]}>
                      <Text style={styles.btnText}>{item} </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                {index == 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDate > -1) {
                        setSelectedTime2(index);
                        setSelectedTime1(-1);
                        setSelectedTime3(-1);
                      }
                    }}
                    activeOpacity={selectedDate > -1 ? 0.7 : 1}>
                    <LinearGradient
                      colors={[
                        AppColors.primarycolor,
                        selectedTime2 == 1 ? AppColors.ActiveColor : '#012437',
                      ]}
                      start={{x: 0, y: 1.3}}
                      end={{x: 0.3, y: 0.5}}
                      style={[
                        styles.timebtn,
                        {opacity: selectedDate > -1 ? 1 : 0.1},
                      ]}>
                      <Text style={styles.btnText}>{item} </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                {index == 2 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDate > -1) {
                        setSelectedTime2(index);
                        setSelectedTime1(-1);
                        setSelectedTime3(-1);
                      }
                    }}
                    activeOpacity={selectedDate > -1 ? 0.7 : 1}>
                    <LinearGradient
                      colors={[
                        AppColors.primarycolor,
                        selectedTime2 == 2 ? AppColors.ActiveColor : '#012437',
                      ]}
                      start={{x: 0, y: 1.3}}
                      end={{x: 0.3, y: 0.5}}
                      style={[
                        styles.timebtn,
                        {opacity: selectedDate > -1 ? 1 : 0.1},
                      ]}>
                      <Text style={styles.btnText}>{item} </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </View>
        <View style={styles.timebtnContainer}>
          {times3 &&
            times3.length > 0 &&
            times3.map((item, index) => (
              <View key={index}>
                {index == 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDate > -1) {
                        setSelectedTime3(index);
                        setSelectedTime1(-1);
                        setSelectedTime2(-1);
                      }
                    }}
                    activeOpacity={selectedDate > -1 ? 0.7 : 1}>
                    <LinearGradient
                      colors={[
                        AppColors.primarycolor,
                        selectedTime3 == 0 ? AppColors.ActiveColor : '#012437',
                      ]}
                      start={{x: 0, y: 1.3}}
                      end={{x: 0.3, y: 0.5}}
                      style={[
                        styles.timebtn,
                        {opacity: selectedDate > -1 ? 1 : 0.1},
                      ]}>
                      <Text style={styles.btnText}>{item} </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                {index == 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDate > -1) {
                        setSelectedTime3(index);
                        setSelectedTime1(-1);
                        setSelectedTime2(-1);
                      }
                    }}
                    activeOpacity={selectedDate > -1 ? 0.7 : 1}>
                    <LinearGradient
                      colors={[
                        AppColors.primarycolor,
                        selectedTime3 == 1 ? AppColors.ActiveColor : '#012437',
                      ]}
                      start={{x: 0, y: 1.3}}
                      end={{x: 0.3, y: 0.5}}
                      style={[
                        styles.timebtn,
                        {opacity: selectedDate > -1 ? 1 : 0.1},
                      ]}>
                      <Text style={styles.btnText}>{item} </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                {index == 2 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDate > -1) {
                        setSelectedTime3(index);
                        setSelectedTime1(-1);
                        setSelectedTime2(-1);
                      }
                    }}
                    activeOpacity={selectedDate > -1 ? 0.7 : 1}>
                    <LinearGradient
                      colors={[
                        AppColors.primarycolor,
                        selectedTime3 == 2 ? AppColors.ActiveColor : '#012437',
                      ]}
                      start={{x: 0, y: 1.3}}
                      end={{x: 0.3, y: 0.5}}
                      style={[
                        styles.timebtn,
                        {opacity: selectedDate > -1 ? 1 : 0.1},
                      ]}>
                      <Text style={styles.btnText}>{item} </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </View>
        <TouchableOpacity
          activeOpacity={
            selectedTime1 > -1 || selectedTime2 > -1 || selectedTime3 > -1
              ? 0.7
              : 1
          }
          onPress={() => payment(props.route.params.mentor.plans)}>
          <LinearGradient
            colors={[AppColors.primarycolor, '#012437']}
            start={{x: 0, y: 1.3}}
            end={{x: 0.3, y: 0.5}}
            style={[
              styles.proceedBtn,
              {
                opacity:
                  selectedTime1 > -1 || selectedTime2 > -1 || selectedTime3 > -1
                    ? 1
                    : 0.1,
              },
            ]}>
            <Text
              style={[
                styles.btnText,
                {fontFamily: 'Poppins-SemiBold', fontSize: 19},
              ]}>
              Proceed
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  headerTitle: {
    color: AppColors.FontsColor,
    marginStart: '20%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  btn: {
    paddingHorizontal: '2%',
    width: Width / 4,
    paddingVertical: '1%',
  },
  daysName: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
  },
  redDate: {
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
  redDay: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
  },
  date: {
    color: AppColors.CardColor,
    fontFamily: 'Poppins-SemiBold',
  },
  timeContainer: {
    marginTop: '8%',
    paddingHorizontal: '4%',
  },
  timebtnContainer: {
    flexDirection: 'row',
    marginTop: '3%',
    justifyContent: 'space-between',
  },
  timebtn: {
    width: Width / 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: Height / 20,
    borderRadius: 8,
  },
  btnText: {
    fontFamily: 'Poppins-Regular',
    color: AppColors.FontsColor,
  },
  proceedBtn: {
    width: Width / 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Height / 14,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: '15%',
  },
});
export {CalanderAppointments};
