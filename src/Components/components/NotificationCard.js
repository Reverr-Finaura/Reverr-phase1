import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

function NotificationCard({active,desc,username,photo,ago}){
    return(
        <TouchableOpacity style={{paddingHorizontal:8}}>
        <LinearGradient start={{ x: 0, y: 1 }}
        end={{ x:1, y: 1 }} colors={['#1B2E49', '#0D1827']} style={styles.container}>
         <View style={[styles.barWrapper,{backgroundColor:active ? 'blue' : null}]}/>
         <View style={styles.imgWrapper}>
         <Image source={photo} style={styles.img} />
         </View>
         <View style={styles.contentWrapper}>
         <Text style={styles.usertitle}>{username}</Text>
         <Text numberOfLines={3} style={styles.userdesc}>{desc}</Text>
         </View>
         <Text style={styles.ago}>{ago}</Text>
        </LinearGradient>
        </TouchableOpacity>
)}
export default NotificationCard;

const styles = StyleSheet.create({
    container: {
       width:'100%',
       borderRadius:5,
       marginBottom:10,
       alignItems:'center',
       flexDirection:'row',
       height:110,
    },
    img:{
        height:55,
        width:55,
        borderRadius:100
    },
    imgWrapper:{
        width:'20%',
        height:'100%',
        alignItems:'center',
        paddingTop:15
    },
    barWrapper:{
        width:'1.5%',
        height:'100%'
    },
    contentWrapper:{
        width:'70%',
        height:'100%',
        paddingHorizontal:5,
        justifyContent:'center',
    },
    usertitle:{
        color:'#FFF',
        fontSize:16,
        fontWeight:'bold'
    },
    userdesc:{
        color:'#FFF',
        fontSize:12,
        marginTop:5,
        lineHeight:18
    },
    ago:{
        color:'#FFF',
        opacity:0.5,
        fontSize:13,
        position:'absolute',
        top:15,
        right:10
    }
});