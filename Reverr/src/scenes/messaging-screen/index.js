import React from 'react';
import {View, Text, SafeAreaView, FlatList, ScrollView} from 'react-native';

import {Header} from '../../components/Header';
import {MentorList} from '../../components/Mentor-list';

import mentors from '../../assets/data/mentors';

import styles from './styles';
import {ChatLayout} from '../../components/ChatLayout';

export const Messages = () => {
  console.log(mentors);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.subTitle}>Mentors</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={mentors}
        style={{
          position: 'absolute',
          top: '19%',
        }}
        renderItem={({item}) => <MentorList mentor={item} />}
      />
      <ChatLayout />
    </SafeAreaView>
  );
};
