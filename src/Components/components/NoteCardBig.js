import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";


function NoteCardBig(){
    return(
        <LinearGradient colors={['#030F2D', '#0B2661']} style={styles.container}>
        <Text style={styles.title}>Funding?</Text>
        <Text style={styles.desc}>Terminal where all industrial and profitmaking venture that will get the best research report.</Text>
        <View style={{height:35}}/>
        <Text style={styles.title}>Eligibility :</Text>
        <Text style={styles.desc}>• XYZXYZ</Text>
        <Text style={styles.desc}>• Market Research Mentor </Text>
        <Text style={styles.desc}>• XYZXYZ</Text>
        <Text style={styles.desc}>• Market Research Mentor </Text>
        </LinearGradient>
    )}
export default NoteCardBig;

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
        color:'#FFF'
    },
    desc:{
        fontSize:14,
        fontWeight:'400',
        color:'#A6A6A6',
        paddingTop:5,
        lineHeight:20
    }
});