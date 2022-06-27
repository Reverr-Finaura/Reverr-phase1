import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useState,useEffect } from 'react';
import { AppColors } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Redux/actions';
import auth from '@react-native-firebase/auth'
//import { AuthContext } from '../Navigations/AuthProvider';

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;


const IntroSplash = () => {

    const navigation = useNavigation();
    //const [user, setUser] = useState(AuthContext);
    const [initializing, setInitializing] = useState(true);
    const [user, setuser] = useState();
    const state=useSelector(state=>state.UserReducer);
    const dispatch=useDispatch();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setuser(user);
    //console.log(user);
    //dispatch(add_user(user))
    if (initializing) setInitializing(false);
  }
useEffect(() => {
    setTimeout(() => {
        auth().onAuthStateChanged(user=>{
            if(!user){
                //console.log("Got user");
                navigation.replace("Login")
                }else{
                    dispatch(setUser(user.email));
                    //auth().currentUser
                    navigation.navigate('IndividualProfile');
                }
        })
        
        //console.log("Got user");
    }, 2000)
}, []);
    


    return (
        <View style={styles.Screen}>
            <View style={styles.container}>
                <Image style={styles.Logo} source={require("../../assets/images/MainLogo.png")} />
                <View style={styles.textContainer}>
                    <Text style={styles.logoText}>Reverr</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Screen: {
        flex: 1,
        backgroundColor: AppColors.primarycolor
    },
    container: {
        alignItems: 'center'
    },
    Logo: {
        marginTop: 100
    },
    logoText: {
        color: 'gray',
        fontFamily: "Poppins-Bold",
        fontSize: 35,
    },
    textContainer: {
        position: 'absolute',
        marginTop: 320

    }
})

export {IntroSplash}; 
