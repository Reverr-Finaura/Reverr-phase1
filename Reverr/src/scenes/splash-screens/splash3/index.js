import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';

import styles from './styles';

export const SplashThird = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Splash2')}>
        <Image
          source={require('../../../assets/images/Back.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Let's Add more details to your profile!!</Text>
      <Image
        source={require('../../../assets/images/Next.png')}
        style={styles.icon}
      />
      <View {...setTimeout(() => navigation.navigate('ProfileSetUp'), 3000)} />
    </View>
  );
};
