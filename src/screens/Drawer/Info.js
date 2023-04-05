import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function Info({navigation}){
    return(
    <View style={styles.container}>
        <Text>Info</Text>
    </View>
    )}
export default Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});