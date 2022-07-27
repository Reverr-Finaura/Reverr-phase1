import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppColors} from '../../../utils/Constants';
import {IndividualHeaderLayout} from '../../../Components';
import mentors from '../../../assets/data/mentors';
import {useDispatch, useSelector} from 'react-redux';
import { UpdateApointmentInstance } from '../../../Redux/actions';
import firestore from '@react-native-firebase/firestore';

const AppoinmentScreen = () => {
  const state = useSelector(state => state.UserReducer);
  //console.log("Head:"+state.user.Appointement_request);
  const dispatch=useDispatch();
  const [reRender, setReRender] = useState(false);
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

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const Accept = async (item, index) => {
    //console.log(index);
    
    //console.log("ref:"+state.user.Appointement_request)
    var basket = [];
    for (let i = 0; i < state?.user?.Appointement_request.length; i++) {
      //console.log(state.user.Appointement_request[i]);
      if (item==state.user.Appointement_request[i]) {
        var obj = {
          ...state.user.Appointement_request[i],
          approved: true,
        };
        basket.push(obj);
      } else {
        basket.push(state.user.Appointement_request[i]);
      }
     //console.log(basket[i]) 
    }

    //dispatch(UpdateApointmentInstance(index))
    //console.log("basket:"+basket);
    await firestore()
      .collection('Users')
      .doc(state.user.email)
      .update({
        Appointement_request: basket,
      })
      .then(async () => {
        dispatch(UpdateApointmentInstance(index))
        await firestore()
          .collection('Users')
          .doc(item.client_email)
          .update({
            notifications: firestore.FieldValue.arrayUnion({
              subject: state.user.email,
              message: 'Your Request has been approved',
              type: 'notify',
              email: item.client_email,
            }),
          })
          .then(() => {
            //alert('Accepted');
            showToast("Event Accepted!")
            setReRender(true);
          });
      });
  };

  //useEffect(() => {}, [reRender]);

  return (
    <View style={Styles.screen}>
      <IndividualHeaderLayout>
        <View style={{marginHorizontal: '4%', paddingBottom: '20%'}}>
          <FlatList
            data={state.user.Appointement_request}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View
                key={index}
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginVertical: '4%',
                }}>
                <ImageBackground
                  style={Styles.card}
                  source={require('../../../assets/images/cardBg.png')}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={item.image} />
                    <View style={{marginStart: '12%'}}>
                      <Text
                        style={{
                          color: AppColors.BtnClr,
                          fontSize: 20,
                          fontWeight: '500',
                        }}>
                        {item.client_email}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            color: AppColors.FontsColor,
                            fontWeight: '500',
                          }}>
                          {item.date}
                        </Text>
                        <Text
                          style={{
                            color: AppColors.FontsColor,
                            paddingHorizontal: '2%',
                            fontWeight: '500',
                          }}>
                          {montharr[item.month - 1]}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: AppColors.FontsColor,
                        }}>
                        Starting time {item.time}
                      </Text>
                    </View>
                  </View>
                  {item.approved == true ? (
                    <View style={{alignItems: 'center', marginTop: '5%'}}>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={[Styles.button, {backgroundColor: 'gray'}]}>
                        <Text style={{color: AppColors.FontsColor}}>
                          Approved
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: '5%',
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                          Accept(item, index);
                        }}
                        style={[Styles.button, {backgroundColor: 'green'}]}>
                        <Text style={{color: AppColors.FontsColor}}>
                          Accept
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.6}
                        style={[Styles.button, {backgroundColor: 'blue'}]}>
                        <Text style={{color: AppColors.FontsColor}}>
                          Reschedule
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </ImageBackground>
              </View>
            )}
          />
        </View>
      </IndividualHeaderLayout>
    </View>
  );
};
const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  card: {
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    borderRadius: 12,
  },
  button: {
    paddingHorizontal: '10%',
    paddingVertical: '2%',
    borderRadius: 6,
  },
});
export {AppoinmentScreen};
