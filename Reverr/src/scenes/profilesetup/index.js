import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';

import {YourInformation} from '../../Components/YourInformation';
//import {ProfileHeader} from '../../components/ProfileHeader';
import {ProfileHeader} from '../../Components/ProfileHeader'
import {SocialHandle} from '../../Components/SocialHandles';
export const ProfileSetUp = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.navigate('Splash3')}>
        <Image
          source={require('../../assets/images/Back.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <ProfileHeader title="Add your picture" image={true} />

      <View style={{bottom: 30}}>
        <Text style={styles.titleText}>Add a bio for yourself</Text>
        <LinearGradient colors={['#012437', '#000']} style={{marginTop: 24}}>
          <TextInput
            placeholder=" ' Write about yourself ' "
            placeholderTextColor={'white'}
            style={styles.textInput}
          />
        </LinearGradient>
      </View>

      <View>
        <Text style={styles.titleText}>Your Information</Text>
        <View>
          <YourInformation
            iconName="magnify"
            question="What are you looking for?"
            answers="Mentorship"
          />
          <YourInformation
            iconName="office-building"
            question="What is your industry?"
            answers="Fintech"
          />
          <YourInformation
            iconName="bag-checked"
            question="Yours years of experience?"
            answers="2-4 years"
          />
          <YourInformation
            iconName="bag-checked"
            question="Your previous organisation?"
            answers="Amazon"
          />
          <YourInformation
            iconName="id-card"
            question="Previous organisation designation?"
            answers="SDE-1"
          />
          <YourInformation
            iconName="alarm"
            question="Previous organisation Duration"
            answers="2-4 years"
          />
          <YourInformation
            iconName="book-open-variant"
            question="Role in the organisation"
            answers="Code..."
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Start-Up Verification</Text>
          <Image
            source={require('../../assets/images/Verification.png')}
            style={styles.verification}
          />
        </View>
        <Text style={{color: 'white', bottom: 10, left: 8, fontSize: 12}}>
          Have a start-up? Get it verified
        </Text>

        <View>
          <Text style={[styles.titleText, {marginTop: 16}]}>
            Add your interests
          </Text>
          <LinearGradient colors={['#012437', '#000']} style={{marginTop: 20}}>
            <TextInput
              placeholder="  #writeyourinterests  "
              placeholderTextColor={'white'}
              style={styles.textInput}
            />
          </LinearGradient>
        </View>
        <View>
          <Text style={[styles.titleText, {marginTop: 16, marginBottom: 24}]}>
            Add your social handles
          </Text>
          <SocialHandle
            title="Connect your LinkedIn"
            iconName="logo-linkedin"
          />
          <SocialHandle title="Connect your Twitter" iconName="logo-twitter" />
          <Icon
            onPress={() => navigation.navigate('Thanks')}
            name="arrowright"
            color={'#0492c2'}
            size={32}
            style={{marginBottom: 8, marginLeft: 350}}
          />
        </View>
      </View>
    </ScrollView>
  );
};
