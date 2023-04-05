import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import Theme from "../../utils/Theme";

function FindMeOn({title}){
    return(
    <View style={styles.container}>

       <View style={{width:'40%'}}>
       <Text style={styles.tabTitle}>{title}</Text>
       </View>


       <View style={styles.wrapper}>
       <View style={styles.contentWrapper}>
        <Image source={Theme.phone} style={styles.icn}/>
        <Text style={styles.findtext}>+91781245959</Text>
       </View>

       <View style={styles.contentWrapper}>
        <Image source={Theme.email} style={styles.icn}/>
        <Text style={styles.findtext}>jatin@gmail.com</Text>
       </View>

       <View style={styles.contentWrapper}>
        <Image source={Theme.linkedin} style={styles.icn}/>
        <Text style={styles.findtext}>@katimass</Text>
       </View>


       <View style={styles.contentWrapper}>
        <Image source={Theme.twitter} style={styles.icn}/>
        <Text style={styles.findtext}>@jatinasl</Text>
       </View>
       </View>


    </View>
    )}
export default FindMeOn;

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
    icn:{
        height:13,
        width:13,
        resizeMode:'contain',
        marginRight:10
    },
    findtext:{
        fontWeight:'600',
        fontSize:14,
        color:'#fff',
    },
    contentWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15
    }
});