import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import Theme from "../../utils/Theme";

function ButtonStroke({haveicon,label,handlePress}){
    return(
    <TouchableOpacity onPress={handlePress} style={styles.container}>
    <Text style={{color:'#FFF',fontWeight:'bold',fontSize:12}}>{label}</Text>
    {haveicon ? <Image source={Theme.arrowright} style={{height:10,width:10,resizeMode:'contain',marginLeft:5}} /> : null}
    </TouchableOpacity>
    )}
export default ButtonStroke;

const styles = StyleSheet.create({
    container: {
     borderRadius:100,
     borderWidth:2,
     borderColor:'#FFF',
     alignItems:'center',
     justifyContent:'center',
     flexDirection:'row',
     paddingHorizontal:9,
     paddingVertical:6
    }
});