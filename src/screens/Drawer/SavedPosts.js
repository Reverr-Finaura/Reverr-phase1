import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';

import {AppColors} from '../../utils';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import PostCard from '../../Components/components/PostCard';
import {BackButton} from '../../Components';

const SavedPosts = () => {
  const state = useSelector(state => state.UserReducer);
  const [savedPosts, setSavedPosts] = useState([]);
  console.log(state.user.saved);

  const getPost = async () => {
    let saved = [];
    for (let i = 0; i < state?.user?.saved?.length; i++) {
      saved.push(...state?.Rooms.filter(r => r.id === state?.user?.saved[i]));
    }
    setSavedPosts(saved);
  };
  useEffect(() => {
    getPost();
  }, []);
  console.log(savedPosts, 'ksdks');
  return (
    <View style={styles.screen}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: '5%',
        }}>
        <BackButton />
        <Text
          style={{
            color: AppColors.FontsColor,
            fontSize: 22,
            marginStart: '25%',
          }}>
          Saved Posts
        </Text>
      </View>
      <View style={{paddingHorizontal: '7%', height: '89.7%'}}>
        <FlatList
          data={savedPosts}
          renderItem={({item, index}) => <PostCard item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
});

export default SavedPosts;
