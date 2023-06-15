import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {BackButton} from '../Components';
import {AppColors} from '../utils';
import LinearGradient from 'react-native-linear-gradient';
import BulletPoints from '../Components/components/BulletPoints';
import {useSelector} from 'react-redux';
import axios from 'axios';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import firestore from '@react-native-firebase/firestore';

const Height = Dimensions.get('window').height;

const SelectPlan = props => {
  const planDetails = props.route.params.planDetails;
  const state = useSelector(state => state.UserReducer);
  const [loader, setLoader] = useState(false);

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

  const getPriceHandler = (price, name) => {
    setLoader(true);

    makePayment(price, name);
  };
  //MAKE PAYMENT TO CASHFREE
  const makePayment = async (price, name) => {
    let oId = makeid(12);
    let amt = price;
    const order = {
      orderId: oId,
      currency: 'INR',
      amount: amt,
      // amount: 0.1,
      secret: '$2b$10$wu8ujbqHIaelkAQ.MfmRE.eVx.7iVOBfbyIbsD1zRSWvgzsFf4goe',
    };
    console.log(order, 'order');

    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios
      .post('https://server.reverr.io/cftoken', order, {
        headers: headers,
      })
      .then(res => {
        order.token = res.data.cftoken;
        cashfree(order, name);
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
        alert('Something Went Wrong!! Try Again ');
      });
  };

  const cashfree = (order, planName) => {
    var map = {
      orderId: order.orderId,
      orderAmount: order.amount.toString(),
      appId: '21235619dae90a7c71fa82b24c653212',
      tokenData: order.token,
      orderCurrency: order.currency,
      orderNote: ' ',
      notifyUrl: 'https://test.gocashfree.com/notify',
      customerName: state.user.name,
      customerPhone: state.user.mobile ? state.user.mobile : state.user.phone,
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
      handleResponse(payment, planName);
    });
  };

  const handleResponse = async (res, planName) => {
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
      let premiumData;
      let DOE;
      if (planName === 'Monthly') {
        DOE = getDesireDay(new Date(), 30);
      } else if (planName === 'Quaterly') {
        DOE = getDesireDay(new Date(), 120);
      } else if (planName === 'Yearly') {
        DOE = getDesireDay(new Date(), 365);
      }
      if (state.user.Premium) {
        premiumData = state.user.Premium;
      } else {
        premiumData = [];
      }
      const finalPremiumData = premiumData.map(item => {
        if (item.id === 'VIBE') {
          return {
            ...item,
            DateOfPurchase: new Date(),
            DateOfExpiry: DOE,
            PlanName: planName,
          };
        } else {
          return item;
        }
      });
      console.log('final', finalPremiumData);
      console.log('premium', premiumData);

      firestore()
        .collection('Users')
        .doc(state.user.email)
        .update({
          Payments: firestore.FieldValue.arrayUnion(id),
        })
        .then(() => {
          firestore()
            .collection('Users')
            .doc(state.user.email)
            .update({
              Premium: state.user.hasVibePremium
                ? [...finalPremiumData]
                : [
                    ...premiumData,
                    {
                      DateOfPurchase: new Date(),
                      DateOfExpiry: DOE,
                      PlanName: planName,
                      id: 'VIBE',
                    },
                  ],
            });
        })
        .then(() => {
          firestore()
            .collection('Users')
            .doc(state.user.email)
            .update({hasVibePremium: true});
        })
        .then(() => {
          console.log('Subscibe Premium');
        })
        .then(() => {
          navigate.navigate('Vibe', true);
        })
        .catch(err => {
          console.log('err', err);
        });
    } else {
      // console.log('payment:' + id);
      Alert.alert('Payment failed!', 'try again ' + id, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      //<--- Payment failed! try again --->
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <BackButton />
        <Text
          style={{
            color: AppColors.FontsColor,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 22,
            marginStart: '16%',
          }}>
          Premium Plans
        </Text>
      </View>
      <View style={{paddingHorizontal: '5%', marginTop: '6%'}}>
        <LinearGradient
          colors={
            planDetails.name == 'Monthly'
              ? ['#02e1eb', '#047378']
              : planDetails.name == 'Quaterly'
              ? ['#1ba3f7', '#014975']
              : ['#752bed', '#3c0c8a']
          }
          style={{
            zIndex: 10,
            borderRadius: 20,
            width: '100%',
            height: Height / 1.3,
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center', marginTop: '4%'}}>
            <Text style={styles.headingText}>{planDetails.name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: '2%',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/images/indian.png')}
              style={{
                height: 30,
                width: 30,
                tintColor: AppColors.FontsColor,
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 30,
                fontFamily: 'Poppins-SemiBold',
              }}>
              {planDetails.price}
              {`${
                planDetails.name == 'Monthly'
                  ? '/Month'
                  : planDetails.name == 'Quaterly'
                  ? '/3Month'
                  : '/6Month'
              }`}
            </Text>
          </View>
          <View
            style={{
              width: '80%',
              height: 1.6,
              backgroundColor: AppColors.FontsColor,
            }}
          />
          {planDetails.name == 'Monthly' && (
            <View style={{width: '85%', marginTop: '3%'}}>
              <BulletPoints text="Get access to all the courses" />
              <BulletPoints text="Access all the tools" />
              <BulletPoints text="Access VIBE features like :" />
              <View style={{paddingLeft: '8%'}}>
                <BulletPoints text="Unlimited swipes" />
                <BulletPoints text="Additional 4 handshakes per month" />
                <BulletPoints text="View who wants to connect with you" />
                <BulletPoints text="Get discovered more" />
                <BulletPoints text="Unlimited filters" />
              </View>
            </View>
          )}
          {planDetails.name == 'Quaterly' && (
            <View style={{width: '85%', marginTop: '3%'}}>
              <BulletPoints text="Get access to all the courses" />
              <BulletPoints text="Access all the tools" />
              <BulletPoints text="Access VIBE features like :" />
              <View style={{paddingLeft: '8%'}}>
                <BulletPoints text="Unlimited swipes" />
                <BulletPoints text="Additional 4 handshakes per month" />
                <BulletPoints text="View who wants to connect with you" />
                <BulletPoints text="Get discovered more" />
                <BulletPoints text="Unlimited filters" />
              </View>
            </View>
          )}
          {planDetails.name == 'Semi-Annually' && (
            <View style={{width: '85%', marginTop: '3%'}}>
              <BulletPoints text="Get access to all the courses" />
              <BulletPoints text="Access all the tools" />
              <BulletPoints text="Access VIBE features like :" />
              <View style={{paddingLeft: '8%'}}>
                <BulletPoints text="Unlimited swipes" />
                <BulletPoints text="Additional 4 handshakes per month" />
                <BulletPoints text="View who wants to connect with you" />
                <BulletPoints text="Get discovered more" />
                <BulletPoints text="Unlimited filters" />
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={() => getPriceHandler(planDetails.price, planDetails.name)}
            style={{
              marginTop: 50,
              width: '50%',
              alignItems: 'center',
              borderRadius: 40,
              backgroundColor: AppColors.FontsColor,
              paddingHorizontal: 20,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: AppColors.primarycolor,
                fontFamily: 'Poppins-SemiBold',
              }}>
              {planDetails.text}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  header: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '3%',
  },
  headingText: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 26,
  },
});

export default SelectPlan;
