import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import Theme from "../../utils/Theme";

function Stars({rating}){
    return(
    <View style={styles.container}>
        <Image source={rating > 0 ? Theme.starfill : Theme.star} style={styles.star} />
        <Image source={rating > 1 ? Theme.starfill : Theme.star} style={styles.star} />
        <Image source={rating > 2 ? Theme.starfill : Theme.star} style={styles.star} />
        <Image source={rating > 3 ? Theme.starfill : Theme.star} style={styles.star} />
        <Image source={rating > 4 ? Theme.starfill : Theme.star} style={styles.star} />
    </View>
    )}
export default Stars;

const styles = StyleSheet.create({
    container: {
       flexDirection:'row',
       alignItems:'center'
    },
    star:{
        marginRight:2,
        height:12,
        width:12,
        resizeMode:'contain'
    }
});