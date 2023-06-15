import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import styles from './styles';
import { smallString } from '../../utils';
import { useNavigation } from '@react-navigation/native';

export const YourLibrary = () => {
  const state = useSelector(state => state.UserReducer);
  const [savedArticals, setSavedArticals] = useState([]);
  const navigation = useNavigation();

  async function loadArticals(articals) {
    articals.map(async id => {
      const res = await firestore().collection('Blogs').doc(id).get();
      console.log(res);
      setSavedArticals(prebvArray => [...prebvArray, res.data()]);
    });
  }

  useEffect(() => {
    loadArticals(state.user.savedArticles);
  }, [state]);
  return (
    <View>
      <View style={styles.Container}>
        <View style={styles.heading}>
          <Text style={styles.text}>Your Articals</Text>
          {/* <Icon name="arrow-right" size={20} color={AppColors.FontsColor} /> */}
        </View>
        <View>
          {state && state.user.savedMentors.length > 0 ? (
            <FlatList
              data={savedArticals}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  onPress={() =>
                    navigation.navigate('ArticalDetails', {
                      articalData: item,
                    })
                  }
                  style={styles.Card}>
                  <Image style={styles.dp} source={{ uri: item.image }} />
                  <Text style={styles.Name}>
                    {smallString(item.heading, 17)}
                  </Text>
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
