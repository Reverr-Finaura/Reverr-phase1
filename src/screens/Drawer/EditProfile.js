import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function EditProfile({navigation}){
    return(
    <View style={styles.container}>
        <Text>EditProfile</Text>
    </View>
    )}
export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});