import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../../utils';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const InputField = props => {
  return (
    <View style={{...styles.screen, ...props.style}}>
      <View style={{width: '100%'}}>
        <Text style={{...styles.heading,...props.titleStyle}}>{props.Title} </Text>
        <View
          style={[
            styles.input,
            {
              borderWidth: props.error ? 2 : 0,
              borderColor: props.error ? 'red' : AppColors.FontsColor,
            },
          ]}>
          <TextInput
            selectionColor={AppColors.primarycolor}
            style={{
              color: AppColors.primarycolor,
              paddingStart: '2%',
              width: '88%',
            }}
            autoCapitalize="none"
            placeholder={props.placeholder}
            placeholderTextColor={AppColors.infoFonts}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            value={props.value}
            maxLength={props.maxLength}
          />
          <TouchableOpacity onPress={props.Eyelick}>
            <Icon
              name={props.PasswordIcon}
              color={AppColors.CardColor}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },

  heading: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingVertical: '3%',
  },
  input: {
    fontSize: 13,
    flexDirection: 'row',
    alignItems: 'center',
    color: AppColors.primarycolor,
    overflow: 'hidden',
    borderRadius: 6,
    paddingStart: '2.5%',
    backgroundColor: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    width: '100%',
  },
});

export {InputField};
