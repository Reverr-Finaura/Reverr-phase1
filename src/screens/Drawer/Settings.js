import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Settings} from '../../scenes';

function ProfileSettings({navigation}) {
  return (
    <View style={styles.container}>
      <Settings />
    </View>
  );
}
export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
