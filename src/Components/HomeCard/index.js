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
import React, {useRef, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../utils';
import {cardData} from '../../dumy-Data/defaultHomeCardData';
import {courseData} from '../../dumy-Data/courseData';
import {AllMentors} from '../../dumy-Data/AllMentors';
import {useNavigation} from '@react-navigation/native';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const HomeCard = () => {
  const navigation = useNavigation();
  //  const [index, setIndex] = useState(0);
  // this function gives the index of current page
  /* const onViewRef = useRef(({changed}) => {
    setIndex(changed[0].item.id);
  }); */
  //it helps the above funtion in getting proper index
  // const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  //aded ref to flatlist to chaange index
  //const flatListRef = useRef(null);
  //function to move to next page

  /* useEffect(() => {
    const nextPage = () => {
      if (index === 0) {
        flatListRef.current?.scrollToIndex({index: 1});
      } else if (index === 1) {
        flatListRef.current?.scrollToIndex({index: 2});
      } else if (index === 2) {
        flatListRef.current?.scrollToIndex({index: 3});
      } else {
        flatListRef.current?.scrollToIndex({index: 0});
      }
    };
    nextPage();
  }, []); */

  return (
    <View style={styles.CardContainer}>
      <FlatList
        data={cardData}
        pagingEnabled
        /*  ref={flatListRef}
       
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current} */
        showsHorizontalScrollIndicator={false}
        horizontal
        /*  onMomentumScrollEnd={event => {
          const index = Math.floor(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width,
          );
        }} */
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
              {item.id == 0 && (
                <Image source={require('../../assets/images/Mentor.png')} />
              )}
              {item.id == 1 && (
                <Image source={require('../../assets/images/Learn.png')} />
              )}
              {item.id == 2 && (
                <Icon
                  name="dollar-sign"
                  size={20}
                  color={AppColors.infoFonts}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                item.id == 0 && navigation.navigate('Mentor');
                item.id == 1 && navigation.navigate('Learn');
                item.id == 2 && navigation.navigate('Funding');
              }}>
              <Text style={styles.btntxt}>
                {item.id == 0 && 'Find Mentors'}
                {item.id == 1 && 'Start Reading'}
                {item.id == 2 && 'Get Funded'}
              </Text>
            </TouchableOpacity>
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
