import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TermConditions} from '../../scenes';

function Info({navigation}) {
  return (
    <View style={styles.container}>
      <TermConditions />
    </View>
  );
}
export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
