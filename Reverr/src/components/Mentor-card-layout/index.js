import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {MentorCard} from '../MentorCard';

export const MentorCardLayout = ({mentors}) => {
  return (
    <FlatList
      numColumns={2}
      data={mentors}
      renderItem={item => <MentorCard mentor={item} />}
    />
  );
};
