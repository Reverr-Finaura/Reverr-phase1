import React from 'react';
import {View, Text, Image, ScrollView, Dimensions} from 'react-native';
import {IndividualHeaderLayout} from '../../Components';
import {MentorCardLayout} from '../../Components/Mentor-card-layout';
import styles from './styles';

import {AppColors} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';

import {useSelector} from 'react-redux';

export const Mentor = () => {
  const {mentors} = useSelector(state => state.UserReducer);
  return (
    <View style={styles.container}>
      <IndividualHeaderLayout>
        <LinearGradient
          colors={[AppColors.primarycolor, '#012437']}
          start={{x: 0.4, y: 1.3}}
          end={{x: 1, y: 0.5}}
          style={styles.textContainer}>
          <Text style={styles.text}>Business Mentors</Text>
        </LinearGradient>
        <MentorCardLayout mentors={mentors} />
      </IndividualHeaderLayout>
    </View>
  );
};
