import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef, useCallback} from 'react';
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
  ImageBackground,
} from 'react-native';

// import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import axios from 'axios';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import firestore from '@react-native-firebase/firestore';
import {AppColors} from '../utils';
import Theme from '../utils/Theme';
import {BackButton} from '../Components/Buttons/BackButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Width = Dimensions.get('window').width;

const PremiumPlans = () => {
  const navigate = useNavigation();
  const state = useSelector(state => state.UserReducer);
  console.log('userData', state.user);
  const [loader, setLoader] = useState(false);
  const CardRef = useRef();
  const [ListIndex, setListIndex] = useState(0);
  const [viewwedItemIndex, setViewwedItemIndex] = useState();
  const [selectedPlan, setSelectedPlan] = useState({});
  // const onViewRef = useRef(({changed}) => {
  //   setListIndex(changed[0].index);
  // });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const PlanData = [
    {
      name: 'Monthly',
      id: 0,
      price: '499',
      text: 'Buy 1 MONTH',
    },
    {
      name: 'Quaterly',
      id: 1,
      price: '1299',
      text: 'Buy 3 MONTH',
    },
    {
      name: 'Semi-Annually',
      id: 2,
      price: '4999',
      text: 'Buy 6 MONTH',
    },
  ];

  const onViewCallBack = useCallback(viewableItems => {
    // console.log(viewableItems.changed[0]);
    setSelectedPlan(viewableItems.changed[0].item);
    setViewwedItemIndex(viewableItems.changed[0].index);
    // Use viewable items in state or as intended
  }, []); // any dependencies that require the function to be "redeclared"
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
    <View style={styles.mainContainer}>
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
      <View style={styles.container}>
        <View
          style={{
            marginTop: 15,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingStart: '6%',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: AppColors.FontsColor,
              fontSize: 22,
            }}>
            Choose your{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: AppColors.ActiveColor,
              fontSize: 22,
            }}>
            Plan{' '}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: AppColors.BtnClr,
            marginStart: '6%',
          }}>
          Lorem ipsum is a dummy text used for typography
        </Text>
        <View
          style={{
            marginTop: 50,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* linear-gradient(202.17deg, rgba(0, 119, 183, 0.55) 3.78%, rgba(42, 114, 222, 0.1705) 38.41%, rgba(42, 114, 222, 0.55) 63.23%, rgba(0, 119, 183, 0) 114.61%); */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={PlanData}
            pagingEnabled={true}
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewCallBack}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <View
                style={{
                  width: Width,
                  paddingHorizontal: '4%',
                }}>
                <LinearGradient
                  colors={
                    index == 0
                      ? ['#02e1eb', '#047378']
                      : index == 1
                      ? ['#1ba3f7', '#014975']
                      : ['#752bed', '#3c0c8a']
                  }
                  style={{
                    zIndex: 10,
                    borderRadius: 20,
                    width: '100%',
                    height: 340,
                  }}>
                  <View style={styles.planCard}>
                    <Text
                      style={{
                        marginTop: 20,
                        color: '#fff',
                        fontSize: 30,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {item.name}
                    </Text>
                    <View
                      style={{
                        width: '70%',
                        height: 1.6,
                        backgroundColor: AppColors.FontsColor,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: '5%',
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
                          fontSize: 38,
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        {item.price}
                        {`${
                          index == 0
                            ? '/Month'
                            : index === 1
                            ? '/3Month'
                            : '/6Month'
                        }`}
                      </Text>
                    </View>

                    <View
                      // onPress={() => getPriceHandler(item.price, item.name)}
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
                        {item.text}
                      </Text>
                    </View>
                    <Text
                      style={{
                        marginTop: 22,
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '600',
                      }}>
                      ‘Click’ to know more
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            )}
          />
          <FlatList
            data={[1, 2, 3]}
            horizontal
            renderItem={({item, index}) => (
              <View style={{marginTop: 30}}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor:
                      index === viewwedItemIndex
                        ? AppColors.ActiveColor
                        : AppColors.BtnClr,
                    borderRadius: 20,
                    margin: 10,
                  }}
                />
              </View>
            )}
          />
          <View
            style={{
              marginTop: '6%',
              width: Dimensions.get('window').width,
              paddingHorizontal: 30,
              paddingTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigate.navigate('selectedPlan', {
                  planDetails: selectedPlan,
                });
              }}
              style={{
                borderRadius: 20,
                width: '50%',
                alignItems: 'center',
                backgroundColor: '#2A72DE',
                paddingHorizontal: 20,
                paddingVertical: 7,
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 18,
                  fontFamily: 'Poppins-Bold',
                }}>
                Select
              </Text>
            </TouchableOpacity>
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
      </View>
    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '3%',
  },
  backBtn: {
    position: 'absolute',
    left: 10,
  },
  container: {
    height: '90%',
  },
  containerHeading: {
    fontFamily: 'Poppins-Regular',
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