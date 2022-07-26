import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import styles from './styles';
import {Rating} from '../Ratings';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setMentorProfile} from '../../Redux/actions';
import {smallString} from '../../utils';

export const MentorCard = ({mentor}) => {
  const navigation = useNavigation();
  const {name, industry, reviews, id} = mentor?.item;
  const {mentors} = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  console.log(mentor, 'mm');
  /* const onPress = id => {
    const mentor = mentors.filter(mentor => mentor.id == id)[0];
    dispatch(setMentorProfile(mentor));
    navigation.navigate('MentorDetails');
  }; */

  return (
    <View style={{marginVertical: 12, marginHorizontal: 8}}>
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('MentorDetails', {
            mentorDetails: mentor.item,
          })
        }>
        <ImageBackground
          style={styles.card}
          source={require('../../assets/images/Rectangle.png')}>
          <Image
            style={styles.mentorProfile}
            source={require('../../assets/images/MentorProfile.png')}
          />
          <Text style={styles.mentorName}>{name}</Text>
          <Text style={styles.mentorProfession}>
            {smallString(industry, 20)}
          </Text>
          <View style={styles.reviewContainer}>
            <Rating />
            {/*   <Text style={styles.reviews}>{reviews}</Text> */}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
