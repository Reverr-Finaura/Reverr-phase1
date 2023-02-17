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
export default function LikeMatchScreen({navigation}) {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <VibeHeader />
      <Text style={styles.like}>It’s a match!!</Text>
      <View style={styles.ImageBack}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Profile.png')}
        />
        <Image
          style={{...styles.image, marginLeft: -30}}
          source={require('../../assets/images/Profile.png')}
        />
      </View>
      <Text style={styles.like1}>You and jatin matched. Go send a hello !</Text>
      <View style={{flex:1}}></View>
      <View style={{marginHorizontal: 30,marginBottom:20}}>
        <Button
          backgroundColor={'#2A72DE'}
          title={'Start messaging'}
          marginLeft={20}
          marginRight={20}
        />
        <Text style={{textAlign:"center",marginTop:10,}}>Go Back</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A72DE80',
  },
  like: {
    color: '#fff',
    fontSize: 30,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
  },
  like1: {
    color: '#fff',
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '700',
    marginHorizontal: 30,
  },
  ImageBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
    resizeMode: 'contain',
    borderColor: '#000',
    borderWidth: 2,
  },
});
