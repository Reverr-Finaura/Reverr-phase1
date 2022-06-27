import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import { IndividualHeaderLayout } from '../../Components';
import {styles} from './styles';
import { HomeCard } from '../../Components';
import { useSelector } from 'react-redux';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Home = () => {
  const state=useSelector(state=>state.UserReducer)
  return (
    <IndividualHeaderLayout>
      <View style={styles.wlcmConatiner}>
        <View>
          <Text style={styles.welcmTxt}>Hi, {state.user.name}</Text>
          <Text style={styles.subText}>
            Today is a good day to learn something new !
          </Text>
        </View>
        <View style={styles.vectorContainer}>
          <Image
            style={styles.vector}
            source={require('../../assets/images/HomeVector.png')}
          />
        </View>
      </View>
      <HomeCard />
    </IndividualHeaderLayout>
  );
};

export {Home};
