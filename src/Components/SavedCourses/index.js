import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import styles from './styles';
import { Data } from '../../assets/data/dummyData';
import { smallString } from '../../utils';
import { useNavigation } from '@react-navigation/native';

export const SavedCourses = () => {
  const state = useSelector(state => state.UserReducer);
  const [savedCourses, setSavedCourses] = useState([]);
  const navigation = useNavigation();

  async function loadCourses(courses) {
    courses.map(async id => {
      const res = await firestore().collection('Courses').doc(id).get();
      //console.log(res);
      setSavedCourses(prebvArray => [...prebvArray, res.data()]);
    });
  }

  useEffect(() => {
    loadCourses(state.user.savedCourses);
  }, [state]);
  return (
    <View>
      <View style={styles.Container}>
        <View style={styles.heading}>
          <Text style={styles.text}>Saved Courses</Text>
          {/* <Icon name="arrow-right" size={20} color={AppColors.FontsColor} /> */}
        </View>
        <View>
          {state && state.user.savedMentors.length > 0 ? (
            <FlatList
              data={savedCourses}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate('StartCourse', {
                      CourseDetails: item,
                    });
                  }}
                  style={styles.Card}>
                  <Image style={styles.dp} source={{ uri: item.image }} />
                  <Text style={styles.Name}>{smallString(item.name, 20)}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>You Have No Any Articals 🤨</Text>
          )}
        </View>
      </View>
    </View>
  );
};
