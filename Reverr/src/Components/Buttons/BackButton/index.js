import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../../../utils';

const BackButton = props => {
  return (
    <View>
      <TouchableOpacity
        style={{...styles.btn, ...props.style}}
        onPress={props.onPress}>
        <Icon
          name="angle-left"
          size={props.IconSize}
          color={AppColors.FontsColor}
        />
      </TouchableOpacity>
    </View>
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

export {BackButton};
