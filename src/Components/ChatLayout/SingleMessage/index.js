import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export const MessageContainer = (props) => {
  //console.log(message+":"+props.item);
  const item = props.message;
  //console.log("Hello:   "+Object.keys(item))
  const navigation = useNavigation();
  const state = useSelector(state => state.UserReducer);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('ChatScreen', {
          userData: item,
        })
      }>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image style={styles.image} source={{uri: item.image}} />
        <View
          style={{
            width: '70%',
            justifyContent: 'center',
            marginHorizontal: '5%',
          }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>Tap to Chat</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
