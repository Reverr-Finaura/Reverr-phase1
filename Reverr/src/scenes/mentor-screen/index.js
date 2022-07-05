import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import {Header} from '../../Components/Header';
import {MentorCardLayout} from '../../Components/Mentor-card-layout';
import styles from './styles';

import {useSelector} from 'react-redux';

export const Mentor = () => {
  const {mentors} = useSelector(state => state.UserReducer);

  return (
    <View style={styles.container}>
      <Header />
      <Image
        style={styles.image}
        source={require('../../assets/images/Rectangle2.png')}
      />
      <Text style={styles.text}>Business Mentors</Text>
      <ScrollView scrollEnabled={true}>
        <MentorCardLayout mentors={mentors} />
      </ScrollView>
    </View>
  );
};
