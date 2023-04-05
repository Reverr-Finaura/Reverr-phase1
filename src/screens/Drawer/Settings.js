import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function Settings({navigation}){
    return(
    <View style={styles.container}>
        <Text>Settings</Text>
    </View>
    )}
export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});