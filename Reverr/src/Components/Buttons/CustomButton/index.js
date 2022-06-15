import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
  import React from 'react';
  import { AppColors } from '../../../utils';
  import LinearGradient from 'react-native-linear-gradient';
  
  const Height = Dimensions.get('window').height;
  const Width = Dimensions.get('window').width;
  
  const CustomButton= props => {
    return (
      <View style={styles.screen}>
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
          <LinearGradient
            colors={[AppColors.primarycolor, '#012437']}
            start={{x: 0, y: 1.3}}
            end={{x: 0.3, y: 0.5}}
            style={{...styles.Btn, ...props.style}}>
            <Text style={{...styles.txt, ...props.TextStyle}}>{props.Title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    screen: {
      alignItems: 'center',
    },
    Btn: {
      borderRadius: 20,
      width: Width / 1.1,
      paddingVertical: Height > 684 ? '3%' : '2%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    txt: {
      fontFamily: 'Poppins-SemiBold',
      color: AppColors.FontsColor,
      fontSize: 18,
    },
  });
  
  export {CustomButton};