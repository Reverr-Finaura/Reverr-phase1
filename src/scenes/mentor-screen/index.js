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
  const getMentors = async () => {
    const snapshot = await firestore()
      .collection('Users')
      .get()
      .then(res => {
        let AllUsers = res.docs.map(doc => doc.data());
        let mentors = AllUsers.filter(item => item.userType === 'Mentor');
        let domains = mentors.map(item => item.domain);
        console.log(domains, 'domains');
      });
  };

  useEffect(() => {
    getMentors();
  }, []);

  const navigation = useNavigation();

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
                  start={{x: -0, y: 1.3}}
                  end={{x: 1.3, y: 0.5}}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}>
                  <Image source={item.image} style={styles.image} />
                  <View style={{width: '55%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: AppColors.FontsColor,
                        textAlign: 'center',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>
      </IndividualHeaderLayout>
    </View>
  );
};
