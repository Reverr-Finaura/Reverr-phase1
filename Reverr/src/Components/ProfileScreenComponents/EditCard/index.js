import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import React from 'react';
import { AppColors } from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;
const EditCard = props => {
  return (
    <LinearGradient
      colors={[AppColors.primarycolor, '#012437']}
      start={{x: 0, y: 1.3}}
      end={{x: 0.3, y: 0.5}}
      style={{...styles.Card, ...props.style}}>
      <Text
        style={{
          color: AppColors.FontsColor,
          paddingStart: 12,
          fontFamily: 'Poppins-Regular',
        }}>
        {props.Title}
      </Text>
      <TextInput
        style={{
          marginStart: 12,
          paddingVertical: 0,
          color: AppColors.infoFonts,
          fontFamily: 'Poppins-Regular',
        }}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  Card: {
    backgroundColor: AppColors.CardColor,
    borderRadius: 10,
    marginBottom: '2%',
    marginTop: Height / 90,
  },
});
export {EditCard};
