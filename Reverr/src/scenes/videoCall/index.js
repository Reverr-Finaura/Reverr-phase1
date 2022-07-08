import React,{useState} from "react";
import { Text,View } from "react-native-paper";
import AgoraUiKit from 'agora-rn-uikit';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";

const CallEnded = () => {
    return (
      <View>
        <Text>callEnded!</Text>
      </View>
    );
  };

const VideoCall = (props)=>{
    const navigation = useNavigation();
    const token = props.route.params.token;
    const userData = props.route.params.userData;
    //const {state,dispatch} = useContext(UserContext);
    console.log("token:"+token);
    const state=useSelector(state=>state.UserReducer);
    const dispatch=useDispatch();
    const meetingEnded = async ()=>{

        const data={
            meeting:{
                channelName:"",
                host:""
            }
        }

        await firestore().collection("Users").doc(state.user.email).update(data)
        await firestore().collection("Users").doc(userData.email).update(data)

        //dispatch({type:"MEETING",payload:data})
        setvc(false);
        navigation.goBack();
        
    }

    const [vc,setvc] = useState(true)
    return vc?(
        <AgoraUiKit
            rtcProps={{
                appId:'904538e9e76546c49aabef629237f0fd',
                channel:'demo',
                token:token
            }}
            callbacks = {{EndCall:()=>meetingEnded()}}
        />    
    ):<CallEnded/>
};

export {VideoCall};