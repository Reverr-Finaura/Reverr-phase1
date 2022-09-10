import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  ActivityIndicator,
  Button,
  ImageBackground,
} from 'react-native';

// import { useNavigation } from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {CustomPopup, IndividualHeaderLayout} from '../../Components';
import {Choice} from '../../Components';
import {AppColors} from '../../utils';
import {
  Load_Card,
  matchedpeople,
  passedUser,
  Passed_User,
  RemoveTopCard,
} from '../../Redux/actions';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const Vibe = () => {
  const navigation = useNavigation();
  const [demoData, setDemoData] = useState([
    {
      id: '123',
      name: 'Jatin Khurana',
      designation: 'CEO and Fintech',
      country: 'India',
      city: 'Delhi',
      image: '../../assets/images/dp.png',
      quote:
        "Don't ship it. Don't settle for good enough. Do better work than you did yesterday. Get out of your comfort zone and give it your all",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [mainDialog, setMainDialog] = useState(false);
  const [prevDailog, setPrevDailog] = useState(false);
  const [prevData, setPrevData] = useState();
  const [idx, setIdx] = useState(0);
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    setIdx(0);
    setLoading(true);
    //setIdx(0);
    console.log(idx);
    if (state.user.no_of_swipe < 15) {
      if (state.vibe.length == 0 || idx == 0) {
        dispatch(
          Load_Card(
            undefined,
            state.user.email,
            state.user.no_of_swipe,
            state.passed_userArray,
            state.Matched_userArray,
          ),
        );
        //
      } else if (idx % 3 == 0) {
        console.log('yes coming from %3');
        dispatch(
          Load_Card(
            state.last_card,
            state.user.email,
            state.user.no_of_swipe,
            state.passed_userArray,
            state.Matched_userArray,
          ),
        );
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(state.vibe.length);
    //setIdx(0);
    console.log('this is changing at idx', idx);
    if (state.user.no_of_swipe < 15) {
      if (state.vibe.length == 0) {
        dispatch(
          Load_Card(
            undefined,
            state.user.email,
            state.user.no_of_swipe,
            state.passed_userArray,
            state.Matched_userArray,
          ),
        );
        //
      } else if (idx % 4 == 0) {
        console.log('yes I am here at index');
        dispatch(
          Load_Card(
            state.last_card,
            state.user.email,
            state.user.no_of_swipe,
            state.passed_userArray,
            state.Matched_userArray,
          ),
        );
      }
    }
    setLoading(false);
  }, [idx]);
  //To Rest No_of_swipe
  useEffect(() => {
    console.log('I am inside no of swipe');
    if (state.user.no_of_swipe >= 15) {
      const ExpiredDate = new Date();
      console.log(ExpiredDate);
      console.log(ExpiredDate.getTime());
      const ExpiredTime = ExpiredDate.getTime();
      const UpdatedTime = ExpiredTime + 86400000;
      // It is 24 hrrs in milli second
      const ToChecKAfter = 86397500;
      console.log('updated time',UpdatedTime);

      setTimeout(async () => {
        const UpdateDate = new Date();
        const NewUpdatedTime = UpdateDate.getTime();
        console.log('New update time', NewUpdatedTime);
        if (UpdatedTime > NewUpdatedTime) {
          await firestore().collection('Users').doc(state.user.email).update({
            no_of_swipe: 0,
          });
          // console.log(" called here")
        } else {
          console.log('I am not here');
        }
      }, ToChecKAfter);
    }
  }, [state.user.no_of_swipe]);
  console.log('no of swipe', state.user.no_of_swipe);

  const [finish, setFinished] = useState(false);
  const {width, height} = Dimensions.get('window');
  const swipe = useRef(new Animated.ValueXY()).current;
  const titleSign = useRef(new Animated.Value(1)).current;

  const Add_To_Passed = async cardData => {
    let CardEmail = cardData.email;
    if (CardEmail) {
      dispatch(passedUser(CardEmail));
      console.log('passed email is', CardEmail);
      console.log('anything hdddddere');
      await firestore()
        .collection('Users')
        .doc(state.user.email)
        .update({
          Passed_Email: firestore.FieldValue.arrayUnion(CardEmail),
        });
      // console.log("passed_Array is",state.passed_userArray)

      // Passed array in firestore get function->
      // var docRef = firestore().collection("Users").doc(state.user.email);

      // docRef.get().then((doc) => {
      //     if (doc.exists) {
      //         console.log("Document data:", doc.data().Passed_Email);
      //         var Passed_User_array= doc.data().Passed_Email

      //     } else {
      //         // doc.data() will be undefined in this case
      //         console.log("No such document!");
      //     }
      // }).catch((error) => {
      //     console.log("Error getting document:", error);
      // });
    }
  };
  const Add_to_Match = async data => {
    // console.log('data is', data);
    var Liked_Email = data.email;
    var My_Email = state.user.email;
    var Liked_People = data.liked_people;
    if (Liked_People) {
      var check = Liked_People.includes(My_Email);
      if (check) {
        await firestore()
          .collection('Users')
          .doc(state.user.email)
          .update({
            Matched_People: firestore.FieldValue.arrayUnion(Liked_Email),
          });
        // action dispacthed to store matchedpeople
        dispatch(matchedpeople(Liked_Email));
        // Match screen is called here
        navigation.navigate('MatchScreen', {
          data,
        });

        setPrevDailog(true);
        setPrevData(prev);
      }
    } else {
      await firestore()
        .collection('Users')
        .doc(state.user.email)
        .update({
          liked_people: firestore.FieldValue.arrayUnion(Liked_Email),
        })
        .then(async () => {
          await firestore()
            .collection('Users')
            .doc(Liked_Email)
            .update({
              people_liked_me: firestore.FieldValue.arrayUnion(
                state.user.email,
              ),
            });
        })
        .catch(err => {
          console.log(err.message);
          console.log('please check your internet connection');
        });
    }
  };
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy, y0}) => {
      swipe.setValue({x: dx, y: dy});
      if (dx < -140) {
        console.log('I am calling from here');
        Add_To_Passed(state?.vibe[0]);
      }
      if (dx > 80) {
        setMainDialog(true);
        Add_to_Match(state?.vibe[0]);
        // Add_to_likes(state?.vibe[0]);
      }
      titleSign.setValue(y0 > Dimensions.get('window').height / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;
      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * 500,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    dispatch(RemoveTopCard());
    setIdx(idx => idx + 1);
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);
  const rotate = Animated.multiply(swipe.x, titleSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const unlikeOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            {opacity: likeOpacity},
          ]}
        >
          <Choice type="Like" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.unlikeContainer,
            {opacity: unlikeOpacity},
          ]}
        >
          <Choice type="UnLike" />
        </Animated.View>
      </>
    );
  }, []);

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), {rotate}],
  };
  const RenderCard = ({item, index, isFirst, titleSign}) => {
    // let isFirst=false;
    let dragHandler;
    if (index == 0) {
      isFirst = true;
      dragHandler = isFirst ? panResponder.panHandlers : {};
    }

    return (
      <Animated.View
        style={[styles.card, isFirst && animatedCardStyle]}
        {...dragHandler}
      >
        {isFirst && renderChoice()}

        <ImageBackground
          style={styles.image}
          source={{uri: item.image}}
        ></ImageBackground>
        <View style={{display: 'flex'}}>
          <View style={{marginHorizontal: 10, marginTop: 20}}>
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                fontFamily: 'poppins',
                fontWeight: 'bold',
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '400',
              }}
            >
              {item.designation || demoData[0].designation}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '400',
              }}
            >
              {item.city || demoData[0].city}
              {' ,'}
              {item.country || demoData[0].country}
            </Text>
          </View>

          <View style={{marginTop: 35}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 10,
                marginHorizontal: 10,
              }}
            >
              {item.quote || demoData[0].quote}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const PremiumTab = () => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width / 1.1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Text style={styles.heading}>
          Buy Premium to connect with people who are interested in your profile.
        </Text>
        <Text
          style={{
            color: '#fff',
            marginTop: 20,
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Many people viewed your profile
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 180,
            marginVertical: 20,
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderColor: 'dodgerblue',
              width: 180,
              height: 180,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{width: 100, height: 100}}
              source={require('../../assets/images/MentorCard.png')}
            />
            <Text style={{color: 'grey'}}>Alice</Text>
          </View>
          <Image
            style={{width: 250, height: 100}}
            source={require('../../assets/images/Rectangleimg.png')}
          />
        </View>
        <Text style={{color: 'grey', marginLeft: 40}}>
          Explore more options with our premium service.
        </Text>
        <View style={styles.button}>
          <Image
            style={{marginRight: 40}}
            source={require('../../assets/images/badge.png')}
          />
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Buy premium
          </Text>
        </View>
      </View>
    );
  };
  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  return (
    <IndividualHeaderLayout>
      <CustomPopup
        modalVisible={prevDailog}
        setModalVisible={() => setPrevDailog(false)}
      >
        <View>
          <Text>Prev Data Show Here</Text>
        </View>
      </CustomPopup>
      {demoData.length == 0 && <PremiumTab />}

      {!finish && state.vibe.length > 0 ? (
        <View style={{flex: 1}}>
          {state.vibe
            .map((item, index) => {
              const isFirst = index === 0;
              return (
                <RenderCard
                  item={item}
                  index={index}
                  key={item.id.toString()}
                  isFirst={isFirst}
                  titleSign={titleSign}
                />
              );
            })
            .reverse()}
        </View>
      ) : (
        <PremiumTab />
      )}
    </IndividualHeaderLayout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    backgroundColor: AppColors.primarycolor,
  },
  card: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: -20,
    width: Dimensions.get('window').width / 1.15,
    height: Dimensions.get('window').height / 1.35,
    marginHorizontal: 35,
    marginVertical: 20,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 2,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'dodgerblue',
  },
  image: {
    width: Dimensions.get('window').width / 1.17,
    height: Dimensions.get('window').height / 2.5,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    opacity: 0.9,
    display: 'flex',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },

  heading: {
    color: '#0077B7',
    fontWeight: 'bold',
    maxWidth: Dimensions.get('window').width / 1.2,
    fontSize: 22,
  },
  button: {
    backgroundColor: '#0077B7',
    width: 300,
    height: 60,
    borderRadius: 25,
    marginTop: 35,
    marginLeft: 50,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  likeContainer: {
    left: 45,
    top: Dimensions.get('window').height / 14,
    position: 'absolute',
    transform: [{rotate: '-30deg'}],
    zIndex: 3,
  },
  unlikeContainer: {
    right: 45,
    top: Dimensions.get('window').height / 14,
    position: 'absolute',
    transform: [{rotate: '30deg'}],
    zIndex: 3,
  },
});

export {Vibe};
