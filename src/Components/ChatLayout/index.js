import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppColors } from '../../utils';

export const ChatLayout = ({ usersArray }) => {
  const state = useSelector(state => state.UserReducer);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          marginHorizontal: '2.6%',
          paddingVertical: '1%',
          marginBottom: '3%',
          borderRadius: 10,
          overflow: 'hidden',
        }}
        source={require('../../assets/images/Rectangle2.png')}>
        <Text style={styles.text}>Chats</Text>
      </ImageBackground>
      <ImageBackground
        style={styles.chatContainer}
        source={require('../../assets/images/Rectangle2.png')}>
        <FlatList
          style={{ marginBottom: 16 }}
          data={usersArray}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles2.container}
              onPress={() =>
                navigation.navigate('ChatVibeScreen', {
                  userData: item,
                })
              }>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image style={styles2.image} source={{ uri: item.image }} />
                <View
                  style={{
                    width: '70%',
                    justifyContent: 'center',
                    marginHorizontal: '5%',
                  }}>
                  <Text style={styles2.name}>{item.name}</Text>
                  <Text style={styles2.message}>Tap to Chat</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ImageBackground>
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    paddingVertical: '3%',
    paddingHorizontal: '3%',
    borderBottomColor: AppColors.CardColor,
    borderBottomWidth: 2,
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    marginVertical: '2%',
    color: 'white',
    // backgroundColor: 'blue',
  },
  message: {
    color: '#939292',
    fontSize: 12,
  },
  time: {
    color: '#939292',
    fontSize: 12,
  },
});
