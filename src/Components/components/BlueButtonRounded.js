import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import Theme from "../../utils/Theme";

function BlueButtonRounded({label}){
    return(
    <View style={styles.container}>
        <Text style={{color:'#FFF',fontWeight:'bold',fontSize:12}}>{label}</Text>
    </View>
    )}
export default BlueButtonRounded;

const styles = StyleSheet.create({
    container: {
      backgroundColor:Theme.primaryColor,
      borderRadius:100,
      paddingHorizontal:8,
      paddingVertical:4,
      justifyContent:'center',
      alignItems:'center'
    }
});