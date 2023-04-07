import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function MentorCard({image, name, desig}) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageWrapper}>
        {image !== '' && <Image source={{uri: image}} style={{flex: 1}} />}
      </View>
      <LinearGradient
        colors={['#0A255F', '#061A46']}
        style={styles.infowrapper}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.desig}>{desig}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
export default MentorCard;

const styles = StyleSheet.create({
  container: {
    height: 190,
    width: 140,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  imageWrapper: {
    height: '60%',
    width: '100%',
  },
  infowrapper: {
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  desig: {
    color: '#FFF',
    fontWeight: '500',
    opacity: 0.6,
    fontSize: 13,
    marginTop: 1,
  },
});
