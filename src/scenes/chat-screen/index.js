import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import ShortUniqueId from 'short-unique-id';
import { SendMessage } from '../../utils/FirebaseFunctionality';
import { ReciveMessage } from '../../utils/FirebaseFunctionality';
import {AppColors} from '../../utils/Constants';
import {MessageHeader} from '../../Components/MessageHeader';
import {useSelector,useDispatch} from 'react-redux';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const ChatScreen = props => {
  const state=useSelector(state=>state.UserReducer);
  const userData = props.route.params.userData;
  const [message, setmessage] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [Recive, setRecive] = useState();
  const [loading,setLoading]=useState(true);
  const navigation = useNavigation();

  const sendNotification=async(toemail,fromemail,messaage)=>{
    const obj={
      subject:state.user.email,
      message:messaage,
      email:toemail,
      type:"chat"
    }
    await firestore().collection('Users').doc(toemail).update({
      notifications:firestore.FieldValue.arrayUnion(obj),
    })
  }
  
  useEffect(() => {
    ReciveMessage(state.user, userData, setRecive);
    if(Recive?.length>0){
      setLoading(false);
    }
    setTimeout(()=>{
      setLoading(false);
    },2000);
  }, [Recive]);

 
  return (
    <LinearGradient
      style={styles.screen}
      colors={[AppColors.infoFonts, '#012437']}
      start={{x: 0.2, y: 1.1}}
      end={{x: 1.3, y: 0.6}}>
      <MessageHeader
          userData={userData}
       />
      <View style={styles.MessageInput}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={m => {
              setmessage(m);
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.CardColor,
              padding: 5,
              borderRadius: 5,
            }}
            onPress={() => {
              
              SendMessage(state.user, userData, message);
              setmessage('');
              return sendNotification(userData.email,state.user.email,"you have a new Message");
            }}>
            <Icon name="send" color={AppColors.FontsColor} size={25} />
          </TouchableOpacity>
        </View>
        
      </View>
      {loading==false ? <View>
        <FlatList
          data={Recive}
          renderItem={({item}) => (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                height: 'auto',
              }}>
              <Text
                style={{
                  color: item.sendBy == userData.email ? '#fff' : 'yellow',
                  width: '30%',
                  justifyContent: 'center',
                  borderRadius: 15,
                  padding: 10,
                  marginTop: '2%',
                  backgroundColor: AppColors.CardColor,
                  marginStart: item.sendBy == userData.email ? '2%' : '65%',
                }}>
                {item.msg == '' ? null : item.msg}
                
              </Text>
              <Text style={{paddingStart: '2%',fontSize:7,color:'#fff', marginStart: item.sendBy == userData.email ? '2%' : '85%',}}>{item.createdAt}</Text>
            </View>
          )}
        />
      </View>:<View style={{justifyContent:'center',alignItems:'center',alignContent:'center',marginVertical:100}}><ActivityIndicator size="large" color='#fff'/></View>}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  AppBar: {
    backgroundColor: AppColors.CardColor,
    paddingVertical: '1.5%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginStart: '5%',
  },
  backbtn: {
    width: 30,
    height: 30,
  },
  Name: {
    width: Width / 2,
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Bold',
    marginStart: '6%',
  },
  MessageInput: {
    bottom: 5,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    position: 'absolute',
    width: '85%',
    height: 40,
    marginStart: '2%',
  },
  input: {
    paddingStart: 8,
    width: '96%',
    paddingVertical: 8,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
});

export {ChatScreen};



