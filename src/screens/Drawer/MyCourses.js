import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function MyCourses({navigation}){
    return(
    <View style={styles.container}>
        <Text>MyCourses</Text>
    </View>
    )}
export default MyCourses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});