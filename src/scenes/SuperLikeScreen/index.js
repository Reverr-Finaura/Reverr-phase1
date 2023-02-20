import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {VibeHeader} from '../../Components/VibeHeader';
import Button from '../../Components/Button';
import LinearGradient from 'react-native-linear-gradient';

export default function SuperLikeScreen({navigation}) {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
<LinearGradient colors={['#020E2D', '#082157', '#09245E']} style={{flex:1}}>
      <VibeHeader />
      <View style={styles.box}>
        <View style={styles.ImageBack}>
          <Image
            style={styles.image}
            source={require('../../assets/images/likeProfile.png')}
          />
        </View>

        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.like1}>Jatin Khurana </Text>
            <Image
              style={styles.tick1}
              source={require('../../assets/images/nametick.png')}
            />
          </View>
          <Text style={styles.ceo}>CEO at Reverr</Text>
          <Text style={styles.laction}>New Delhi, India</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
            }}>
            <Image
              style={styles.tick}
              source={require('../../assets/images/twitter2.png')}
            />
            <Image
              style={styles.tick}
              source={require('../../assets/images/instagram.png')}
            />
            <Image
              style={styles.tick}
              source={require('../../assets/images/dribbble.png')}
            />
            <Image
              style={styles.tick}
              source={require('../../assets/images/linkedIn.png')}
            />
            <Image
              style={styles.tick}
              source={require('../../assets/images/gitHub.png')}
            />
          </View>
        </View>
      </View>
      <Image
        style={styles.hand}
        source={require('../../assets/images/hand.png')}
      />
      <Text style={{...styles.like1,alignSelf:"center",marginTop:30}}>You super liked Jatin Khurana !</Text>
      <View style={{flex:1}}></View>
      <View style={{marginHorizontal: 30,marginBottom:20}}>
        <Button
          backgroundColor={'#2A72DE'}
          title={'Messaging'}
          marginLeft={20}
          marginRight={20}
        />
        <Text style={styles.back}>Go Back</Text>
      </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  box: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 1.12,
    height: Dimensions.get('window').height / 3.99,
    marginVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginHorizontal: 0,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    padding: 2,
    backgroundColor: '#0D0E11',
    borderWidth: 2,
    borderColor: 'dodgerblue',
  },
  ImageBack: {
    flexDirection: 'column',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'cover',
    borderColor: '#06FF79',
    borderWidth: 2,
  },

  like1: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  ceo: {
    color: '#8CB2F4',
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 10,
  },
  laction: {
    color: '#999999',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
    marginHorizontal: 10,
  },
  tick: {
    width: 18,
    height: 18,
    marginTop: 3,
  },
  tick1: {
    width: 25,
    height: 25,
    marginTop: 3,
  },
  hand: {
    width: 70,
    height: 60,
    marginTop: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  back:{textAlign:"center",marginTop:10,color:"#A6A6A6",fontSize:16,fontWeight:"500"}
});
