import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function MyBooks({navigation}){
    return(
    <View style={styles.container}>
        <Text>MyBooks</Text>
    </View>
    )}
export default MyBooks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});