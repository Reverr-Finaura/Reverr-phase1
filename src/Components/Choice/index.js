import React from 'react';
import {View, StyleSheet,Text} from 'react-native';

const Choice = ({type}) => {
    const choice=type=='Like'?'green':'red';
    return (
        <View style={[styles.container,{borderColor:choice}]}>
            <Text style={[styles.text,{color:choice}]}>{type}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        borderWidth:7,
        paddingHorizontal:15,
        borderRadius:15,
        // borderColor:'#fff',
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    text:{
        textTransform:'uppercase',
        fontSize:40,
        fontWeight:'bold',
        letterSpacing:4,
        //color:'#fff'
    }
})

export {Choice};
