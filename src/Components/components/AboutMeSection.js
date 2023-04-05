import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import Theme from "../../utils/Theme";

function AboutMeSection({navigation}){
    return(
    <View style={styles.container}>
        <Text style={styles.tabTitle}>About Me</Text>
        <Text style={styles.about}>I like being aware of new things around me</Text>
        <Text style={styles.para}>I am a marketing research , looking for mentorship. I am an IIM Bangalore graduate and have worked with Fintech  for 5 years.</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={Theme.location} style={{height:15,width:15,resizeMode:'contain',marginRight:10}} />
            <Text style={styles.about}>New Delhi, India</Text>
        </View>
    </View>
    )}
export default AboutMeSection;

const styles = StyleSheet.create({
    container: {
       padding:20
    },
    tabTitle:{
        fontWeight:'bold',
        fontSize:16,
        color:'#8AB9FF'
    },
    about:{
        fontWeight:'bold',
        fontSize:14,
        color:'#fff',
        marginVertical:15
    },
    para:{
        fontSize:15,
        color:'#fff',
        marginVertical:15
    }
});