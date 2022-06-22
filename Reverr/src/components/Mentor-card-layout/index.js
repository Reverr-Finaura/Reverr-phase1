import React from 'react';
import {View, StyleSheet} from 'react-native';

import {MentorCard} from '../MentorCard';

export const MentorCardLayout = props => {
  const {name, secondname, onPress} = props;
  return (
    <View style={styles.container}>
      <MentorCard name={name} onPress={onPress} />
      <MentorCard name={secondname} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
});
