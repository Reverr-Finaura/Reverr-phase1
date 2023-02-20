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
  TouchableOpacity,
  Modal,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MultiSelect from 'react-native-multiple-select';

// import { useNavigation } from '@react-navigation/native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {CustomPopup, IndividualHeaderLayout} from '../../Components';
import {Choice} from '../../Components';
import {AppColors} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {
  Load_Card,
  matchedpeople,
  passedUser,
  Passed_User,
  RemoveTopCard,
} from '../../Redux/actions';
import firestore from '@react-native-firebase/firestore';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {cardData} from '../../dumy-Data/defaultHomeCardData';
import {VibeBoarding} from '../../Components/VibeBoarding';
import CountDown from 'react-native-countdown-component';
import {firebase} from '@react-native-firebase/database';
import {CountdownTimer} from '../CountdownTimer';
import {useLayoutEffect} from 'react';
import {blue} from 'react-native-redash';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
const totalScore = [
  {
    title: 'Juice',
    detial: 'Grapefruit Juice.',
    price: '170',
    image: 'https://static.toiimg.com/photo/msid-82736662/82736662.jpg?896468',
    orderID: '46456',
  },
  {
    title: 'Juice',
    detial: 'Grapefruit Juice.',
    price: '170',
    image: 'https://static.toiimg.com/photo/msid-82736662/82736662.jpg?896468',
    orderID: '46456',
  },
  {
    title: 'Noodles',
    detial: 'Prawns Wrapped In Noodles. ..',
    price: '500',
    image:
      'https://www.foodiecrush.com/wp-content/uploads/2019/07/Pomodoro-Sauce-foodiecrush.com-018-500x500.jpg',
    orderID: '34546',
  },
  {
    title: 'Pasta',
    detial: 'Pasta alla Carbonara. ...',
    price: '1000',
    image: 'https://static.toiimg.com/thumb/57730102.cms?width=1200&height=900',
    orderID: '4747',
  },
  {
    title: 'Pasta',
    detial: 'Pasta alla Carbonara. ...',
    price: '1000',
    image: 'https://static.toiimg.com/thumb/57730102.cms?width=1200&height=900',
    orderID: '4747',
  },
];
const Vibe = () => {
  const [continueshowingcard, setcontinueshowingcard] = useState(true);
  const [prevDailog, setPrevDailog] = useState(false);
  const [allswiped, setAllswiped] = useState(false);
  const [showboarding, setshowboarding] = useState(false);
  const [more, setMore] = useState(false);
  const [LoadingScreen, setLoadingScreen] = useState(false);
  const [toshowtimer, settoshowtimer] = useState(false);
  const Card_FireBase_Update = useRef(0);
  const [TotalSwipe, setTotalswipe] = useState(0);
  const [showCards, setshowCards] = useState(false);
  const [hasPremiumOfVibe, setHasPremiumOfVibe] = useState(false);
  console.log('hasPremiumm', hasPremiumOfVibe);
  const [selected1, setselected1] = useState([]);

  const [filter, setFilter] = useState(false);
  const [selected2, setselected2] = useState([]);

  const [selected3, setselected3] = useState([]);
  const HareFor = [
    {id: 'Find Investors', name: 'Find Investors'},
    {id: 'Networking', name: 'Networking'},
    {id: 'Hire Employees', name: 'Hire Employees'},
    {id: 'Find Mentor', name: 'Find Mentor'},
    {id: 'Find Cofounders', name: 'Find Cofounder'},
  ];

  const meetdata = [
    {id: 'At Coffee', name: 'At Coffee'},
    {id: 'Video Call', name: 'Video Call'},
    {id: 'Local Cafe', name: 'Local Cafe'},
  ];
  const yearsExperience = [
    {id: ' < 1', name: '<1'},
    {id: '1-2', name: '1-2'},
    {id: '2-5', name: '2-5'},
    {id: '5>', name: '5>'},
  ];

  const onSelectedItemsChange3 = data => {
    console.log('here meet', data);
    setselected3(data);
    console.log(data);
    console.warn(selected3);
  };
  const onSelectedItemsChange1 = data => {
    console.log('here meet', data);
    setselected1(data);
    console.log(data);
    console.warn(selected1);
  };
  const onSelectedItemsChange2 = data => {
    console.log('here meet', data);
    setselected2(data);
    console.log(data);
    console.warn(selected2);
  };
  const filterModal = () => {
    setFilter(v => !v);
  };
  const navigation = useNavigation();

  // const isFocused = useIsFocused();

  const LikeTab = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('LikeScreen')}>
          <View
            style={{
              borderColor: 'dodgerblue',
              borderWidth: 1,
              backgroundColor: '#000C12',
              width: 68,
              height: 42,
              left: 40,
              justifyContent: 'center',
              borderBottomEndRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <Text
              style={{
                backgroundColor: '#000C12',
                color: 'white',
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: '700',
              }}>
              likes
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{paddingRight: 35}}>
          <TouchableOpacity onPress={() => filterModal()}>
            <Icon name="filter" color="#ffffff" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const Vibes = () => {
    const {params} = useRoute();
    const data = 'abc';
    console.log('data paraams ', params);

    const navigation = useNavigation();
    const state = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();

    const [moreInfo, setMoreInfo] = useState(-1);
    const [bool, setBool] = useState(false);
    const [cardindex, setcardindex] = useState(0);

    const [swipe, setswipe] = useState(1);
    const [loading, setLoading] = useState(false);
    const [mainDialog, setMainDialog] = useState(false);
    const [prevDailog, setPrevDailog] = useState(false);
    const [prevData, setPrevData] = useState();
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
    const [checkingdata, setcheckingdata] = useState({
      Education: 'MBA',
      Here_for: ['FIND INVESTORS', 'FIND MENTORS', 'FIND EMPLYOYEE'],
      How_To_Meet: ['At Coffee', ' Video Call', 'Local Cafe'],
      Industry: 'FINTECH',
      Previous_Designation: 'GOOGLE',
      Previous_Org: 'GOOGLE SWE',
      Previous_org_Duration: ['2'],
      Years_Of_Experience: ['4'],
    });
    const [getcard, setgetcards] = useState(0);
    const [show, setshow] = useState(false);
    const [vertical, setvertical] = useState(false);

    const HandleShow = async () => {
      console.log('at shoiww');
      console.log(show);
      setshow(() => !show);
      setvertical(() => !vertical);
      console.log('after', show);
    };

    const swipeLeft = async CurrentIndex => {
      console.log('card index is', CurrentIndex);
      if (!cards[cardindex]) return;
      const LeftSwiped = cards[CurrentIndex];
      console.log('Left detail', LeftSwiped.id);
      firestore()
        .collection('Users')
        .doc(state.user.email)
        .collection('passeduser')
        .doc(LeftSwiped.id)
        .set(LeftSwiped);
    };

    const Tapanywhere = cardindex => {
      const data = cards[cardindex];
      console.log('Tap anywhere', data);
      navigation.navigate('ShowMoreVibe', data);
    };

    const swipeRight = async CurrentIndex => {
      // var currCard = cards[idx];

      const data = cards[CurrentIndex];
      console.log('right datta', data);
      dispatch(RemoveTopCard());
      // console.log('stae  vibe swipe right isss', state.vibe);
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
            console.log('userswiped');
          })
          .catch(err => {
            console.log(err.message);
            console.log('please check your internet connection');
          });
      }
    };

    const [cards, setcards] = useState([]);
    console.log('What is item dddd', cards);
    alert(cards)

    const swipedAll = () => {
      console.log('swiped all');
      setAllswiped(true);
    };

    const HandleOnSwiped = async cardindex => {
      setcardindex(prev => prev + 1);
      setswipe(prev => prev + 1);
      const Data = cards[cardindex];
      console.log('datattaa', Data);
      await firestore().collection('Users').doc(state.user.email).update({
        Number_Of_Swips_Done: swipe,
      });

      await firestore()
        .collection('Users')
        .doc(state.user.email)
        .update({Last_Card_Email_Swiped: Data.id});
    };

    console.log('state card is', state.vibe.length);
    console.log('datta coming from boarding', data);
    const CheckIfBoarding = async () => {
      await firestore()
        .collection('Users')
        .doc(state.user.email)
        .get()
        .then(doc => {
          if (doc.data().Vibe_Data) {
            console.log('Document vibe data:', doc.data().Vibe_Data);

            console.log('yoooi');
          } else {
            // doc.data() will be undefined in this case
            setshowCards(false);
            console.log('No such document!');
            navigation.navigate('VibeBoarding');
          }
        })
        .catch(error => {
          console.log('Error getting document:', error);
        });
    };

    // This will run after VibeBoarding screen
    if (params) {
      console.log('after boarding screen here');
      setshowCards(true);
    }
    //CHECK WHETHER USER HAS PREMIUM SUBSCRIBE FOR VIBE
    useEffect(() => {
      const checkForVibePremium = async () => {
        await firestore()
          .collection('Users')
          .doc(state.user.email)
          .get()
          .then(data => {
            if (data._data.hasVibePremium) {
              if (data._data.hasVibePremium === true) {
                data._data.Premium.map(item => {
                  if (item.id === 'VIBE') {
                    if (
                      new Date(item.DateOfExpiry.seconds * 1000) >= new Date()
                    ) {
                      setHasPremiumOfVibe(true);
                    }
                  }
                });
              }
            }
          });
      };
      checkForVibePremium();
    }, []);

    // Intial setting  here
    useEffect(() => {
      let Afterquery;
      const FetchUsersCard = async () => {
        if (state.user.AllCardsSwiped) {
          console.log(state.user, 'what is this');
          const NewExpiredDate = new Date();
          console.log(NewExpiredDate);
          console.log('Expiredtime', NewExpiredDate.getTime());
          const NewExpiredTime = NewExpiredDate.getTime();

          if (NewExpiredTime <= state.user.CardsUpdatedTime) {
            console.log('hello');
            settoshowtimer(true);
          }
        }

        CheckIfBoarding();
        console.log('after boarding');

        await firestore()
          .collection('Users')
          .doc(state.user.email)
          .get()
          .then(doc => {
            if (doc.data().Vibe_Data) {
              setTotalswipe(doc.data().Number_Of_Swips_Done);
              // setshowCards(true);
              // console.log('yoooi', showCards);
            }
          });
        console.log('noo');
        // const TotalSwipe = state.user.Number_Of_Swips_Done;
        const LastEmailSwipe = state.user.Last_Card_Email_Swiped;
        // const To_Show_Vibe_Screen = No_Of_Swipes.data().Vibe;
        // if (To_Show_Vibe_Screen) {
        //   return;
        // }
        console.log('what is total swipe', TotalSwipe);
        const passeduserdata = await firestore()
          .collection('Users')
          .doc(state.user.email)
          .collection('passeduser')
          .get()
          .then(snapshot =>
            snapshot.docs.map(
              data => data.data().id,
              setLoading(false),
              //  data=>   console.log('what is .dta.', typeof(data.data().id)),
            ),
          );
        // console.log('what is passed data', passeduserdata);

        const passeduserids =
          passeduserdata.length > 0 ? passeduserdata : ['test'];
        // console.log('what is passed user ids', passeduserids);
        {
          if (passeduserids.length >= 10) {
            passeduserids.splice(0, 3);
          }
        }
        // console.log('what is passed user after ids', passeduserids);
        // const data=["rgupta.success@gmail.com",'kunnugarg2@gmail.com','kohlibhavya18@gmail.com','19103098@mail.jiit.ac.in']
        if (TotalSwipe == 0) {
          console.log('heree at 0');
          let Intialquery = await firestore()
            .collection('Users')

            .where('email', 'not-in', [...passeduserids]);

          Intialquery.onSnapshot(snapshot => {
            // console.log('value of snap', snapshot.docs.length);
            setcards(
              snapshot.docs
                // .filter(doc => doc.id !== state.user.email)
                .map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                })),
            );
            setshowCards(true);
          });
        }

        if (TotalSwipe > 0 && continueshowingcard) {
          Afterquery = await firestore()
            .collection('Users')
            .orderBy('email')
            .where('email', 'not-in', [...passeduserids])
            .startAfter(LastEmailSwipe)
            .onSnapshot(snapshot => {
              setcards(
                snapshot.docs.map(doc => ({
                  // console.log(doc.id,'doc id is')
                  // console.log('doc new data is', doc.data());
                  id: doc.id,
                  ...doc.data(),
                })),
              );
              setshowCards(true);
            });
        }
      };

      FetchUsersCard();
      return Afterquery;
    }, []);

    //IF USER HAS VALID PREMIUM FOR VIBE
    useEffect(() => {
      const handleAllCardSwiped = async () => {
        if (hasPremiumOfVibe === true) {
          setcontinueshowingcard(true);
          setAllswiped(false);
          setcardindex(0);
          settoshowtimer(false);
          await firestore()
            .collection('Users')
            .doc(state.user.email)
            .update({AllCardsSwiped: false, Number_Of_Swips_Done: 0});
        }
      };

      handleAllCardSwiped();
    }, [hasPremiumOfVibe]);

    useEffect(() => {
      console.log('card ind q', cardindex);

      if (cardindex >= 5) {
        if (hasPremiumOfVibe === true) {
          return;
        }
        setcontinueshowingcard(false);
        console.log('card ind inside', cardindex);
        var DeletePassedUserReference = firestore()
          .collection('Users')
          .doc(state.user.email)
          .collection('passeduser');
        DeletePassedUserReference.get().then(querysnapshot => {
          Promise.all(querysnapshot.docs.map(d => d.ref.delete()));
        });

        setAllswiped(true);

        const ExpiredDate = new Date();
        console.log(ExpiredDate);
        console.log(ExpiredDate.getTime());
        const ExpiredTime = ExpiredDate.getTime();
        const UpdatedTime = ExpiredTime + 86400000;
        const SetFirebaseswipedData = async () => {
          await firestore().collection('Users').doc(state.user.email).update({
            CardsExpiredTime: ExpiredTime,
            CardsUpdatedTime: UpdatedTime,
            AllCardsSwiped: true,
          });
        };

        SetFirebaseswipedData();
        settoshowtimer(true);
        // It is 24 hrrs in milli second 86400000;86397500;
        const ToChecKAfter = 12000;
        console.log('updated time', UpdatedTime);

        // setTimeout(async () => {
        //   const UpdateDate = new Date();
        //   const NewUpdatedTime = UpdateDate.getTime();
        //   console.log('New update time', NewUpdatedTime);
        //   if (UpdatedTime > NewUpdatedTime) {
        //     console.log(' called here', UpdatedTime);

        //     await firestore().collection('Users').doc(state.user.email).update({
        //       Swipes_Finished: false,
        //     });
        //     setMore(true);
        //   }
        // }, ToChecKAfter);
      }
    }, [cardindex]);
    console.log('card index changing', loading);
    // console.log(showCards);/
    // console.log(cards);
    return (
      <>
        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          <>
            {cards.length !== 0 ? (
              <View style={styles.container}>
                <Text style={{color: 'white'}}>HELOO</Text>
                <Swiper
                  cards={cards}
                  renderCard={item => {
                    console.log('What is item dddd', item);

                    if (item && cards) {
                      return (
                        <View style={[styles.card]}>
                          <ScrollView
                            scrollEnabled={true}
                            style={{flexGrow: 1}}>
                            <View style={{flex: 1}}>
                              <View style={{alignSelf: 'center'}}>
                                {item.image ? (
                                  <Image
                                    style={{
                                      width: 160,
                                      alignSelf: 'center',
                                      height: 160,
                                      borderRadius: 100,
                                    }}
                                    source={{
                                      uri: item.image,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    style={{
                                      width: 160,
                                      alignSelf: 'center',
                                      height: 160,
                                      borderRadius: 100,
                                    }}
                                    source={{
                                      uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
                                    }}
                                  />
                                )}
                              </View>

                              <View style={{display: 'flex'}}>
                                <View
                                  style={{marginHorizontal: 10, marginTop: 10}}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontSize: 22,
                                      fontFamily: 'poppins',
                                      fontWeight: 'bold',
                                    }}>
                                    {item?.name}
                                  </Text>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontSize: 14,
                                      fontWeight: '400',
                                    }}>
                                    {item?.designation ||
                                      demoData[0].designation}
                                  </Text>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontSize: 14,
                                      fontWeight: '400',
                                    }}>
                                    {item?.city || demoData[0].city}
                                    {' ,'}
                                    {item?.country || demoData[0].country}
                                  </Text>
                                </View>

                                <View style={{marginTop: 25}}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontSize: 14,
                                      fontWeight: 'bold',
                                      marginTop: 10,
                                      marginHorizontal: 10,
                                    }}>
                                    {item?.quote || demoData[0].quote}
                                  </Text>
                                </View>
                              </View>

                              <View style={{flex: 1}}>
                                <View>
                                  <View>
                                    <Text
                                      style={{
                                        color: '#0077B7',
                                        fontFamily: 'Poppins',
                                        fontSize: 18,
                                        marginTop: 6,
                                        fontWeight: '700',
                                        marginLeft: 15,
                                      }}>
                                      What I am here for
                                    </Text>
                                    <View
                                      style={{
                                        marginTop: 8,
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                        flexWrap: 'wrap',
                                      }}>
                                      {item?.Vibe_Data
                                        ? item?.Vibe_Data?.Here_for?.map(
                                            item => {
                                              console.log(item);
                                              return (
                                                <View
                                                  style={{
                                                    boxShadow:
                                                      '4px -5px 5px 0px #00000040 inset',

                                                    alignItems: 'center',
                                                    justifyContent: 'center',

                                                    borderRadius: 100 / 2,
                                                    borderWidth: 3,
                                                    borderColor: 'white',
                                                    backgroundColor: '#0077B7',
                                                  }}>
                                                  <Text
                                                    style={{
                                                      color: 'white',
                                                      textAlign: 'center',
                                                      fontFamily: 'Poppins',
                                                      fontSize: 13,
                                                      fontWeight: '500',
                                                    }}>
                                                    {item}
                                                  </Text>
                                                </View>
                                              );
                                            },
                                          )
                                        : checkingdata?.Here_for?.map(item => {
                                            console.log(item);
                                            return (
                                              <View
                                                style={{
                                                  boxShadow:
                                                    '4px -5px 5px 0px #00000040 inset',
                                                  // width:
                                                  //   Dimensions.get('window').width /
                                                  //   4.3,
                                                  // height:
                                                  //   Dimensions.get('window')
                                                  //     .height / 7.5,
                                                  alignItems: 'center',
                                                  justifyContent: 'center',

                                                  // borderRadius: 100 / 2,
                                                  borderRadius:
                                                    Math.round(
                                                      Dimensions.get('window')
                                                        .width +
                                                        Dimensions.get('window')
                                                          .height,
                                                    ) / 2,
                                                  width:
                                                    Dimensions.get('window')
                                                      .width * 0.2,
                                                  height:
                                                    Dimensions.get('window')
                                                      .width * 0.2,
                                                  borderWidth: 3,
                                                  borderColor: 'white',
                                                  backgroundColor: '#0077B7',
                                                }}>
                                                <Text
                                                  style={{
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    fontFamily: 'Poppins',
                                                    fontSize: 13,
                                                    fontWeight: '500',
                                                  }}>
                                                  {item}
                                                </Text>
                                              </View>
                                            );
                                          })}
                                    </View>
                                  </View>
                                </View>
                                <View>
                                  {/* <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('ShowMoreVibe', item)
                                }
                              >
                                <Text style={{color: 'white'}}>
                                  Tap FOR MORE
                                </Text>
                              </TouchableOpacity> */}
                                </View>
                                {/* <View
                              style={{
                                marginTop: 3,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                              }}
                            >
                              {item?.Vibe_Data
                                ? item?.Vibe_Data?.How_To_Meet.map(item => {
                                    console.log(item);
                                    return (
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <Icon
                                          name="check-circle"
                                          color={AppColors.ActiveColor}
                                          size={20}
                                        />

                                        <Text
                                          style={{
                                            marginLeft: 4,
                                            color: 'white',
                                            fontFamily: 'Poppins',
                                            fontSize: 16,
                                            fontWeight: '400',
                                          }}
                                        >
                                          {item}
                                        </Text>
                                      </View>
                                    );
                                  })
                                : checkingdata?.How_To_Meet.map(item => {
                                    console.log(item);
                                    return (
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <Icon
                                          name="check-circle"
                                          color={AppColors.ActiveColor}
                                          size={20}
                                        />

                                        <Text
                                          style={{
                                            marginLeft: 4,
                                            color: 'white',
                                            fontFamily: 'Poppins',
                                            fontSize: 16,
                                            fontWeight: '400',
                                          }}
                                        >
                                          {item}
                                        </Text>
                                      </View>
                                    );
                                  })}
                            </View>
                            <View>
                              <Text
                                style={{
                                  color: '#0077B7',
                                  fontFamily: 'Poppins',
                                  fontSize: 18,
                                  fontWeight: '700',
                                  marginTop: 4,
                                  marginLeft: 15,
                                }}
                              >
                                About Me
                              </Text>
                            </View>

                            <View style={{flex: 1}}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <Icon
                                      name="check-circle"
                                      color={AppColors.ActiveColor}
                                      size={20}
                                    />
                                    <Text
                                      style={{
                                        color: '#8AB9FF',
                                        fontFamily: 'Poppins',
                                        fontSize: 16,

                                        marginLeft: 4,
                                        fontWeight: '500',
                                        marginTop: 4,
                                      }}
                                    >
                                      What am I looking for{' '}
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      color: '#FFFFFF',
                                      fontFamily: 'Inter',
                                      fontSize: 14,
                                      textAlign: 'center',
                                      fontWeight: '400',
                                      marginTop: 1,
                                    }}
                                  >
                                    Mentor ship {''} Get Inspired{' '}
                                  </Text>
                                </View>

                                <View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      alignSelf: 'flex-start',
                                      justifyContent: 'space-between',
                                    }}
                                  >
                                    <Icon
                                      name="check-circle"
                                      color={AppColors.ActiveColor}
                                      size={20}
                                    />
                                    <Text
                                      style={{
                                        color: '#8AB9FF',
                                        fontFamily: 'Poppins',
                                        fontSize: 16,
                                        fontWeight: '500',
                                        marginTop: 4,
                                        marginLeft: 4,
                                      }}
                                    >
                                      Past Experience
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      color: '#FFFFFF',
                                      fontFamily: 'Inter',
                                      fontSize: 14,
                                      textAlign: 'center',
                                      fontWeight: '400',
                                      marginTop: 1,
                                    }}
                                  >
                                    {checkingdata?.Previous_Designation}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',

                                      justifyContent: 'center',
                                    }}
                                  >
                                    <Icon
                                      name="check-circle"
                                      color={AppColors.ActiveColor}
                                      size={20}
                                    />
                                    <Text
                                      style={{
                                        color: '#8AB9FF',
                                        fontFamily: 'Poppins',
                                        fontSize: 16,

                                        marginLeft: 4,
                                        fontWeight: '500',
                                        marginTop: 4,
                                      }}
                                    >
                                      Previous Designation
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      color: '#FFFFFF',
                                      fontFamily: 'Inter',
                                      fontSize: 14,
                                      textAlign: 'center',
                                      fontWeight: '400',
                                      marginTop: 1,
                                    }}
                                  >
                                    {item?.Vibe_Data
                                      ? item?.Vibe_Data?.Previous_Org
                                      : checkingdata?.Previous_Org}
                                  </Text>
                                </View>

                                <View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <Icon
                                      name="check-circle"
                                      color={AppColors.ActiveColor}
                                      size={20}
                                    />
                                    <Text
                                      style={{
                                        color: '#8AB9FF',
                                        fontFamily: 'Poppins',
                                        fontSize: 16,
                                        fontWeight: '500',
                                        marginTop: 4,
                                        marginLeft: 4,
                                      }}
                                    >
                                      Prev. Experience
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      color: '#FFFFFF',
                                      fontFamily: 'Inter',
                                      fontSize: 14,
                                      textAlign: 'center',
                                      fontWeight: '400',
                                      marginTop: 1,
                                    }}
                                  >
                                    {item?.Vibe_Data
                                      ? item?.Vibe_Data?.Previous_org_Duration
                                      : checkingdata?.Previous_org_Duration}
                                  </Text>
                                </View>
                              </View>
                            </View> */}
                              </View>
                            </View>
                          </ScrollView>
                        </View>
                      );
                    }
                  }}
                  onSwiped={cardindex => {
                    HandleOnSwiped(cardindex);
                  }}
                  onSwipedLeft={() => swipeLeft(cardindex)}
                  onSwipedRight={() => swipeRight(cardindex)}
                  onSwipedAll={() => swipedAll()}
                  onTapCard={() => Tapanywhere(cardindex)}
                  cardIndex={cardindex}
                  overlayLabels={{
                    left: {
                      title: 'NOPE',
                      style: {
                        label: {
                          textAlign: 'right',
                          color: 'red',
                          transform: [{rotate: '25deg'}],
                        },
                      },
                    },

                    right: {
                      title: 'LIKE',

                      style: {
                        label: {
                          textAlign: 'left',
                          color: 'green',
                          transform: [{rotate: '-25deg'}],
                        },
                      },
                    },
                  }}
                  verticalSwipe={false}
                  showSecondCard={true}
                  backgroundColor={'#000C12'}
                  stackSize={2}></Swiper>
              </View>
            ) : (
              <>
                <View style={styles.loader}>
                  <ActivityIndicator size="large" color="#8AB9FF" />
                </View>
              </>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      {toshowtimer ? (
        <CountdownTimer
          toshowtimer={toshowtimer}
          settoshowtimer={settoshowtimer}
          finalSetVibePremium={setHasPremiumOfVibe}
        />
      ) : (
        <>
          <IndividualHeaderLayout style={{flex: 1}}>
            <CustomPopup
              modalVisible={prevDailog}
              setModalVisible={() => setPrevDailog(false)}>
              <View>
                <Text>Prev Data Show Here</Text>
              </View>
            </CustomPopup>
            <LikeTab />
            {/* <Vibes /> */}
            <FlatList
              data={totalScore}
              extraData={totalScore}
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}
              renderItem={({item, index}) => {
                return (
                  <View
                  
                    style={{
                      alignSelf: 'center',
                      width: Dimensions.get('window').width / 1.12,
                      height: Dimensions.get('window').height / 1.49,
                      marginVertical: 20,
                      borderTopRightRadius: 50,
                      borderTopLeftRadius: 50,
                      marginHorizontal: 20,
                      borderBottomLeftRadius: 45,
                      borderBottomRightRadius: 45,
                      padding: 2,
                      backgroundColor: '#0C0C0D',
                      borderWidth: 2,
                      borderColor: 'dodgerblue',
                    }}>
                      
                    <ScrollView scrollEnabled={true} style={{flexGrow: 1}}>
                      <View style={{flex: 1}}>
                        <View style={{alignSelf: 'center'}}>
                          {item.image ? (
                            <Image
                              style={{
                                width: 160,
                                alignSelf: 'center',
                                height: 160,
                                borderRadius: 100,
                              }}
                              source={{
                                uri: item.image,
                              }}
                            />
                          ) : (
                            <Image
                              style={{
                                width: 160,
                                alignSelf: 'center',
                                height: 160,
                                borderRadius: 100,
                              }}
                              source={{
                                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
                              }}
                            />
                          )}
                        </View>

                        <View style={{display: 'flex'}}>
                          <View style={{marginHorizontal: 10, marginTop: 10}}>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 22,
                                fontFamily: 'poppins',
                                fontWeight: 'bold',
                              }}>
                              {item?.title}
                            </Text>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 14,
                                fontWeight: '400',
                              }}>
                              {item.detial}
                            </Text>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 14,
                                fontWeight: '400',
                              }}>
                              {item.title}
                              {' ,'}
                              {item.detial}
                            </Text>
                          </View>

                          <View style={{marginTop: 25}}>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 14,
                                fontWeight: 'bold',
                                marginTop: 10,
                                marginHorizontal: 10,
                              }}>
                              {item.detial}
                            </Text>
                          </View>
                        </View>

                        <View style={{flex: 1}}>
                          <View>
                            <View>
                              <Text
                                style={{
                                  color: '#0077B7',
                                  fontFamily: 'Poppins',
                                  fontSize: 18,
                                  marginTop: 6,
                                  fontWeight: '700',
                                  marginLeft: 15,
                                }}>
                                What I am here for
                              </Text>
                              <View
                                style={{
                                  marginTop: 8,
                                  flexDirection: 'row',
                                  justifyContent: 'space-evenly',
                                  flexWrap: 'wrap',
                                }}>
                                <View
                                  style={{
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 100 / 2,
                                    borderWidth: 3,
                                    borderColor: 'white',
                                    backgroundColor: '#0077B7',
                                    height: 80,
                                    width: 80,
                                  }}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      textAlign: 'center',
                                      fontFamily: 'Poppins',
                                      fontSize: 13,
                                      fontWeight: '500',
                                    }}>
                                    FIND INVESTORS
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 100 / 2,
                                    borderWidth: 3,
                                    borderColor: 'white',
                                    backgroundColor: '#0077B7',
                                    height: 80,
                                    width: 80,
                                  }}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      textAlign: 'center',
                                      fontFamily: 'Poppins',
                                      fontSize: 13,
                                      fontWeight: '500',
                                    }}>
                                    FIND MENTORS
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 100 / 2,
                                    borderWidth: 3,
                                    borderColor: 'white',
                                    backgroundColor: '#0077B7',
                                    height: 80,
                                    width: 80,
                                  }}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      textAlign: 'center',
                                      fontFamily: 'Poppins',
                                      fontSize: 13,
                                      fontWeight: '500',
                                    }}>
                                    FIND EMPLYOYEE
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  flexDirection: 'row',
                                  marginTop: 10,
                                  backgroundColor: '#121416',
                                  flex: 1,
                                  width: 250,
                                  height: 55,
                                  borderRadius: 10,
                                }}>
                                <View style={{marginStart: 10,flex:1}}>
                                  <Image
                                    style={{
                                      height: 32,
                                      width: 32,
                                    }}
                                    source={require('../../../src/assets/images/nope.png')}
                                  />
                                  <Text style={{color: '#fff'}}>nope</Text>
                                </View>

                                <View style={{flex:1,marginRight:15}}>
                                  <TouchableOpacity 
                                  onPress={() => navigation.navigate('SuperLikeScreen')}
                                  >

                                <Image
                                    style={{
                                      height: 32,
                                      width: 32,
                                      marginStart: 10,
                                    }}
                                    source={require('../../../src/assets/images/superlike.png')}
                                  />
                                  <Text style={{color: '#fff'}}>superlike</Text>
                                  </TouchableOpacity>

                                </View>
                                <View style={{marginEnd: 10}}>
                                  <TouchableOpacity
                                  onPress={() => navigation.navigate('LikeMatchScreen')}
                                  >

                                <Image
                                    style={{
                                      height: 32,
                                      width: 32,
                                    }}
                                    source={require('../../../src/assets/images/liketic.png')}
                                  />
                                  <Text style={{color: '#fff',marginStart:5}}>like</Text>
                                  </TouchableOpacity>

                                </View>
                              </View>
                            </View>
                          </View>
                          <View></View>
                        </View>
                      </View>
                    </ScrollView>
                    <View style={{flex: 1}}>
                      <Modal transparent={true} visible={filter}>
                        <View style={styles.ModelBack}>
                          <View style={styles.modelViewOne}>
                            <View style={styles.modelViewTwo}>
                              <Entypo
                                onPress={filterModal}
                                name="cross"
                                size={30}
                                color="#ffffff"></Entypo>
                              <Text style={styles.modelText}>Filter</Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                marginTop: 5,
                              }}>
                              <Text
                                style={{
                                  color: '#ffffff',
                                  fontFamily: 'Poppins',
                                  fontSize: 16,
                                  width: '45%',
                                  textAlign: 'left',
                                  fontWeight: '700',
                                }}>
                                How Can We Meet
                              </Text>
                              <View style={{width: 150}}>
                                <MultiSelect
                                  items={meetdata}
                                  uniqueKey="id"
                                  onSelectedItemsChange={data =>
                                    onSelectedItemsChange3(data)
                                  }
                                  selectedItems={selected3}
                                  selectText="Pick Locations"
                                  searchInputPlaceholderText="Search"
                                  onChangeInput={text => console.log(text)}
                                  tagRemoveIconColor="#CCC"
                                  tagBorderColor="blue"
                                  tagTextColor="#CCC"
                                  selectedItemTextColor="#CCC"
                                  selectedItemIconColor="#CCC"
                                  itemTextColor="#000"
                                  displayKey="name"
                                  tagContainerStyle={{
                                    backgroundColor: 'blue',
                                    width: Dimensions.get('window').width / 2.7,
                                  }}
                                  searchInputStyle={{color: '#CCC'}}
                                  submitButtonColor="blue"
                                  submitButtonText="Submit"
                                />
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                marginTop: 5,
                              }}>
                              <Text
                                style={{
                                  color: '#ffffff',
                                  fontFamily: 'Poppins',
                                  fontSize: 16,
                                  width: '45%',
                                  textAlign: 'left',
                                  fontWeight: '700',
                                }}>
                                What I Am Hare For
                              </Text>
                              <View style={{width: 150}}>
                                <MultiSelect
                                  items={HareFor}
                                  uniqueKey="id"
                                  onSelectedItemsChange={data =>
                                    onSelectedItemsChange2(data)
                                  }
                                  selectedItems={selected2}
                                  selectText="Choice"
                                  searchInputPlaceholderText="Search"
                                  onChangeInput={text => console.log(text)}
                                  tagRemoveIconColor="#CCC"
                                  tagBorderColor="blue"
                                  tagTextColor="#CCC"
                                  selectedItemTextColor="#CCC"
                                  selectedItemIconColor="#CCC"
                                  itemTextColor="#000"
                                  displayKey="name"
                                  tagContainerStyle={{
                                    backgroundColor: 'blue',
                                    width: Dimensions.get('window').width / 2.7,
                                  }}
                                  searchInputStyle={{color: '#CCC'}}
                                  submitButtonColor="blue"
                                  submitButtonText="Submit"
                                />
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                marginTop: 5,
                              }}>
                              <Text
                                style={{
                                  color: '#ffffff',
                                  fontFamily: 'Poppins',
                                  fontSize: 16,
                                  width: '45%',
                                  textAlign: 'left',
                                  fontWeight: '700',
                                }}>
                                Years of Experience
                              </Text>
                              <View style={{width: 150}}>
                                <MultiSelect
                                  items={yearsExperience}
                                  uniqueKey="id"
                                  onSelectedItemsChange={data =>
                                    onSelectedItemsChange1(data)
                                  }
                                  selectedItems={selected1}
                                  selectText="Choose"
                                  searchInputPlaceholderText="Search Items..."
                                  onChangeInput={text => console.log(text)}
                                  tagRemoveIconColor="#CCC"
                                  tagBorderColor="#CCC"
                                  tagTextColor="#CCC"
                                  selectedItemTextColor="#CCC"
                                  selectedItemIconColor="#CCC"
                                  itemTextColor="#000"
                                  displayKey="name"
                                  searchInputStyle={{color: '#CCC'}}
                                  single={true}
                                  submitButtonColor="#CCC"
                                  submitButtonText="Submit"
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </Modal>
                    </View>
                  </View>
                );
              }}
              // }
              keyExtractor={(item, index) => index.toString()}
            />
          </IndividualHeaderLayout>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000C12',
  },
  screen: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    backgroundColor: AppColors.primarycolor,
  },
  card: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 125,
    width: Dimensions.get('window').width / 1.12,
    height: Dimensions.get('window').height / 1.49,
    // flex:1,
    marginHorizontal: 35,
    marginVertical: 20,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,

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
  loader: {
    width: '100%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelViewOne: {
    backgroundColor: '#0C0C0D',
    borderRadius: 15,
    marginHorizontal: 20,
    height: '80%',
    marginTop: 60,
    borderColor: '#0C0C0D',
    borderWidth: 1,
  },
  modelViewTwo: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    alignSelf: 'center',
  },
  modelText: {
    color: '#ffffff',
    fontSize: 18,
    marginEnd: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  ModelBack: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});

export {Vibe};
