import React from 'react';
import {View, Text, Image} from 'react-native';

export const Rating = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: '8%',
      }}>
      <Image
        source={require('../../assets/images/FilledStar.png')}
        style={{marginHorizontal: '2%'}}
      />
      <Image
        source={require('../../assets/images/FilledStar.png')}
        style={{marginHorizontal: '2%'}}
      />
      <Image
        source={require('../../assets/images/FilledStar.png')}
        style={{marginHorizontal: '2%'}}
      />
      <Image
        source={require('../../assets/images/UnfilledStar.png')}
        style={{marginHorizontal: '2%'}}
      />
      <Image
        source={require('../../assets/images/UnfilledStar.png')}
        style={{marginHorizontal: '2%'}}
      />
    </View>
  );
};
