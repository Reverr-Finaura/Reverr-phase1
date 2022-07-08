import React from 'react';
import {View, Text, SafeAreaView, FlatList, ScrollView} from 'react-native';

import {Header} from '../../Components/Header';
import {MentorList} from '../../Components/Mentor-list';

import mentors from '../../assets/data/mentors';

import styles from './styles';
import {ChatLayout} from '../../Components/ChatLayout';
import { IndividualHeaderLayout } from '../../Components';
import { useSelector } from 'react-redux';

export const Messages = () => {
  //console.log(mentors);
  const state=useSelector(state=>state.UserReducer);
  console.log(state.user.mentors);
  return (
    <SafeAreaView style={styles.container}>
      <IndividualHeaderLayout>
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.subTitle}>Mentors</Text>
      {state?.user?.mentors?.length>0 ? <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={state.user.mentors}
        style={{
          position: 'absolute',
          top: '19%',
        }}
        renderItem={({item}) => <MentorList mentor={item} />}
      />:<Text style={{color:"grey",fontSize:14,marginLeft:50}}>Please Subscribe To Mentors for Guidence</Text>}
       <View style={{marginBottom:30}}></View>
       <ChatLayout />
     
      </IndividualHeaderLayout>
    </SafeAreaView>
  );
};
