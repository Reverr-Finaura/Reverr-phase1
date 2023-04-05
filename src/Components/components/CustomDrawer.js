import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { DrawerContentScrollView,DrawerItemList } from "@react-navigation/drawer";
import LinearGradient from "react-native-linear-gradient";
import Theme from "../../utils/Theme";

function CustomDrawer(props){
    return(
    <LinearGradient colors={['#1B1D8B', Theme.backgroundColor]} style={styles.container}>
       <View style={styles.contentHolder}>
       <LinearGradient colors={['#3D85E3', '#79C0F2']} style={styles.imgborder}>
       <Image source={Theme.userguy} style={styles.img} />
       </LinearGradient>
       <View>
       <View style={{marginTop:20,flexDirection:'row',alignItems:'center'}}>
            <Text style={styles.usertitle}>Jatin Khurana</Text>
            <Image source={Theme.verify} style={styles.verify} />
        </View>
       </View>
       </View>


        <DrawerContentScrollView>
        <DrawerItemList {...props} />
        </DrawerContentScrollView>

       <View style={styles.label}>
        <Text style={styles.labeltext}>Upgrade to Premium</Text>
        <Text style={styles.labeltext}>and receive exclusive access to</Text>

        <TouchableOpacity style={styles.upgd}>
          <Text style={{fontSize:14,color:'#FFF',fontWeight:'bold'}}>Upgrade</Text>
        </TouchableOpacity>
       </View>

     </LinearGradient>
    )}
export default CustomDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img:{
        height:110,
        width:110,
        resizeMode:'contain',
        borderRadius:100
      },
    imgborder:{
        height:115,
        width:115,
        resizeMode:'contain',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        marginTop:25
    },
    contentHolder:{
        alignItems:'center',
        paddingTop:'25%'
    },
    usertitle:{
        color:'#FFF',
        fontSize:20,
        fontWeight:'bold',
    },
    verify:{
        height:25,
        width:25,
        resizeMode:'contain',
        marginLeft:5
    },
    label:{
        position:'absolute',
        bottom:'8%',
        alignItems:'center',
    },
    labeltext:{
        color:'#FFF',
        fontWeight:'bold',
        fontSize:15,
        paddingHorizontal:20
    },
    upgd:{
        resizeMode:'contain',
        borderRadius:100,
        width:'75%',
        height:45,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Theme.primaryColor,
        alignSelf:'center',
        marginTop:15
    },
});