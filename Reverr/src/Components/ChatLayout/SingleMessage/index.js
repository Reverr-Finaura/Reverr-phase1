import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export const MessageContainer = props => {
  const {image, name, message, time} = props.message;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ChatScreen')}>
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.image} source={image} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          bottom: 24,
          left: 16,
        }}>
        <Text numberOfLines={1} style={styles.message}>
          {message}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};
