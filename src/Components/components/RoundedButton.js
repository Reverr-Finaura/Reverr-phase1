import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import Theme from "../../utils/Theme";

function RoundedButton({label}){
    return(
    <View style={styles.container}>
        <Text style={{color:'#FFF',fontWeight:'500',fontSize:12}}>{label}</Text>
    </View>
    )}
export default RoundedButton;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:12,
        paddingVertical:5,
        borderRadius:100,
        backgroundColor:Theme.primaryColor,
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,
        marginBottom:10
    }
});