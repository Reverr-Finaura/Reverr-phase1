import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Theme from "../../../utils/Theme";

function AppointmentCard(){
    return(
        <LinearGradient colors={['#030F2D', '#0B2661']} style={styles.container}>
        <Text style={styles.title}>Appointment</Text>
        <Text style={styles.rate}>Rs. 1500/Hour</Text>
        <Text style={styles.desc}>Half-Hourly sessions + Free Introductory sessions</Text>
        </LinearGradient>
    )}
export default AppointmentCard;

const styles = StyleSheet.create({
    container: {
       width:'100%',
       borderRadius:15,
       marginTop:15,
       paddingVertical:25,
       paddingHorizontal:25
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:Theme.primaryColor,
    },
    desc:{
        fontSize:14,
        fontWeight:'400',
        color:'#fff',
        paddingTop:2,
    },
    rate:{
        fontSize:14,
        fontWeight:'bold',
        color:'#fff',
        paddingTop:10,
    }
});