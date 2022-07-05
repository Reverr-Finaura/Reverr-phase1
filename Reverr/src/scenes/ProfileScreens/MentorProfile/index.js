import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {BackButton} from '../../../Components/index';
import {AppColors} from '../../../utils';
import {styles} from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {clearMentorState} from '../../../Redux/MentorActions';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const MentorProfile = props => {
  const {user} = useSelector(state => state.UserReducer);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <View style={{width: '40%'}}>
          <BackButton
            IconSize={30}
            onPress={async () => {
              await auth()
                .signOut()
                .then(() => {
                  dispatch(clearMentorState());
                  navigation.navigate('Login');
                })
                .catch(e => {
                  console.log('error in logout');
                });
            }}
          />
        </View>
        <Text
          style={{
            color: AppColors.FontsColor,
            fontFamily: 'Poppins-Regular',
            marginStart: Width / 30,
            fontSize: 22,
          }}>
          Profile
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.topIcons}>
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate('Subscription');
            }}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="star" size={25} color={AppColors.ActiveColor} />
            <Text style={styles.text}>Membership</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate('Setting');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginStart: Width / 1.83,
            }}>
            <Ionic
              name="settings-outline"
              size={28}
              color={AppColors.ActiveColor}
            />
            <Text style={styles.text}>Setting</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: '8%'}}>
          <Text
            style={[
              styles.text,
              {
                width: '100%',
                textAlign: 'center',
                marginLeft: 10,
                fontSize: 18,
                textTransform: 'capitalize',
              },
            ]}>
            {user.name}
          </Text>
        </View>
        <View
          style={{
            height: '17%',
            marginTop: '2%',
            borderBottomColor: AppColors.FontsColor,
            borderBottomWidth: 1,
          }}>
          <Text style={[styles.text, {fontSize: 18}]}>About</Text>
          <Text style={styles.about}>{user.about}</Text>
        </View>
        <View
          style={{
            height: '9%',
            flexDirection: 'row',
            marginTop: '2%',
            alignItems: 'center',
            paddingBottom: '4%',
            justifyContent: 'space-between',
            borderBottomColor: AppColors.FontsColor,
            borderBottomWidth: 1,
          }}>
          <Text style={[styles.text, {fontSize: 18}]}>Industry</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontSize: 18, paddingRight: '5%'}]}>
              {user.industry}
            </Text>
            <Icon
              name="angle-right"
              size={25}
              color={AppColors.FontsColor}
              style={{paddingRight: '2%', marginTop: '3%'}}
            />
          </View>
        </View>
        <View style={styles.CompanyDetails}>
          <Text style={[styles.text, {fontSize: 18}]}>Experience</Text>
          <Text style={[styles.txt, {width: Width / 2}]}>
            {user.experience &&
              user.experience.length > 0 &&
              user.experience.map(ex => ex)}
          </Text>
        </View>
        <View style={[styles.CompanyDetails, {height: Height / 9}]}>
          <Text style={[styles.text, {fontSize: 18}]}>Skills</Text>
          <Text style={[styles.txt, {width: Width / 2}]}>
            {user.skills && user.skills.length > 0 && user.skills.map(sk => sk)}
          </Text>
        </View>
        <View style={[styles.CompanyDetails, {height: Height / 9}]}>
          <Text style={[styles.text, {fontSize: 18}]}>Education</Text>
          <Text style={[styles.txt, {width: Width / 2}]}>
            {user.education &&
              user.education.length > 0 &&
              user.education.map(ed => ed)}
          </Text>
        </View>
      </View>
      <View style={styles.dp}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: user.image}}
        />
      </View>
    </ScrollView>
  );
};

export {MentorProfile};
