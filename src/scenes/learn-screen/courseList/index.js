import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../../../utils';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {BackButton, CourseLoader} from '../../../Components';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CourseList = props => {
  const courseCategory = props.route.params.courseCategory;
  const [courseData, setCourseData] = useState();
  const [loading, setLoading] = useState(false);
  const [column, setColumn] = useState(2);
  const getCourses = async () => {
    setLoading(true);
    const snapshot = await firestore()
      .collection('Courses')
      .get()
      .then(res => {
        let courses = res.docs.map(doc => doc.data());
        setCourseData(courses.filter(item => item.course === courseCategory));
        setLoading(false);
      });
  };

  const navigation = useNavigation();

  useEffect(() => {
    getCourses();
    //console.log(courseData);
  }, []);
  return (
    <View style={styles.screen}>
      <View
        style={{
          paddingTop: '5%',
          paddingStart: '3%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <BackButton IconSize={27} />
      </View>
      <View
        style={{
          marginTop: '5%',
          paddingBottom: '20%',
        }}>
        <Text
          style={{
            marginStart: '3%',
            color: AppColors.FontsColor,
            fontFamily: 'Poppins-Bold',
          }}>
          {courseCategory}
        </Text>
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: '80%',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={35} color={AppColors.FontsColor} />
          </View>
        ) : (
          <FlatList
            data={courseData}
            numColumns={column}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View
                style={{
                  width: Width / 2.2,

                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '2%',
                }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate('StartCourse', {
                      CourseDetails: item,
                    });
                  }}
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    width: Width / 2.2,
                  }}>
                  <ImageBackground
                    source={{uri: item.image}}
                    style={{
                      width: Width / 2.2,
                      height: Height / 4,
                      borderRadius: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        marginTop: '70%',
                        height: '100%',
                        alignItems: 'center',
                        paddingTop: '2%',
                      }}>
                      <Text style={{color: AppColors.FontsColor, fontSize: 17}}>
                        {item.course}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
});

export {CourseList};
