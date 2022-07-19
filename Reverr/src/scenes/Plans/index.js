import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
  } from 'react-native';
  import React, {useState} from 'react';
  import { IndividualHeaderLayout as HeaderLayout } from '../../Components';
  import { BackButton } from '../../Components';
  import {useNavigation} from '@react-navigation/native';
  import { AppColors } from '../../utils';
  import { paymentType } from '../../utils';
  import LinearGradient from 'react-native-linear-gradient';
  import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
  import firestore from '@react-native-firebase/firestore';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
  //import {UserContext} from '../../App';
  
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
  
  const Plans = props => {
    const navigation = useNavigation();
    const [loading,setLoading]=useState(false); 
    const state=useSelector(state=>state.UserReducer);
    const mentor = props?.route?.params?.mentor || 'jatin.dsquare@gmail.com';
    const mentorOrders = props?.route?.params?.orders ;
    const mentorClients = props?.route?.params?.clients;
    const timeArray=['Hourly','Monthly','Quaterly','Semi-Annual']
    const plans = props?.route?.params?.plans || ['1','200','300','400'];
    const [column, setColumn] = useState(2);
    //const {state, dispatch} = useContext(UserContext);
    const payment = async (plan) => {
      if (state.user.mentors.includes(mentor)) {
        alert('go to appoinment ');
      } else {
        // console.log(plan);
        var oId = makeid(12);
        // console.log("oid: ",oId[0]);
        const order = {
          orderId: oId,
          currency: 'INR',
          amount: plan,
          secret:"$2b$10$wu8ujbqHIaelkAQ.MfmRE.eVx.7iVOBfbyIbsD1zRSWvgzsFf4goe"
        };

        const headers={
          'Content-Type': 'application/json',
        }
        
          const res=await axios.post('https://reverrserver.herokuapp.com/cftoken',order,{
            headers:headers
          }).then((res)=>{
            //console.log(res.data)
            order.token =res.data.cftoken;
            cashfree(order);
            setLoading(false);
             //console.log(order); 
          })
          // .then(data => {
          //   order.token = data.cftoken;
          //   //cashfree(order);
          //   console.log(order);
          // }).catch(e=>{
          //   alert('Error in payment gateway!')
          // });
          
      }
    };
  
    const cashfree = order => {
      var env = 'TEST';
      var map = {
        orderId: order.orderId,
        orderAmount: order.amount,
        appId: '21235619dae90a7c71fa82b24c653212',
        tokenData: order.token,
        orderCurrency: order.currency,
        orderNote: ' ',
        notifyUrl: 'https://test.gocashfree.com/notify',
        customerName: state.user.name,
        customerPhone: state.user.mobile,
        customerEmail: state.user.email,
      };
      RNPgReactNativeSDK.startPaymentWEB(map, 'PROD', result => {
        var payment = {
          paymentMode: '',
          orderId: '',
          txTime: '',
          referenceId: '',
          txMsg: '',
          signature: '',
          orderAmount: '',
          txStatus: '',
          vendor: mentor,
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
  
    const handleResponse = res => {
      var id;
      firestore()
        .collection('Payments')
        .add(res)
        .then(data => {
          // console.log("added successfully",data._documentPath._parts[1])
          id = data._documentPath._parts[1];
          console.log("payemnt:"+id);
          console.log(res);
          //updateUser(id, res);
        });
    };
  
    const updateUser = (id, res) => {
      order = firestore().collection('Payments').doc(id);
      dispatch({type: 'NEWPAYMENT', payload: order});
      firestore()
        .collection('Users')
        .doc(state.user.email)
        .update({orders: [...state.user.orders, order]});
      firestore()
        .collection('Users')
        .doc(mentor)
        .update({orders: [...mentorOrders, order]});
      if (res.txStatus == 'SUCCESS') {
        firestore()
          .collection('Users')
          .doc(state.email)
          .update({mentors: [...state.user.mentors, mentor]});
        firestore()
          .collection('Users')
          .doc(mentor)
          .update({clients: [...mentorClients, state.user.email]});
        
        //create msg path here;
      }
    };
  if(loading){
    return(
    <View style={styles.main}>
      <ActivityIndicator size="large" color="#fff"  style={{marginHorizontal:50,marginVertical:80}}/>
    </View>
    );
  }
    return (
      // <HeaderLayout>
      <View styles={styles.main}>
        <View style={{flexDirection: 'row', alignItems: 'center',backgroundColor: AppColors.primarycolor,}}>
          <BackButton
            IconSize={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headerText}>Plans</Text>
        </View>
        <View style={styles.screen}>
          <FlatList
            data={plans}
            numColumns={column}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('PlanDetails', {PlanType: item.name});
                  setLoading(true);
                  payment(plans[index]);
                  // const res = {"paymentMode":"UPI","orderId":"yPrUaDcq8snr","txTime":"2022-05-18 18:12:43","referenceId":"961363226","type":"CashFreeResponse","txMsg":"00::Transaction Success","signature":"nRtL0g23HVsQIWBbzvnbuiUu8As13v4YxQmRk+23L0A=","orderAmount":"1.00","txStatus":"SUCCESS"} ;
                  // handleResponse(res);
                }}>
                <LinearGradient
                  colors={[AppColors.primarycolor, '#012437']}
                  start={{x: 0.5, y: 1.3}}
                  end={{x: 1, y: 0.5}}
                  style={styles.Card}>
                  <Text style={styles.time}>{timeArray[index]}</Text>
                  <Text style={styles.name}>₹{plans[index]}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>
        </View>
      //  </HeaderLayout>
      
    );
  };
  const styles = StyleSheet.create({
    screen: {
      // flex: 1,
      height:'100%',
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '20%',
      //marginHorizontal:10,
      paddingHorizontal:10,
      backgroundColor: AppColors.primarycolor,
    },
    main:{
      flex:1,
      height:"100%",
      backgroundColor: AppColors.primarycolor,
      width:'100%',
      paddingTop:10
    },
    headerText: {
      color: AppColors.FontsColor,
      fontFamily: 'Poppins-Regular',
      fontSize: 20,
      marginStart: '4%',
    },
    Card: {
      marginHorizontal: 8,
      alignItems: 'center',
      borderRadius: 9,
      justifyContent: 'center',
      marginVertical: 5,
      height: Height / 5,
      width: Width / 2.5,
    },
    name: {
      color: AppColors.FontsColor,
      fontFamily: 'Poppins-SemiBold',
    },
    time:{
      color: AppColors.FontsColor,
      fontFamily: 'Poppins-SemiBold',
      fontWeight:'bold',
      fontSize:20
    }
  });
  export {Plans};
  