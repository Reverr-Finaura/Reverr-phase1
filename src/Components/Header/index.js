import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {CustomImage} from '../CustomImage';
import Icon from 'react-native-vector-icons/Fontisto';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export const Header = ({customStyles = {}}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, customStyles]}>
      <CustomImage
        source={require('../../assets/images/Profile.png')}
        action={() => navigation.navigate('Settings')}
      />

      <CustomImage source={require('../../assets/images/Calendar.png')} />

      <Image
        source={require('../../assets/images/logo.png')}
      />

      <TouchableOpacity>
        <Icon name="bell" size={24} color="#D6D6D6" />
      </TouchableOpacity>

      <CustomImage
        source={require('../../assets/images/Message.png')}
        // action={() => navigation.navigate('ChatScreen')}
      />
    </View>
  );
};
