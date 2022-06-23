import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import { AppColors } from '../../utils';

const CreatePostButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      style={{...styles.button, ...props.style}}>
      <Icon name="plus" size={35} color={AppColors.BtnClr} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    paddingHorizontal: '3.5%',
    paddingVertical: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.4,
    backgroundColor: AppColors.CardColor,
    borderRadius: 33,
  },
});
export {CreatePostButton};
