import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
//import styles from './styles';
import {Rating} from '../Ratings';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setMentorProfile} from '../../Redux/actions';
import {AppColors, smallString} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';

export const MentorCard = ({mentor}) => {
  const navigation = useNavigation();
  const {name, industry, reviews, id} = mentor?.item;
  const {mentors} = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  // console.log(mentor, 'mm');
  /* const onPress = id => {
    const mentor = mentors.filter(mentor => mentor.id == id)[0];
    dispatch(setMentorProfile(mentor));
    navigation.navigate('MentorDetails');
  }; */

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        width: '47%',
        marginVertical: '2%',
        marginHorizontal: '2%',
        alignItems: 'center',
      }}
      onPress={() => {
        navigation.navigate('MentorDetails', {
          mentorDetails: mentor.item,
        });
      }}>
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.5}}
        style={styles.Card}>
        <Image
          source={require('../../assets/images/MentorProfile.png')}
          style={styles.dp}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.industry}>{smallString(industry, 20)}</Text>
        <Rating />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Card: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: '8%',
  },
  name: {
    color: AppColors.FontsColor,
    marginTop: '5%',
    fontSize: 18,
  },
  industry: {
    color: AppColors.infoFonts,
    marginVertical: '5%',
  },
});
