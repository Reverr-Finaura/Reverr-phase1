import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SocialHandle(props) {
  const {title, iconName} = props;
  return (
    <>
      <TouchableOpacity style={styles.container}>
        <Image source={require('../../assets/images/Rectangle.png')} />
        <Icon name={iconName} color={'white'} size={16} style={styles.logo} />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}
