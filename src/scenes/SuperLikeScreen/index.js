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
import styles from './styles';
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
            style={styles.viewicons}>
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
      <View style={styles.buttonFlex}/>
      <View style={styles.viewbutton}>
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

