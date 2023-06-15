import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Image
} from "react-native";
import Theme from "../../utils/Theme";

function Searchbar({navigation}){
    return(
    <View style={styles.container}>
        <TextInput placeholderTextColor={'#e5e5e5'} placeholder="Search" style={styles.input} />
        <Image source={Theme.search} style={styles.search} />
    </View>
    )}
export default Searchbar;

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#252837',
      height:37,
      width:'100%',
      borderRadius:8,
    },
    input:{
        width:'90%',
        height:'100%',
        paddingHorizontal:15,
        color:'#FFF'
    },
    search:{
        height:15,width:15,resizeMode:'contain',
        position:'absolute',
        right:10
    }
});