import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function Calendar({navigation}){
    return(
    <View style={styles.container}>
        <Text>Calendar</Text>
    </View>
    )}
export default Calendar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});