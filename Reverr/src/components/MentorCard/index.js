import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import styles from './styles';
import {Rating} from '../Ratings';

import {useNavigation} from '@react-navigation/native';

export const MentorCard = props => {
  const {name, onPress} = props;

  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Image
          style={styles.card}
          source={require('../../assets/images/Rectangle.png')}
        />
        <Image
          style={styles.mentorProfile}
          source={require('../../assets/images/MentorProfile.png')}
        />
        <Text style={styles.mentorName}>{name}</Text>
        <Text style={styles.mentorProfession}>Market Research</Text>

        <View style={styles.reviewContainer}>
          <Rating />

          <Text style={styles.reviews}>76 Reviews</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
