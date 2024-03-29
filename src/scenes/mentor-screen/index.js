import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {IndividualHeaderLayout} from '../../Components';
import {MentorCardLayout} from '../../Components/Mentor-card-layout';
import styles from './styles';

import {useSelector} from 'react-redux';
import {MentorCard} from '../../Components/MentorCard';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {mentorCategory, mentorsDomains} from '../../dumy-Data/mentorsCategory';
import {AppColors} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export const Mentor = () => {
  const [column, setColumn] = useState(2);
  const [mentorsList, setMentorsList] = useState();
  const state = useSelector(state => state.UserReducer);
  var mc = mentorCategory;
  var newlist = [];
  /*  const getMentors = async () => {
    // setLoading(true);
    const snapshot = await firestore()
      .collection('Users')
      .get()
      .then(res => {
        let AllUsers = res.docs.map(doc => doc.data());

        let mentors = AllUsers.filter(item => item.userType === 'Mentor');
        console.log(mentors.length, 'mentors');
        console.log(AllUsers.length, 'ALlUSERS');
        mentors.map((mentor)=>{
          if(newlist.includes(mentor.industry)){
            console.log("included")
          }
          else{
            newlist.push(mentor.industry);
          }
        }),
          // setLoading(false);
          console.log(newlist);
          console.log(newlist.length)
          console.log(mentorCategory.length)
      });
  };

  useEffect(()=>{
    // getMentors();
  },[]) */

  const navigation = useNavigation();

  console.log(state.user.domain, 'dhuj');

  return (
    <View style={styles.container}>
      <IndividualHeaderLayout>
        <View style={{paddingBottom: '32%'}}>
          <View style={{alignItems: 'center', paddingVertical: '3%'}}>
            <Text style={{color: AppColors.FontsColor, fontSize: 22}}>
              Mentors Categories
            </Text>
          </View>
          <FlatList
            numColumns={column}
            data={mentorsDomains}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('MentorList', {
                    mentorCategory: item,
                  });
                }}
                style={styles.Card}
                activeOpacity={0.7}>
                <LinearGradient
                  colors={[AppColors.ActiveColor, AppColors.primarycolor]}
                  start={{x: -1, y: 1.3}}
                  end={{x: 3, y: 0.5}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: AppColors.FontsColor,
                      fontSize: 17,
                      textAlign: 'center',
                      marginHorizontal: '6%',
                    }}>
                    {item}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>
      </IndividualHeaderLayout>
    </View>
  );
};
