import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const ThanksScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileSetUp')}>
        <Image
          source={require('../../assets/images/Back.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Thanks!{''} That was everything!!</Text>
      <View {...setTimeout(() => navigation.navigate('home'), 3000)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000c12',
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontWeight: '800',
    fontSize: 32,
    paddingHorizontal: 40,
    marginLeft: 20,
    marginTop: 320,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    width: 28,
    height: 28,
    left: 8,
    top: 33,
  },
});

export default ThanksScreen;
