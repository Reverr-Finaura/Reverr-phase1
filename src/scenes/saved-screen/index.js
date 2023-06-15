import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';

import styles from './styles';

import { YourFavMentorList } from '../../Components/YourFavMentorList';
import { YourLibrary } from '../../Components/YourLibrary';
import { SavedCourses } from '../../Components/SavedCourses';
import { useNavigation } from '@react-navigation/native';

export const SavedScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/Back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Saved Items</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mentors}>
          <YourFavMentorList />
        </View>
        <View style={styles.mentors}>
          <YourLibrary />
        </View>
        <View style={styles.mentors}>
          <SavedCourses />
        </View>
      </ScrollView>
    </View>
  );
};
