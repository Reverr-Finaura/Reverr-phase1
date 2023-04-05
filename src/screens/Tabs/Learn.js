import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function Learn({navigation}){
    return(
    <View style={styles.container}>
        <Text>Learn</Text>
    </View>
    )}
export default Learn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});