import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const CustomButton = props => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={{...styles.Btn, ...props.style}} activeOpacity={0.6} onPress={props.onPress}>
      <Text style={{...styles.txt, ...props.TextStyle}}>{props.Title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    marginTop: '5%',
    overflow:'hidden',
    borderRadius: 10,
  },
  Btn: {
    borderRadius: 10,
    width: Width / 1.1,
    paddingVertical: '4%',
    justifyContent: 'center',
    backgroundColor:AppColors.buttonColor,
    alignItems: 'center',
  },
  txt: {
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.FontsColor,
    fontSize: 20,
  },
});

export {CustomButton};
