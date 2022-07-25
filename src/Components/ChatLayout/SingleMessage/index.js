import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

export const MessageContainer = (props) => {
  //console.log(message+":"+props.item);
  const item = props.message;
  //console.log("Hello:   "+Object.keys(item))
  const navigation = useNavigation();
  const state=useSelector(state=>state.UserReducer)
  return (
  
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ChatScreen',{
        userData:item
      })}>
      <Image style={styles.image} source={{uri:item.image}} />
      <Text style={styles.name}>{item.name}</Text>
      <View
        style={{
          //   backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-between',
          bottom: 40,
          left: 24,
          marginHorizontal: 40,
        }}>
        <Text numberOfLines={1} style={styles.message}>
          Tap to Chat
        </Text>
        {/* <Text style={styles.time}>{time}</Text> */}
      </View>
    </TouchableOpacity>
  );
};
