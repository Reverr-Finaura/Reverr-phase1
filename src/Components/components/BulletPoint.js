import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function BulletPoint({title}) {
  return (
    <Text numberOfLines={1} style={styles.container}>
      •{title}
    </Text>
  );
}
export default BulletPoint;

const styles = StyleSheet.create({
  container: {
    color: '#A6A6A6',
    fontSize: 12,
    lineHeight: 18,
  },
});
