import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';

import styles from './styles';

export const SplashSecond = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Splash1')}>
        <Image
          source={require('../../../assets/images/Back.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.text}>
        Congratulations, Now you are verified Start-up here
      </Text>
      <Image
        source={require('../../../assets/images/Congratulations.png')}
        style={styles.icon}
      />
      <View {...setTimeout(() => navigation.navigate('Splash3'), 3000)} />
    </View>
  );
};
