import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {IndividualHeaderLayout} from '../../Components';
import {MentorCardLayout} from '../../Components/Mentor-card-layout';
import styles from './styles';

import {useSelector} from 'react-redux';
import {MentorCard} from '../../Components/MentorCard';

export const Mentor = () => {
  const {mentors} = useSelector(state => state.UserReducer);

  return (
    <View style={styles.container}>
      <IndividualHeaderLayout>
        <View
          style={{
            height: '15%',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 10,
            overflow: 'hidden',
            marginTop: 12,
          }}>
          <ImageBackground
            style={styles.image}
            source={require('../../assets/images/Rectangle2.png')}>
            <Text style={styles.text}>Business Mentors</Text>
          </ImageBackground>
        </View>
        <ScrollView scrollEnabled={true} style={{marginTop: '4%'}}>
          <FlatList
            scrollEnabled={true}
            contentContainerStyle={styles.container}
            numColumns={2}
            data={mentors}
            renderItem={item => <MentorCard mentor={item} />}
          />
        </ScrollView>
      </IndividualHeaderLayout>
    </View>
  );
};
