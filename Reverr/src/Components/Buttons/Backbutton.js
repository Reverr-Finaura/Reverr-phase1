import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../../utils/Constants';

const BackButton = props => {
  return (
    <TouchableOpacity
      style={{...styles.btn, ...props.style}}
      onPress={props.onPress}>
      <Icon name="angle-left" size={25} color={AppColors.FontsColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: AppColors.CardColor,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 10,
    width: 30,
    height: 30,
  },
});

export default BackButton;
