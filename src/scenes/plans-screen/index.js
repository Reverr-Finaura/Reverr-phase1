import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {Header} from '../../Components/Header';
import {useNavigation} from '@react-navigation/native';
import {PlansCard} from '../../Components/PlansCard';

export const Plans = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/Back.png')}
            style={styles.button}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Plans</Text>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <PlansCard title="Hourly" />
        <PlansCard title="Monthly" />
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <PlansCard title="Quaterly" />
        <PlansCard title="Semi-Annualy" />
      </View>
    </View>
  );
};
