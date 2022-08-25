import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppColors} from '../../../utils';

const CourseLoader = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: AppColors.FontsColor, fontSize: 30}}>
        Loading....
      </Text>
    </View>
  );
};

export {CourseLoader};
