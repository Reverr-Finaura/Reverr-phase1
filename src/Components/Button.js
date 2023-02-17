import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

export default function Button({
  title,
  width,
  marginTop,
  marginButton,
  onPress,
  marginRight,
  backgroundColor,
  marginLeft,
  height,
  extraStyles,
}) {
  const styles = StyleSheet.create({
    btnBg: {
      width: width ? width : '100%',
      backgroundColor: backgroundColor,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: height ? height : 50,
      marginBottom: marginButton ? marginButton : 0,
      marginTop: marginTop ? marginTop : 0,
      marginRight: marginRight ? marginRight : 0,
      marginLeft: marginLeft ? marginLeft : 0,
      ...extraStyles,
    },
    btnText: {
      color: "white",
      fontSize: 18,
      fontWeight: '700',
      fontStyle: 'normal',
    },
  });
  return (
    <TouchableOpacity style={[styles.btnBg]} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}
