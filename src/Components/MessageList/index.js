import React, {useState, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {Message} from './Message';

export const MessageList = () => {
  const [messages, setMessages] = useState([
    {
      user: 0,
      time: '12:00',
      content: 'Hey',
    },
    {
      user: 1,
      time: '12:03',
      content: 'Whats up?',
    },
    {
      user: 1,
      time: '12:09',
      content: 'I am good',
    },
    {
      user: 0,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 0,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 1,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 0,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 1,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 0,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 0,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 1,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 0,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 1,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 0,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 1,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 0,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 1,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 0,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 1,
      time: '12:01',
      content: 'How are you?',
    },
    {
      user: 0,
      time: '12:01',
      content: 'How are you?',
    },
  ]);

  const user = useRef(0);
  const scrollView = useRef();

  return (
    <ScrollView
      ref={ref => (scrollView.current = ref)}
      onContentSizeChange={() =>
        scrollView.current.scrollToEnd({animated: true})
      }>
      {messages.map((message, index) => (
        <Message
          key={index}
          time={message.time}
          isLeft={message.user != user.current}
          message={message.content}
        />
      ))}
    </ScrollView>
  );
};
