import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
  import React from 'react';
  import { AppColors } from '../../utils';
  import Icon from 'react-native-vector-icons/FontAwesome';
  const Height = Dimensions.get('window').height;
  const Width = Dimensions.get('window').width;
  
  const InputField = props => {
    return (
      <View style={styles.screen}>
        <View style={{...styles.box, ...props.style}}>
          <Icon
            name={props.iconName}
            size={props.size}
            color={'white'}
            style={{marginStart: 15}}
          />
          <View style={{marginStart: '3%'}}>
            <Text
              style={[
                styles.heading,
                {color: props.error ? 'red' : AppColors.FontsColor},
              ]}>
              {props.Title}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={props.placeholder}
              placeholderTextColor={AppColors.infoFonts}
              onChangeText={props.onChangeText}
              secureTextEntry={props.secureTextEntry}
              keyboardType={props.keyboardType}
              value={props.value}
              maxLength={props.maxLength}
            />
          </View>
          <TouchableOpacity onPress={props.Eyelick}>
            <Icon
              name={props.showIcon}
              size={props.showIconsize}
              color={props.showIconolor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    screen: {
      alignItems: 'center',
      marginBottom: Height / 32,
    },
    box: {
      backgroundColor: AppColors.inputFieldColor,
      width: '99%',
      paddingVertical: '2%',
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    heading: {
      color: AppColors.FontsColor,
      marginStart: '2%',
      fontFamily: 'Poppins-Regular',
    },
    input: {
      fontSize: 13,
      color: AppColors.FontsColor,
      paddingTop: 0,
      fontFamily: 'Poppins-Regular',
      marginTop: -7,
      paddingBottom: 0,
      height: Height / 16,
      width: Width / 1.5,
    },
  });
  
  export {InputField};