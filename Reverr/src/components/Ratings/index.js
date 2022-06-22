import React from 'react';
import {View, Text, Image} from 'react-native';

export const Rating = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginRight: 16,
      }}>
      <Image
        source={require('../../assets/images/FilledStar.png')}
        style={{marginRight: 4}}
      />
      <Image
        source={require('../../assets/images/FilledStar.png')}
        style={{marginRight: 4}}
      />
      <Image
        source={require('../../assets/images/FilledStar.png')}
        style={{marginRight: 4}}
      />
      <Image
        source={require('../../assets/images/UnfilledStar.png')}
        style={{marginRight: 4}}
      />
      <Image
        source={require('../../assets/images/UnfilledStar.png')}
        style={{marginRight: 4}}
      />
    </View>
  );
};
