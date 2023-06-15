import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Theme from "../../utils/Theme";

function HowToMeet({htm}){
    return(
    <View style={styles.container}>

       <Text style={styles.tabTitle}>How can we meet?</Text>


       <View style={styles.wrapper}>
        {htm.includes('Video Call')&&
       <LinearGradient style={styles.card} colors={['#76BAFA', '#6F88ED',]}>
        <Image source={Theme.meet1} style={styles.meet} />
        <Text style={styles.label}>Video Call</Text>
       </LinearGradient>
        }   
        {(htm.includes('Phone Call') || htm.includes('Local Cafe')) &&
       <LinearGradient style={styles.card} colors={['#76BAFA', '#6F88ED',]}>
       <Image source={Theme.meet2} style={styles.meet} />
       <Text style={styles.label}>Phone call</Text>
        </LinearGradient>
        }
        {htm.includes('At Coffee')&&
        <LinearGradient style={styles.card} colors={['#76BAFA', '#6F88ED',]}>
        <Image source={Theme.meet3} style={styles.meet} />
        <Text style={styles.label}>At Coffee</Text>
        </LinearGradient>
        }
       </View>


    </View>
    )}
export default HowToMeet;

const styles = StyleSheet.create({
    container: {
       padding:20,
    },
    tabTitle:{
        fontWeight:'bold',
        fontSize:16,
        color:'#8AB9FF'
    },
    wrapper:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    card:{
        width:'30%',
        height:120,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    meet:{
        width:55,
        height:55,
        resizeMode:'contain'
    },
    label:{
        fontSize:12,
        fontWeight:'600',
        marginTop:5
    }
});