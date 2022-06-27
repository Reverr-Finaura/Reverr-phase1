import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {Header} from '../../Components/Header';
import {MentorCardLayout} from '../../Components/Mentor-card-layout';
import styles from './styles';

export const Mentor = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <Image
        style={styles.image}
        source={require('../../assets/images/Rectangle2.png')}
      />
      <Text style={styles.text}>Business Mentors</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* navigation.navigate('MentorProfile', {msg: 'I am here'}) */}
        <MentorCardLayout
          name="Jatin Khurrana"
          secondname="Raj Gupta"
          onPress={() => navigation.navigate('MentorProfile')}
        />
        <MentorCardLayout name="William Vetrovs" secondname="Neetan Sachdeva" />
        <MentorCardLayout name="Jatin Khurrana" secondname="Raj Gupta" />
        <MentorCardLayout name="William Vetrovs" secondname="Neetan Sachdeva" />
      </ScrollView>
    </View>
  );
};
