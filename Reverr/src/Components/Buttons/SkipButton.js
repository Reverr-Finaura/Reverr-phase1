import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const SkipButton = props => {
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: 0, y: 1.3}}
        end={{x: 0.3, y: 0.5}}
        style={{...styles.container, ...props.style}}>
        <Text style={{color: AppColors.FontsColor}}>Skip</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primarycolor,
    width: Width / 7,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },
});
export default SkipButton;
