import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

export const MessageContainer = props => {
  const {image, name, message, time} = props.message;
  const navigation = useNavigation();
  const state=useSelector(state=>state.UserReducer)
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ChatScreen',{
        userData:state.user.mentors[0]
      })}>
      <Image style={styles.image} source={image} />
      <Text style={styles.name}>{name}</Text>
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
          {message}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};
