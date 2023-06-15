import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Theme from "../../../utils/Theme";

function AppointmentCard({plans}){
    console.log(plans)
    return(
        <LinearGradient colors={['#030F2D', '#0B2661']} style={styles.container}>
        <Text style={styles.title}>Appointment</Text>
        <Text style={styles.rate}>Rs. {plans[0]/2} / 30 min</Text>
        <Text style={styles.desc}>Half-Hourly sessions + Free Introductory sessions</Text>
        </LinearGradient>
    )}
export default AppointmentCard;

const styles = StyleSheet.create({
    container: {
       width:'100%',
       borderRadius:15,
       marginTop:10,
       paddingVertical:15,
       paddingHorizontal:15
    },
    title:{
        fontSize:15,
        fontWeight:'bold',
        color:Theme.primaryColor,
    },
    desc:{
        fontSize:11,
        fontWeight:'400',
        color:'#fff',
        paddingTop:2,
    },
    rate:{
        fontSize:11,
        fontWeight:'bold',
        color:'#fff',
        paddingTop:10,
    }
});