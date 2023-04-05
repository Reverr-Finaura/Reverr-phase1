import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

function ProfileTitle({title,textOne,textTwo}){
    return(
    <View style={styles.container}>

       <View style={{width:'40%'}}>
       <Text style={styles.tabTitle}>{title}</Text>
       </View>


       <View style={styles.wrapper}>
       <View>
        <Text style={styles.about}>{textOne}</Text>
        {textTwo?<Text style={styles.desig}>{textTwo}</Text>:null}
       </View>
       </View>


    </View>
    )}
export default ProfileTitle;

const styles = StyleSheet.create({
    container: {
       padding:20,
       flexDirection:'row',
    },
    tabTitle:{
        fontWeight:'bold',
        fontSize:16,
        color:'#8AB9FF'
    },
    wrapper:{
        width:'60%',
    },
    about:{
        fontWeight:'bold',
        fontSize:16,
        color:'#fff',
    },
    desig:{
        fontSize:14,
        color:'#fff',
        opacity:0.5,
        marginTop:5
    },
});