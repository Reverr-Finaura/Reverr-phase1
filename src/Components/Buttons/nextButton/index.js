import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native'
import React from 'react'
import { AppColors } from '../../../utils'

const NextButton = ({title,style,textStyle,onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={{...styles.button,...style}}>
      <Text style={{...styles.title,...textStyle}} >{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:AppColors.buttonColor,
    paddingHorizontal:'10%',
    paddingVertical:'2%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20
  },
  title:{
    fontFamily:'Poppins-Bold',
    color:AppColors.FontsColor
  }
})

export default NextButton