import {View, Text} from 'react-native';
import React from 'react';

const NewsLoader = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: AppColors.FontsColor, fontSize: 30}}>
        Loading....
      </Text>
    </View>
  );
};

export {NewsLoader};
