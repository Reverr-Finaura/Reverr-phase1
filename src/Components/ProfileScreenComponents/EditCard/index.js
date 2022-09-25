import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import React from 'react';
import {AppColors} from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;
const EditCard = props => {
  return (
    <View style={{...styles.Card, ...props.style}}>
      <Text
        style={{
          color: AppColors.FontsColor,
          paddingVertical: '2%',
          fontFamily: 'Poppins-Regular',
        }}>
        {props.Title}
      </Text>
      <TextInput
        style={{
          backgroundColor: AppColors.inputFieldColor,
          paddingStart: '3%',
          paddingVertical: 6,
          color: AppColors.infoFonts,
          fontFamily: 'Poppins-Regular',
          borderRadius: 5,
        }}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Card: {
    borderRadius: 10,
    marginBottom: '2%',
  },
});
export {EditCard};
