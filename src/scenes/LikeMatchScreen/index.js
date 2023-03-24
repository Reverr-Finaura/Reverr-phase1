import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';

import {VibeHeader} from '../../Components/VibeHeader';
import Button from '../../Components/Button';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
export default function LikeMatchScreen({navigation}) {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#020E2D', '#082157', '#09245E']} style={{flex:1}}>


      <VibeHeader />
      <Text style={styles.like}>It’s a match!!</Text>
      <View style={styles.ImageBack}>
        <Image
          style={styles.image}
          source={require('../../assets/images/likeProfile.png')}
        />
        <Image
          style={{...styles.image, marginLeft: -30}}
          source={require('../../assets/images/likeProfile.png')}
        />
      </View>
      <Text style={styles.like1}>You and jatin matched. Go send a hello !</Text>
      <View style={{flex:1}}></View>
      <View style={styles.button}>
        <Button
          backgroundColor={'#2A72DE'}
          title={'Start messaging'}
          onPress={navigation.navigate('ChatVibeScreen')}
          marginLeft={20}
          marginRight={20}
        />
        <Text style={{textAlign:"center",marginTop:10,}}>Go Back</Text>
      </View>
      </LinearGradient>

    </SafeAreaView>
  );
}

