import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,Button} from 'react-native';
import auth from '@react-native-firebase/auth'
//import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const Test = ({navigation}) => {
    const state=useSelector(state=>state.UserReducer);
    const[user,setUser]=useState();
    useEffect(() => {
        if(state.user){
            console.log("hello:"+ state.user.email);
        }else{
            console.log(null);
        }
    }, []);
    const handlepress=()=>{
        auth()
  .signOut()
  .then(() => {console.log('User signed out!')
  navigation.replace('Login')}
  );
    }
    return (
        <View>
           <Text>Hello Test screen</Text> 
           <Button title='logout' onPress={handlepress}/>
        </View>
    );
}

const styles = StyleSheet.create({})

export {Test};
