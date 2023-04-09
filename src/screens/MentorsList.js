import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import BusinessCard from '../Components/components/BusinessCard';
import GradientHeader from '../Components/components/GradientHeader';
import {businessCard} from '../utils/sampledata';
import Theme from '../utils/Theme';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const MentorsList = props => {
  const mentorCategory = props.route.params.category;
  const navigation = useNavigation();
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
        let uniqueMentor = mentors.filter(item => item.mentorUniqueID);

        console.log(mentors, 'massa,m');
        setMentorsList(
          mentors?.filter(item => item?.domain?.includes(mentorCategory)),
        );
        //console.log(mentors.length, 'kkfh');
        setLoading(false);
        let g = mentors?.filter(item =>
          item?.domain?.includes(mentorCategory.title),
        );
        //console.log(g);
      });
  };
  useEffect(() => {
    getMentors();
    // console.log(mentorsList[4].email, 'mentors');
  }, []);
  //console.log(mentorsList,"mendhihihas");
  return (
    <View style={styles.container}>
      <GradientHeader />
      <View>
        <View style={{paddingHorizontal: '5%', paddingTop: '3%'}}>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: '3%',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Theme.arrowleft}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{mentorCategory}</Text>
          </View>

          <ScrollView>
            {loading ? (
              <View
                style={{
                  height: 500,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={35} color={Theme.textLightColor} />
              </View>
            ) : (
              <>
                {mentorsList?.length === 0 ? (
                  <View
                    style={{
                      height: '80%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: Theme.textLightColor}}>
                      😒There is No any Mentor in this Category
                    </Text>
                  </View>
                ) : (
                  <>
                    {mentorsList?.map((item, index) => {
                      return (
                        <View key={index}>
                          <BusinessCard
                            // userimage={item.image}
                            // industryname={item.industry}
                            // duration={item.duration}
                            // name={item.name}
                            // reviews={item.reviews}
                            // rating={item.Rating}
                            // feature1={item.feature1}
                            // feature2={item.feature2}
                            // designation={item.designation}
                            fulldetails={item}
                          />
                        </View>
                      );
                    })}
                    <View style={{height: 20}} />
                  </>
                )}
              </>
            )}
            <View style={{height: 160}} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default MentorsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
  },
  title: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tabWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 3,
  },
  activeStyle: {
    borderBottomWidth: 2,
    marginRight: 15,
  },
});
