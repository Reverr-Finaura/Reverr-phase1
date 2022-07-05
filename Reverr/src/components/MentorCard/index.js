import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {AppColors} from '../../utils';

import styles from './styles';
import {Rating} from '../Ratings';
import LinearGradient from 'react-native-linear-gradient';

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
    <View style={{flex: 1, alignItems: 'center', marginVertical: 8}}>
      <TouchableOpacity onPress={() => onPress(id)}>
        <LinearGradient
          colors={[AppColors.primarycolor, '#012437']}
          start={{x: 0, y: 1.3}}
          end={{x: 0.3, y: 0.5}}
          style={{width: 160, height: 160, borderRadius: 10}}>
          <Image
            style={styles.mentorProfile}
            source={require('../../assets/images/MentorProfile.png')}
          />
          <Text style={styles.mentorName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.mentorProfession} numberOfLines={1}>
            {industry}
          </Text>
          <View style={styles.reviewContainer}>
            <Rating />

            <Text style={styles.reviews}>89 reviews</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
