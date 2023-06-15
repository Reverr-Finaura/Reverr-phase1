import {View, Text} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils';

const BulletPoints = ({text}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%',
      }}>
      <View
        style={{
          height: 6,
          width: 6,
          borderRadius: 20,
          backgroundColor: AppColors.FontsColor,
          marginRight: '2%',
        }}
      />
      <Text
        style={{
          color: AppColors.FontsColor,
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default BulletPoints;
