import { View, Text, TouchableOpacity,Image} from 'react-native'
import React from 'react'

export const CustomImage = ({source}) => {
  return (
    <View>
        <TouchableOpacity>
            <Image source={source}></Image>
        </TouchableOpacity>
    </View>
  )
}