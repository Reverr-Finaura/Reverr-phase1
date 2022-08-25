import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {MessageContainer} from './SingleMessage';

import messages from '../../assets/data/messages';

import styles from './styles';
import { useSelector } from 'react-redux';

export const ChatLayout = () => {
  const state=useSelector(state=>state.UserReducer);
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
        style={{marginBottom: 16}}
        data={state.user.userType=='Mentor'?state.user.clients:state.user.mentors}
        renderItem={({item}) => <MessageContainer message={item}/>}
      />
    </View>
  );
};
