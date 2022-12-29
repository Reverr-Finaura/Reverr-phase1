import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {MentorCard} from '../../../Components/MentorCard';
import {useSelector} from 'react-redux';
import {BackButton} from '../../../Components';
import {AppColors} from '../../../utils';
import firestore from '@react-native-firebase/firestore';

const width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const MentorList = props => {
  const mentorCategory = props.route.params.mentorCategory;
  const [mentorsList, setMentorsList] = useState();
  const [column, setColumn] = useState(2);
  const [loading, setLoading] = useState(false);

  // console.log(mentorsList);

  const getMentors = async () => {
    setLoading(true);
    const snapshot = await firestore()
      .collection('Users')
      .get()
      .then(res => {
        let AllUsers = res.docs.map(doc => doc.data());
        let mentors = AllUsers.filter(item => item.userType === 'Mentor');
        setMentorsList(
          mentors.filter(item => item.domain?.includes(mentorCategory.title)),
        );
        setLoading(false);
      });
  };
  useEffect(() => {
    getMentors();
    // console.log(mentorsList[4].email, 'mentors');
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: AppColors.primarycolor}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: '3%',
        }}>
        <BackButton IconSize={30} />
        <Text
          style={{
            color: AppColors.FontsColor,
            fontSize: 19,
            marginStart: '5%',
          }}>
          {mentorCategory.title}
        </Text>
      </View>
      <ScrollView scrollEnabled={true} style={{paddingBottom: '30%'}}>
        {mentorsList && mentorsList.length == 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '60%',
            }}>
            <Text style={{color: AppColors.FontsColor, fontSize: 20}}>
              We Have No Mentors In This Categry
            </Text>
          </View>
        ) : (
          <View>
            {loading ? (
              <View style={{paddingTop: '60%'}}>
                <ActivityIndicator size={50} color={AppColors.FontsColor} />
              </View>
            ) : (
              <FlatList
                scrollEnabled={true}
                contentContainerStyle={styles.container}
                numColumns={2}
                data={mentorsList}
                renderItem={item => <MentorCard mentor={item} />}
              />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000c12',
    paddingHorizontal: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginHorizontal: '27%',
    fontSize: width > 400 ? 20 : 16,
    fontWeight: '700',
  },
  card: {
    flex: 1,
    width: Dimensions.get('window').width / 1.1,
  },
  Card: {
    width: '46%',
    height: Height / 6.3,
    margin: '2%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {MentorList};
