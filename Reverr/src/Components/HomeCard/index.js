import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../utils';
import {cardData} from '../../dumy-Data/defaultHomeCardData';
import {courseData} from '../../dumy-Data/courseData';
import {AllMentors} from '../../dumy-Data/AllMentors';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const HomeCard = () => {
  // const [index, setIndex] = useState(0);
  // // this function gives the index of current page
  // const onViewRef = useRef(({changed}) => {
  //   setIndex(changed[0].item.id);
  // });
  // //it helps the above funtion in getting proper index
  // const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  // //aded ref to flatlist to chaange index
  // const flatListRef = useRef(null);
  // //function to move to next page
  // let nextPage = () => {
  //   if (index === 0) {
  //     flatListRef.current?.scrollToIndex({index: 1});
  //   } else if (index === 1) {
  //     flatListRef.current?.scrollToIndex({index: 2});
  //   } else if (index === 2) {
  //     flatListRef.current?.scrollToIndex({index: 3});
  //   } else {
  //     flatListRef.current?.scrollToIndex({index: 0});
  //   }
  // };

  // //auto scroll initiater after every 3 seconds
  // let value = setTimeout(nextPage, 3000);

  return (
    <View style={styles.CardContainer}>
      <FlatList
        data={cardData}
        // ref={flatListRef}
        // onViewableItemsChanged={onViewRef.current}
        // viewabilityConfig={viewConfigRef.current}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        // onMomentumScrollEnd={(event) => {
        //   const index = Math.floor(
        //       event.nativeEvent.contentOffset.x /
        //           event.nativeEvent.layoutMeasurement.width
        //   );
        // }}
        renderItem={({item}) => (
          <LinearGradient
            colors={[AppColors.primarycolor, '#012437']}
            start={{x: 0.4, y: 1.3}}
            end={{x: 1, y: 0.5}}
            style={styles.Card}>
            <Text style={styles.heading}>{item.heading}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.subheading}>{item.subHeading}</Text>
              {item.id == 2 ? (
                <Icon
                  name="dollar-sign"
                  size={20}
                  color={AppColors.infoFonts}
                />
              ) : null}
              {item.id == 3 ? (
                <Icon
                  name="comment-dots"
                  size={20}
                  color={AppColors.infoFonts}
                />
              ) : null}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: Width / 50,
              }}>
              {item.id == 0 ? (
                AllMentors.map(item2 => (
                  <TouchableOpacity
                    key={item2.id}
                    style={{
                      marginStart: Width / 35,
                      marginBottom: 5,

                      alignItems: 'center',
                    }}>
                    <Image
                      style={styles.mentorDp}
                      source={{uri: item2.image}}
                    />
                    <Text style={styles.name}>{item2.name}</Text>
                    <Text style={styles.skill}>{item2.skills}</Text>
                  </TouchableOpacity>
                ))
              ) : item.id == 1 ? (
                courseData.map(item3 => (
                  <TouchableOpacity key={item3.id}>
                    <ImageBackground
                      key={item3.id}
                      style={styles.courseimage}
                      source={{uri: item3.image}}>
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        }}>
                        <Text style={styles.title}>{item3.title}</Text>
                        <View
                          style={[
                            styles.overlay,
                            {
                              backgroundColor:
                                item3.id == 2 ? 'rgba(0, 0, 0, 0.5)' : '',
                            },
                          ]}>
                          {item3.id == 2 ? (
                            <Icon
                              name="lock"
                              size={25}
                              style={{
                                alignSelf: 'center',
                                marginTop: '50%',
                              }}
                              color={AppColors.FontsColor}
                            />
                          ) : null}
                          <Icon
                            name="arrow-right"
                            size={25}
                            style={{
                              marginTop:
                                item3.id == 2 ? Height / 70 : Height / 7.5,
                              marginStart: Width / 30,
                            }}
                            color={AppColors.FontsColor}
                          />
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))
              ) : (
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.btntxt}>
                    {item.id == 2 ? 'Get funded' : 'Coming soon!'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Card: {
    backgroundColor: AppColors.CardColor,
    marginHorizontal: Width / 30,
    width: Width / 1.08,
    elevation: 8,
    borderRadius: 10,
  },
  CardContainer: {
    height: Height / 3.2,
    paddingStart: Width / 108,
    marginTop: Height / 11,
  },
  heading: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    width: Width / 1.6,
    marginStart: Width / 19,
    marginTop: Height / 35,
  },
  subheading: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginEnd: '5%',
    marginStart: Width / 19,
    marginTop: Height / 74,
  },
  mentorDp: {
    width: Height > 684 ? Width / 7 : Width / 8,
    height: Height / 14,
    borderRadius: 40,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: 5,
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  skill: {
    color: AppColors.infoFonts,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
  },
  courseimage: {
    width: Width / 4,
    height: Height / 6,
    marginTop: -Height / 25,
    marginBottom: 15,
    marginStart: Width / 35,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    position: 'absolute',
    height: '100%',
  },
  title: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    alignSelf: 'center',
    marginTop: Height / 22,
  },
  button: {
    width: Width / 1.2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.BtnClr,
    height: Height / 16,
    marginTop: Height / 20,
    marginStart: Width / 20,
  },
  btntxt: {
    color: AppColors.ActiveColor,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});

export {HomeCard};
