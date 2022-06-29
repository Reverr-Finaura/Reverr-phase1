import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {MessageContainer} from './SingleMessage';

import messages from '../../assets/data/messages';

import styles from './styles';

export const ChatLayout = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/Rectangle2.png')}
      />
      <Text style={styles.text}>Chats</Text>
      <Image
        style={styles.chatContainer}
        source={require('../../assets/images/Rectangle2.png')}
      />
      <FlatList
        data={messages}
        renderItem={({item}) => <MessageContainer message={item} />}
      />
    </View>
  );
};
