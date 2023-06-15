import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function BulletSubPoint({title,titletwo}){
    return(
   <View>
    <Text numberOfLines={1} style={styles.container}>• {title}</Text>
    <Text numberOfLines={1} style={styles.subtitle}>  {titletwo}</Text>
   </View>
    )}
export default BulletSubPoint;

const styles = StyleSheet.create({
    container: {
        color:'#fff',
        fontSize:14,
        marginTop:10
    },
    subtitle: {
        color:'#A6A6A6',
        fontSize:12,
        lineHeight:18,
        opacity:0.8
    }
});