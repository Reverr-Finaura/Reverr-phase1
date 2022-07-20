import React from 'react';
import {View, Text, Image, ScrollView, Dimensions} from 'react-native';
import {IndividualHeaderLayout} from '../../Components';
import {MentorCardLayout} from '../../Components/Mentor-card-layout';
import styles from './styles';

import {useSelector} from 'react-redux';

export const Mentor = () => {
  const {mentors} = useSelector(state => state.UserReducer);

  return (
    <View style={styles.container}>
      <IndividualHeaderLayout>
<<<<<<< HEAD
        <Image
          style={styles.image}
          source={require('../../assets/images/Rectangle2.png')}
        />
        <Text style={styles.text}>Business Mentors</Text>
        <ScrollView scrollEnabled={true} style={{marginHorizontal: 8}}>
          <MentorCardLayout mentors={mentors} />
        </ScrollView>
=======
      <Image
        style={styles.image}
        source={require('../../assets/images/Rectangle2.png')}
      />
      <Text style={styles.text}>Business Mentors</Text>
      <ScrollView scrollEnabled={true}   style={{marginHorizontal:4 ,width:Dimensions.get('window').width}}>
        <MentorCardLayout mentors={mentors} />
      </ScrollView>
>>>>>>> faede99420c721bf6af5544651697ecf2f48724e
      </IndividualHeaderLayout>
    </View>
  );
};
