import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

export const CustomImage = ({source, action}) => {
  return (
    <View>
      <TouchableOpacity onPress={action}>
        <Image source={source}></Image>
      </TouchableOpacity>
    </View>
  );
};
