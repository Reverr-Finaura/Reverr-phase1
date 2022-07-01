import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {MentorCard} from '../MentorCard';

export const MentorCardLayout = ({mentors}) => {
  return (
    <FlatList
      scrollEnabled={true}
      contentContainerStyle={styles.container}
      numColumns={2}
      data={mentors}
      renderItem={item => <MentorCard mentor={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
