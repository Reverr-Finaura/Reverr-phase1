import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Theme from '../../utils/Theme';

function AboutMeSection({about, location}) {
  return (
    <View style={styles.container}>
      <Text style={styles.tabTitle}>About Me</Text>
      <Text style={styles.about}>{about}</Text>
      {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={Theme.location}
          style={{
            height: 15,
            width: 15,
            resizeMode: 'contain',
            marginRight: 10,
          }}
        />
        <Text style={styles.about}>{location}</Text>
      </View> */}
    </View>
  );
}
export default AboutMeSection;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 10
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#8AB9FF',
  },
  about: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    marginVertical: 15,
  },
  para: {
    fontSize: 15,
    color: '#fff',
    marginVertical: 15,
  },
});
