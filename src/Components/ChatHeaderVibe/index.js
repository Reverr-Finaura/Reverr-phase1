import React from 'react';
import {View, TouchableOpacity, Image,Text} from 'react-native';

import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export const ChatHeaderVibe = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>

     
       <TouchableOpacity>
        <Ionicons name="chevron-back-outline" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Image style={{width:40,height:40}}
        source={require('../../assets/images/Profile.png')}
        action={() => navigation.navigate('Settings')}
      />

     

     <Text style={styles.text}>Jatin Khurana</Text>

     
      <TouchableOpacity>
        <Ionicons name="call" size={24} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={24} color="#ffffff" />
      </TouchableOpacity>

    </View>
  );
};
