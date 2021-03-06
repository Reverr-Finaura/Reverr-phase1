import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {MessageHeader} from '../../Components/MessageHeader';
import {ChatInput} from '../../Components/ChatInput';
import {MessageList} from '../../Components/MessageList';

export const ChatScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#012437', 'lightgray']}
      start={{x: 0.8, y: 0.4}}
      end={{x: 0, y: 0.7}}
      style={styles.container}>
      <MessageHeader
        name="William Vetrovs"
        profile={require('../../assets/images/MentorProfile.png')}
      />
      <MessageList />
      <ChatInput />
    </LinearGradient>
  );
};
