import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export const YourFavMentorList = () => {
  const state = useSelector(state => state.UserReducer);
  const [mentorsList, setMentorsList] = useState([]);
  const navigation = useNavigation();

  async function loadMentors(mentors) {
    mentors.map(async email => {
      const res = await firestore().collection('Users').doc(email).get();
      setMentorsList(prebvArray => [...prebvArray, res.data()]);
    });
  }

  useEffect(() => {
    loadMentors(state.user.savedMentors);
  }, [state]);

  return (
    <View>
      <View style={styles.Container}>
        <View style={styles.heading}>
          <Text style={styles.text}>Your Favourite Mentor</Text>
          {/* <Icon name="arrow-right" size={20} color={AppColors.FontsColor} /> */}
        </View>
        <View>
          {state && state.user.savedMentors.length > 0 ? (
            <FlatList
              data={mentorsList}
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate('MentorDetails', {
                      mentorDetails: item,
                    });
                  }}
                  style={styles.Card}>
                  <Image style={styles.dp} source={{uri: item.image}} />
                  <Text style={styles.Name}>{item.name}</Text>
                  <Text style={styles.skills}>{item.skills}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>You Have No Any Mentors 🤨</Text>
          )}
        </View>
      </View>
    </View>
  );
};
