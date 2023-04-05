import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import GradientHeader from "../Components/components/GradientHeader";
import ProfileCard from "../Components/components/ProfileCard";
import Theme from "../utils/Theme";

function Premium({navigation}){
    return (
      <View style={{ flex: 1 }}>
        <GradientHeader />
        <LinearGradient
          colors={[Theme.backgroundColor, "#1B1D8B"]}
          style={styles.container}
        >
          <Text style={styles.title}>
            Buy premium to connect with people who are interested in your
            profile
          </Text>
          <Text style={styles.bluetitle}>
            William and 9 others liked your profile
          </Text>

          <ProfileCard />

          {/* <ProfileCard/>
        <ProfileCard/>
        <ProfileCard/> */}
          <ImageBackground
            imageStyle={{ width: "100%", resizeMode: "contain" }}
            source={Theme.blurview} style={[styles.blur]}>
            <TouchableOpacity style={[styles.btn,styles.shadowProp]}>
              <Text style={{ fontSize: 16, color: "#FFF", fontWeight: "bold" }}>
                Get Premium
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </LinearGradient>
      </View>
    );}
export default Premium;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'space-evenly',
        width:'100%'
    },
    title:{
        color:'#FFF',
        fontWeight:'600',
        fontSize:20,
        paddingHorizontal:20,
        textAlign:'center',
        marginTop:25
    },
    bluetitle:{
        color:Theme.primaryColor,
        fontWeight:'600',
        fontSize:14,
        paddingHorizontal:20,
        textAlign:'center',
        marginVertical:15
    },
    blur:{
        width:'85%',
        height:360,
        resizeMode:'contain',
        alignItems:'center',
        justifyContent:'center'
    },
    btn:{
        resizeMode:'contain',
        borderRadius:100,
        width:'90%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Theme.primaryColor,
        alignSelf:'center'
    },
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: {width: -15, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 25,
    },
});