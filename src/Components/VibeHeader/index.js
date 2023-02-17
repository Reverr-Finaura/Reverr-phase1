import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {CustomImage} from '../CustomImage';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export const VibeHeader = ({customStyles = {}}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, customStyles]}>
      <CustomImage style={{width:40,height:40}}
        source={require('../../assets/images/Profile.png')}
        action={() => navigation.navigate('Settings')}
      />

      <Image style={{width:30,height:30}} source={require('../../assets/images/star.png')} />

      <Image style={{marginRight:0}}
        source={require('../../assets/images/logo.png')}
      />

      <TouchableOpacity>
        <Icon name="bell" size={24} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="chatbox-ellipses-outline" size={24} color="#ffffff" />
      </TouchableOpacity>

      
    </View>
  );
};
