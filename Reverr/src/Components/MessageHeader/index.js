import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export const MessageHeader = props => {
  const {name, profile} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerComponents}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/Back.png')} />
        </TouchableOpacity>

        <Image style={{marginLeft: 8}} source={profile} />

        <Text style={styles.text}>{name}</Text>

        <TouchableOpacity>
          <Image
            source={require('../../assets/images/Call.png')}
            style={styles.call}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={require('../../assets/images/Options.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
