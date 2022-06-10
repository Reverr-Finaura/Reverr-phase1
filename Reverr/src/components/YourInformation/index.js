import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export const YourInformation = props => {
  const {iconName, question, answers} = props;
  return (
    <View style={styles.container}>
      <Icon name={iconName} color={'white'} size={32} />
      <Text style={styles.text}>{question}</Text>
      <TouchableOpacity>
        <Text style={styles.answer}>
          {answers}
          <Image source={require('../../assets/images/CaretRight.png')} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
