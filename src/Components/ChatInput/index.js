import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';

import styles from './styles';

export const ChatInput = () => {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.footer}>
      <Image
        style={{left: '8%'}}
        source={require('../../assets/images/MessageInput.png')}></Image>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setMessage(text)}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => console.warn(message)}>
        <Image source={require('../../assets/images/Chat.png')}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.camera}>
        <Image source={require('../../assets/images/Camera.png')}></Image>
      </TouchableOpacity>
    </View>
  );
};
