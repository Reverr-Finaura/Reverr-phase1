import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const PaymentInfo = ({payments}) => {
    const MessageList=({item})=>{
        console.log("item:"+item);
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Payment received from {item.sender.split('@')[0]} for session</Text>
                <Text style={styles.text}>Rs {item.Amount}</Text>
            </View>
        )
    }
    return (
        <View>
            <FlatList
                data={payments}
                keyExtractor={item=>item.id.toString()}
                renderItem={MessageList} 
            /> 
        </View>
    );
}

const styles = StyleSheet.create({
    text:{
        color:'#fff',
        fontSize:14,
        fontWeight:'bold'
        
    },
    container:{
        padding:10,
        margin:5,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    }
})

export {PaymentInfo};
