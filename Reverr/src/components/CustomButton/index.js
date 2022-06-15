import React from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';

import styles from './styles';

export const CustomButton = props => {
  const {title, onPress} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={require('../../assets/images/Rectangle.png')} />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
