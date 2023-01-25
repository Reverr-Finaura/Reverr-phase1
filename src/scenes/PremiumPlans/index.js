import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';

// import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {AppColors} from '../../utils';
import axios from 'axios';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import firestore from '@react-native-firebase/firestore';

const PremiumPlans = () => {
  const navigate = useNavigation();
  const state = useSelector(state => state.UserReducer);
  console.log('userData', state.user);
  const [loader, setLoader] = useState(false);
  const CardRef = useRef();
  const [ListIndex, setListIndex] = useState(0);
  const onViewRef = useRef(({changed}) => {
    setListIndex(changed[0].index);
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const PlanData = [
    {
      name: 'Monthly',
      id: 0,
      price: '499',
      text: 'unlimited swipes on vibe.',
    },
    {
      name: 'Quaterly',
      id: 1,
      price: '1299',
      text: 'unlimited swipes on vibe.',
    },
    {
      name: 'Yearly',
      id: 2,
      price: '4999',
      text: 'unlimited swipes on vibe.',
    },
  ];
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
        console.log(err);
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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigate.goBack();
          }}
          style={styles.backBtn}>
          <Image
            style={{
              width: 32,
              height: 32,
              marginTop: 10,
            }}
            source={require('../../assets/images/Back.png')}
          />
        </TouchableOpacity>
        <Image
          style={{
            width: 90,
            height: 50,
            marginTop: 10,
          }}
          source={require('../../assets/images/logo.png')}
        />
      </View>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 15,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.containerHeading}>Premium Packages</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.description}>unlimited swipes on vibe.</Text>
        </View>

        <View
          style={{
            marginTop: 80,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* linear-gradient(202.17deg, rgba(0, 119, 183, 0.55) 3.78%, rgba(42, 114, 222, 0.1705) 38.41%, rgba(42, 114, 222, 0.55) 63.23%, rgba(0, 119, 183, 0) 114.61%); */}
          <FlatList
            ref={CardRef}
            numColumns={1}
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
            data={PlanData}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <LinearGradient
                // key={index}
                colors={[
                  ' rgba(0, 119, 183, 0.55)',
                  ' rgba(42, 114, 222, 0.1705)',
                  'rgba(42, 114, 222, 0.55)',
                ]}
                locations={[0, 0, 0.6]}
                start={{x: 0, y: 0}}
                style={{
                  marginTop: 40,
                  zIndex: 10,
                  position: 'relative',

                  top: ListIndex === item.id ? -40 : 0,
                  width: 300,
                  borderRadius: 20,
                  marginHorizontal: 12,
                  height: 340,
                  borderWidth: 1,
                  borderColor: ListIndex === item.id ? '#fff' : 'transparent',
                }}>
                <View style={styles.planCard}>
                  <Text
                    style={{
                      marginTop: 20,
                      color: '#fff',
                      fontSize: 30,
                      fontWeight: '600',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      marginTop: 25,
                      color: '#fff',
                      fontSize: 38,
                      fontWeight: '600',
                    }}>
                    Rs.{item.price}
                  </Text>
                  <Text
                    style={{
                      marginTop: 22,
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '600',
                    }}>
                    {item.text}
                  </Text>
                  <TouchableOpacity
                    onPress={() => getPriceHandler(item.price, item.name)}
                    style={{
                      marginTop: 50,
                      width: '60%',
                      alignItems: 'center',
                      borderRadius: 6,
                      backgroundColor: '#2A72DE',
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                    }}>
                    <Text
                      style={{fontSize: 20, color: '#fff', fontWeight: '600'}}>
                      Select
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
          />
          {/* <View
            style={{
              marginTop: 35,
              width: Dimensions.get('window').width,
              paddingHorizontal: 30,
              paddingTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              //   onPress={() => {
              //     // navigate.navigate('premiumPlans');
              //   }}
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
          </View> */}
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
    </SafeAreaView>
  );
};

export default PremiumPlans;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  header: {
    width: '100%',
    position: 'relative',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 10,
  },
  container: {
    height: '90%',
  },
  containerHeading: {
    fontSize: 23,
    // fontFamily: 'Poppins',
    color: '#2A72DE',
    fontWeight: '900',
  },
  description: {
    fontSize: 19,
    color: '#ffff',
  },
  planCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
