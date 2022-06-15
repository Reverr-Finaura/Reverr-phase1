import React from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';

import styles from './styles';
import {Details} from '../../components/UserDetails';

export const StartupVerification = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity>
        <Image
          source={require('../../assets/images/Back.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Start-Up Verification</Text>
        <Image
          source={require('../../assets/images/Verification.png')}
          style={styles.verification}
        />
      </View>

      <Details />
    </ScrollView>
  );
};
