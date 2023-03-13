import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ToastAndroid
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { BackButton } from '../../../Components';
import { AppColors } from '../../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { saveCourse, removeCourse } from '../../../Redux/actions';
import firestore from '@react-native-firebase/firestore';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const StartCourse = props => {
  const courseData = props.route.params.CourseDetails;
  const navigation = useNavigation();
  const [chp, setchp] = useState(0);
  const [slide, setslide] = useState(0);
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };
  const SaveCourses = async (id) => {
    dispatch(saveCourse(id))
    await firestore().collection('Users').doc(state.user.email).update({
      savedCourses: [...state.user.savedCourses, id]
    }).then(() => {
      showToast("Course Saved Successfully")
    }).catch(err => {
      showToast("Error while saving the course!")
    })
  }

  const RemoveCourse = async (id) => {
    var bucket = [];
    for (var i = 0; i < state?.user?.savedCourses.length; i++) {
      if (id != state?.user?.savedCourses[i]) {
        bucket.push(state?.user?.savedCourses[i]);
      }
    }
    dispatch(removeCourse(id));
    await firestore().collection('Users').doc(state.user.email).update({
      savedCourses: bucket
    }).then(() => {
      showToast("Course Removed Successfully")
    }).catch(err => {
      showToast("Error while removing the course!")
    })

  }

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={{ width: '100%', height: Height / 2.7, paddingTop: '5%' }}
        source={{ uri: courseData.image }}>
        <BackButton
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            alignItems: 'center',
            paddingVertical: '3%',
            top: 160,
            height: '100%',
          }}>
          <Text
            style={{
              color: AppColors.FontsColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
            }}>
            {courseData.name}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.circle}>
          <Icon name="link" size={28} color={AppColors.ActiveColor} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.circle}
          onPress={() => {
            if (state?.user?.savedCourses?.includes(courseData.id)) {
              RemoveCourse(courseData.id);
            } else {
              SaveCourses(courseData.id)
            }
          }}>
          <Icon2 name={state?.user?.savedCourses?.includes(courseData.id) ? "bookmark" : 'bookmark-outline'} size={28} color="#0077B7" />
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.ContinueButton}
          onPress={() => {
            navigation.navigate('Instruction', {
              BookData: courseData.chapter[chp],
            });
          }}>
          <Text style={styles.btnTxt}>Continue</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.txt}>Chapters</Text>
      <ScrollView style={styles.ChapterContainer}>
        <FlatList
          data={courseData.chapter}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.ChapterCard}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.chapter}>Chapter - {index + 1}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setchp(index);
                    navigation.navigate('Instruction', {
                      BookData: item,
                    });
                  }}
                  style={[
                    styles.circle,
                    { backgroundColor: AppColors.ActiveColor },
                  ]}>
                  <Icon2
                    name="chevron-forward-outline"
                    size={28}
                    color={AppColors.FontsColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  actionContainer: {
    paddingVertical: '4%',
    flexDirection: 'row',
  },
  circle: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginStart: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.FontsColor,
  },
  ContinueButton: {
    backgroundColor: AppColors.ActiveColor,
    marginStart: '15%',
    paddingHorizontal: '10%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  txt: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    marginHorizontal: '6%',
  },
  ChapterContainer: {
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },
  ChapterCard: {
    backgroundColor: AppColors.BtnClr,
    borderRadius: 18,
    marginVertical: '2%',
    paddingVertical: '4%',
    paddingHorizontal: '5%',
  },
  chapter: {
    color: AppColors.CardColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  progressContainer: {
    height: 5,
    marginVertical: '3%',
    borderRadius: 50,
    width: '100%',
    backgroundColor: AppColors.CardColor,
  },
});
export { StartCourse };
