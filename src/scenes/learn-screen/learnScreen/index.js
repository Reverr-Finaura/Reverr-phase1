import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  CourseLoader,
  IndividualHeaderLayout,
  NewsLoader,
  SwipeCard,
} from '../../../Components';
import firestore from '@react-native-firebase/firestore';
import {AppColors} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {courseCategory} from '../../../dumy-Data/courseCategory';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {arrangeList} from '../../../assets/data/dummyData';
import {capitalizeFirstLetter} from '../../../utils/Helper/helper';
import GradientHeader from '../../../Components/components/GradientHeader';
import Theme from '../../../utils/Theme';
import {AllCourseModuleData} from '../../../dumy-Data/AllCourseModuleData';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const LearnScreen = () => {
  const [courseData, setCourseData] = useState();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [column, setColumn] = useState(2);
  const navigation = useNavigation();

  const getCourses = async () => {
    setLoading(true);
    setLoader(true);
    const snapshot = await firestore()
      .collection('Courses')
      .get()
      .then(res => {
        let courses = res.docs.map(doc => doc.data());
        let allJourneyCourseData = courses.filter(
          item => item.course === 'The Journey',
        );
        let sortedCourseData = [];
        for (let i = 0; i < allJourneyCourseData.length; i++) {
          let sort = allJourneyCourseData.filter(
            data => data.name == arrangeList[i],
          );
          //console.log(sort);
          sortedCourseData.push(sort[0]);
        }

        sortedCourseData?.map((item, i) =>
          console.log(item.name, '😆', item.image, '😆'),
        );
        setCourseData(sortedCourseData);
        setLoading(false);
        setLoader(false);
      });
  };
  useEffect(() => {
    getCourses();
  }, []);

  console.log(AllCourseModuleData.length, 'jkj');
  return (
    <View style={{backgroundColor: AppColors.primarycolor, flex: 1}}>
      <GradientHeader />
      <View>
        <View style={{marginTop: '5%'}}>
          {loading ? (
            <SkeletonPlaceholder backgroundColor="#012437">
              <View
                style={{
                  width: '95%',
                  height: 170,
                  marginHorizontal: '2%',
                  marginVertical: '2%',
                  borderRadius: 10,
                }}></View>
            </SkeletonPlaceholder>
          ) : (
            <SwipeCard
              data={courseData}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            />
          )}
        </View>
        <View style={styles.Btn}>
          <View
            style={{
              height: '100%',
              width: '80%',
              alignItems: 'center',
              paddingHorizontal: '15%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                width: '100%',
                color: 'black',
                fontFamily: 'Poppins-Bold',
                fontSize: 18,
                textAlign: 'center',
              }}>
              The Journey
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              ToastAndroid.showWithGravityAndOffset(
                ' Quiz Not Available ',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            }}
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
        <View style={{height: '55%'}}>
          <View
            style={{
              marginVertical: '8%',
              backgroundColor: AppColors.primarycolor,
            }}>
            <FlatList
              data={AllCourseModuleData}
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
                      source={{uri: item?.frontscreen.coverImg}}
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
                          paddingTop: '4%',
                          paddingHorizontal: '3%',
                        }}>
                        <Text
                          style={{
                            color: AppColors.FontsColor,
                            fontSize: 17,
                            textAlign: 'center',
                          }}>
                          {item?.frontscreen.name}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )}
            />
            {/* <View style={{height: 200}} /> */}
          </View>
          {/* {loader ? (
            <View
              style={{
                marginTop: '8%',
                justifyContent: 'center',
              }}>
              <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                numColumns={column}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <SkeletonPlaceholder backgroundColor="#012437">
                    <View
                      style={{
                        width: 190,
                        height: 170,
                        marginHorizontal: '2%',
                        marginVertical: '2%',
                        borderRadius: 10,
                      }}></View>
                  </SkeletonPlaceholder>
                )}
              />
            </View>
          ) : (
            <View
              style={{
                marginVertical: '8%',
                backgroundColor: AppColors.primarycolor,
              }}>
              <FlatList
                data={AllCourseModuleData}
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
                        source={{uri: item?.frontscreen.coverImg}}
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
                            paddingTop: '4%',
                            paddingHorizontal: '3%',
                          }}>
                          <Text
                            style={{
                              color: AppColors.FontsColor,
                              fontSize: 17,
                              textAlign: 'center',
                            }}>
                            {item?.frontscreen.name}
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                )}
              />
           
            </View>
          )} */}
        </View>
      </View>
    </View>
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
    width: '95%',
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
