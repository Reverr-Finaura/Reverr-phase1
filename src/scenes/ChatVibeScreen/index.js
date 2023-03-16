import React, { useState } from 'react';
import database, { firebase } from '@react-native-firebase/database'
import authentication from '@react-native-firebase/auth';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';

import { ChatHeaderVibe } from '../../Components/ChatHeaderVibe';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';

export default function ChatVibeScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const onSend = messagesArray => {
    let myMsg = null;

    const msg = messagesArray[0];
    myMsg = {
      ...msg,
      senderId: authentication().currentUser.uid,
      receiverId: "123",
      createdAt: new Date().getTime(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));

    const messagesRef = database().ref(`chats/${'123'}/messages`);
    messagesRef.push({
      ...myMsg,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });

  }

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeaderVibe />
      {/* <Text style={styles.like1}>Send a customized message by clicking on any box.</Text>
      <View style={styles.view}>
        <Text style={styles.like2}>Your business is interesting , can you tell me a little more</Text>

      </View>
      <View style={styles.view}>
        <Text style={styles.like2}>Your business is interesting , can you tell me a little more</Text>

      </View>
      <View style={styles.view}>
        <Text style={styles.like2}>Your business is interesting , can you tell me a little more</Text>

      </View> */}

      {/* <GiftedChat
        onInputTextChanged={c => setComment(c)}
        onSend={handleComment}
        placeholder="Send a message to your match"
        color={"#000"}
        renderSend={props => {
          return (
            <Send {...props}>
              <View style={{ marginRight: 10, marginBottom: 15 }}>
                <Text
                  style={{
                    color: "#000",
                    fontWeight: 'bold',
                    fontSize: 19,
                  }}>
                  Comment
                </Text>
              </View>
            </Send>
          );
        }}
      /> */}
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        renderAvatar={() => null}
        onSend={text => onSend(text)}
        onLongPress={(context, message) => onLongPress(context, message)}
        alwaysShowSend={true}
        placeholder={'Type a message...'}
        textInputProps={{
          style: { color: '#000000', flex: 1 }
        }}
        user={{
          _id: authentication().currentUser.uid,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "#407BFF",
                  color: '#000000',
                },
                left: {
                  backgroundColor: "#fff",
                  color: '#407BFF',
                },
              }}
            />
          );
        }}
      />

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4062B9',
  },

  like1: {
    color: '#fff',
    fontSize: 12,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '400',
    marginHorizontal: 30,
  },
  like2: {
    color: '#fff',
    fontSize: 16,
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: '400',
    marginHorizontal: 10,
  },
  view: {
    borderColor: "#fff",
    borderStyle: 'dashed',
    borderWidth: 2, marginTop: 30,
    marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 15,
  }
});
