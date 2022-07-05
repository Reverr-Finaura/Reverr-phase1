import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {MessageContainer} from './SingleMessage';

import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../utils';

import messages from '../../assets/data/messages';

import styles from './styles';

export const ChatLayout = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: 1, y: 1.3}}
        end={{x: 1, y: 0.5}}
        style={styles.titleContainer}>
        <Text style={styles.title}>Chats</Text>
      </LinearGradient>
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: -3, y: 1.3}}
        end={{x: 3, y: 0.5}}
        style={styles.messageContainer}>
        <FlatList
          data={messages}
          renderItem={({item}) => <MessageContainer message={item} />}
        />
      </LinearGradient>
    </View>
  );
};
