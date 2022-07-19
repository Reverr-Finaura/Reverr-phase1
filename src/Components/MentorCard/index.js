import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import styles from './styles';
import {Rating} from '../Ratings';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setMentorProfile} from '../../Redux/actions';

export const MentorCard = ({mentor}) => {
  const navigation = useNavigation();
  const {name, industry, reviews, id} = mentor?.item;
  const {mentors} = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();

  const onPress = id => {
    const mentor = mentors.filter(mentor => mentor.id == id)[0];
    dispatch(setMentorProfile(mentor));
    navigation.navigate('MentorProfile');
  };

  return (
    <View style={{marginVertical: 8, marginHorizontal: 8}}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => onPress(id)}>
        <Image
          style={styles.card}
          source={require('../../assets/images/Rectangle.png')}
        />
        <Image
          style={styles.mentorProfile}
          source={require('../../assets/images/MentorProfile.png')}
        />
        <Text style={styles.mentorName}>{name}</Text>
        <Text style={styles.mentorProfession} numberOfLines={1}>
          {industry}
        </Text>

        <View style={styles.reviewContainer}>
          <Rating />

          <Text style={styles.reviews}>{reviews}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
