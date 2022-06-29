import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../../../utils';
import {useNavigation} from '@react-navigation/native';

const BackButton = props => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={{...styles.btn, ...props.style}}
        onPress={() => navigation.goBack()}>
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
