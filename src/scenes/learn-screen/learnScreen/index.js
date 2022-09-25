import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  CourseLoader,
  IndividualHeaderLayout,
  SwipeCard,
} from '../../../Components';
import firestore from '@react-native-firebase/firestore';
import {AppColors} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {courseCategory} from '../../../dumy-Data/courseCategory';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const LearnScreen = () => {
  const [courseData, setCourseData] = useState();
  const [loading, setLoading] = useState(false);
  const [column, setColumn] = useState(2);
  const navigation = useNavigation();

  const getCourses = async () => {
    setLoading(true);
    const snapshot = await firestore()
      .collection('Courses')
      .get()
      .then(res => {
        setCourseData(res.docs.map(doc => doc.data()));
        setLoading(false);
      });
  };
  useEffect(() => {
    getCourses();
    console.log(courseData, 'lea');
  }, []);

  return (
    <IndividualHeaderLayout>
      <ScrollView style={{paddingTop: '5%'}}>
        <SwipeCard
          data={courseData}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
        <View style={styles.Btn}>
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              paddingHorizontal: '15%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Bold',
                fontSize: 18,
              }}>
              Take today’s quiz
            </Text>
            <Text
              style={{
                color: AppColors.CardColor,
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
              }}>
              Or continue taking one
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: AppColors.ActiveColor,
              height: '100%',
              width: '20%',
              alignItems: 'center',
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              justifyContent: 'center',
            }}>
            <Icon name="angle-right" size={55} color={AppColors.FontsColor} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingVertical: '8%',
            paddingTop: '3%',
            marginTop: '1%',
          }}>
          <Text
            style={{
              marginStart: '3%',
              color: AppColors.FontsColor,
              fontFamily: 'Poppins-Bold',
              fontSize: 18,
            }}>
            Categories
          </Text>
          <FlatList
            numColumns={column}
            data={courseCategory}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CourseList', {
                    courseCategory: item,
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
      </ScrollView>
    </IndividualHeaderLayout>
  );
};
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    top: Height > 684 ? 140 : 90,
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 20,
  },
  Btn: {
    width: '85%',
    marginTop: '3%',
    justifyContent: 'space-between',
    height: 80,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.FontsColor,
  },
  alertSection: {
    alignItems: 'center',
    borderTopColor: AppColors.BtnClr,
    borderBottomColor: AppColors.BtnClr,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    marginTop: '5%',
    paddingVertical: '7%',
    marginHorizontal: '4%',
  },
  popularCard: {
    width: Width / 2.3,
    height: Height > 684 ? Height / 4 : Height / 5,
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
export {LearnScreen};
