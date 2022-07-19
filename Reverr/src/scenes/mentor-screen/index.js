import React from 'react';
import {View, Text, Image, ScrollView, Dimensions} from 'react-native';
import { IndividualHeaderLayout } from '../../Components';
import {MentorCardLayout} from '../../Components/Mentor-card-layout';
import styles from './styles';

import {useSelector} from 'react-redux';

export const Mentor = () => {
  const {mentors} = useSelector(state => state.UserReducer);
  return (
    <View style={styles.container}>
      <IndividualHeaderLayout>
      <Image
        style={styles.image}
        source={require('../../assets/images/Rectangle2.png')}
      />
      <Text style={styles.text}>Business Mentors</Text>
      <ScrollView scrollEnabled={true}   style={{marginHorizontal:4,maxWidth:Dimensions.get('window').width}}>
        <MentorCardLayout mentors={mentors} />
      </ScrollView>
      </IndividualHeaderLayout>
    </View>
  );
};
