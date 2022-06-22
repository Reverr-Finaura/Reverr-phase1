import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';

export const PlansCard = props => {
  const {title} = props;
  return (
    <TouchableOpacity style={{top: 80}}>
      <Image
        source={require('../../assets/images/Rectangle3.png')}
        style={styles.card}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
