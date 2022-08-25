import React from 'react';
import {View, TextInput, Text} from 'react-native';

import styles from './styles';

export const CustomTextInput = props => {
  const {placeholder, title, keyboardType, secureEntryText} = props;

  return (
    <View>
      <Text style={styles.title}>
        {title} <Text style={{color: 'red'}}> *</Text>
      </Text>
      <View style={styles.textInput}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9C9898"
          style={styles.text}
          keyboardType={keyboardType}
          secureTextEntry={secureEntryText}
        />
      </View>
    </View>
  );
};
