import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {CustomImage} from '../CustomImage';
import Icon from 'react-native-vector-icons/Fontisto';
import styles from './styles';

export const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <CustomImage source={require('../../assets/images/Profile.png')} />

      <CustomImage source={require('../../assets/images/Calendar.png')} />

      <Image
        source={require('../../assets/images/logo.png')}
        style={{marginRight: 16}}
      />

      <TouchableOpacity>
        <Icon name="bell" size={24} color="#D6D6D6" />
      </TouchableOpacity>

      <CustomImage source={require('../../assets/images/Message.png')} />
    </View>
  );
};
