import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import {HeaderLayout, HomeCard} from '../../components';
import {styles} from './styles';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Home = () => {
  return (
    <HeaderLayout>
      <View style={styles.wlcmConatiner}>
        <View>
          <Text style={styles.welcmTxt}>Hi Dharmendra Kumar</Text>
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
    </HeaderLayout>
  );
};

export default Home;
