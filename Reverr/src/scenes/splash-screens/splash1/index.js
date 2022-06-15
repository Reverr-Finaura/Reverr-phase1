import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';

import styles from './styles';

export const SplashFirst = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('StartupVerification')}>
        <Image
          source={require('../../../assets/images/Back.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.text}>
        Wait for your Start-up to get reviewed by us !
        <Text> We will get back to you in 24 hours !</Text>
      </Text>
      <View {...setTimeout(() => navigation.navigate('Splash2'), 3000)} />
    </View>
  );
};
