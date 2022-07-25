import {View, Text, StyleSheet, Dimensions,ToastAndroid,ScrollView} from 'react-native';
import React from 'react';
//import {notification} from '../dummy-data/notificationData';
//import HeaderLayout from '../Screens/HomeScreens/HeaderLayout';
import { IndividualHeaderLayout } from '../../Components';
import { AppColors } from '../../utils';
import { CustomButton } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { RemoveNotification,RemoveNotificationInstance } from '../../Redux/actions';
//import { grey100 } from 'react-native-paper/lib/typescript/styles/colors';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Notifications = () => {
    const state=useSelector(state=>state.UserReducer); 
    const dispatch=useDispatch();
    const navigation=useNavigation();
    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      };
    const redirectToChatScreen=async(item,index)=>{
        //console.log(item);
        await firestore().collection('Users').doc(item.subject).get().then(user=>{
            dispatch(RemoveNotification(state.user.email,item,index));
            navigation.navigate('ChatScreen',{
                userData:user._data
            });
        }).catch(e=>{
            showToast("Error! please check your internet Connection");
        })
    }
    const handleAppointmentApprove=async(item,index)=>{
        var obj_ref={
            subject:state.user.email,
            message:'Your Request has been approved',
            type:'notify',
            email:item.subject
        }
        await firestore().collection('Users').doc(item.subject).update({
            notifications:firestore.FieldValue.arrayUnion(obj_ref)
        }).then(()=>{
            dispatch(RemoveNotification(state.user.email,item,index));
            showToast("Approval Notified");
        }).catch(e=>{
            showToast("Error! check your network connection")
        })
    }
    const handleAppointmentDecline=async(item,index)=>{
        var obj_ref={
            subject:state.user.email,
            message:'Your Request has been Declined',
            type:'notify',
            email:item.subject
        }
        await firestore().collection('Users').doc(item.subject).update({
            notifications:firestore.FieldValue.arrayRemove(obj_ref)
        }).then(()=>{
            dispatch(RemoveNotificationInstance(index));
            showToast("Denial Notified");
        }).catch(e=>{
            showToast("Error! check your network connection")
        })
    }

    return (
    <IndividualHeaderLayout>
      <ScrollView>
        <Text style={styles.type}>New</Text>
        <View style={styles.main}>
          {state?.user?.notifications &&
            state.user.notifications.length > 0 &&
            state.user.notifications.map((item, index) => (
              <View key={index} style={styles.container}>
                <Text style={styles.notihead}>{item?.subject}</Text>
                <Text style={styles.noti}>{item?.message}</Text>
                {item?.type=='chat' && <CustomButton
                  style={styles.btn}
                  TextStyle={styles.btntxt}
                  Title="View session details"
                  onPress={() => {
                    if(item.type=='chat'){
                        redirectToChatScreen(item,index)
                    }
                //     navigation.navigate('ChatScreen',{
                //     userData:item.subject
                //   })
                }}
                />}
                {item?.type=='appointment' && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:Dimensions.get('window').width}}>
                <CustomButton
                  style={styles.button}
                  TextStyle={styles.btntxt}
                  Title="Approve"
                  onPress={() => {
                    handleAppointmentApprove(item,index);
                }}
                />
                <CustomButton
                  style={styles.button}
                  TextStyle={styles.btntxt}
                  Title="Decline"
                  onPress={() => {
                    handleAppointmentDecline(item,index);
                }}
                />
                    </View>}
              </View>
            ))}
        </View>
      </ScrollView>
    </IndividualHeaderLayout>
  );
};
const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
  },
  type: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    marginStart: '5%',
  },
  container: {
    paddingVertical: '2%',
  },
  noti: {
    color:'grey',
    fontFamily: 'Poppins-thin',
    fontSize: 14,
  },
  notihead: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-thin',
    fontSize: 16,
  },
  btn: {
    marginTop: '2%',
    paddingVertical: '1%',
    paddingHorizontal: '5%',
  },
  button:{
    marginTop: '2%',
    paddingVertical: '1%',
    width:Dimensions.get('window').width/2
  },
  btntxt: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Light',
    fontSize: 16,
  },
});
export {Notifications};
