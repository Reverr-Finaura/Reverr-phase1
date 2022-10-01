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
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';

// import { useNavigation } from '@react-navigation/native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
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
import {cardData} from '../../dumy-Data/defaultHomeCardData';
import {VibeBoarding} from '../../Components/VibeBoarding';
const Vibe = () => {
  const [continueshowingcard, setcontinueshowingcard] = useState(true);
  const [prevDailog, setPrevDailog] = useState(false);
  const [allswiped, setAllswiped] = useState(false);
  const [showboarding, setshowboarding] = useState(false);
  const [more, setMore] = useState(false);
  const [LoadingScreen, setLoadingScreen] = useState(false);
  const Card_FireBase_Update = useRef(0);
  const LoadMoreVibeCard = () => {
    setMore(false);
    setcontinueshowingcard(true);
    setTimeout(() => {
      setAllswiped(false);
    }, 1500);
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
          {more ? (
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                bottom: -45,
                alignItems: 'center',
              }}
              onPress={() => LoadMoreVibeCard()}
            >
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={{
                    color: '#0077B7',
                    fontFamily: 'Poppins',
                    fontSize: 18,
                    fontWeight: '700',
                    marginTop: 6,
                    textAlign: 'center',
                  }}
                >
                  More Card
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Text>Wait 24 hrs...</Text>
          )}
        </View>
      </View>
    );
  };

  const Vibes = () => {
    const navigation = useNavigation();
    const state = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();

    const [moreInfo, setMoreInfo] = useState(-1);
    const [bool, setBool] = useState(false);
    const [cardindex, setcardindex] = useState(0);
    const [swipe, setswipe] = useState(1);
    const [loading, setLoading] = useState(true);
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
    // const swipeLeft = async cardData => {
    //   // var currCard = cards[idx];
    //   dispatch(RemoveTopCard());

    //   let CardEmail = cardData.email;

    //   if (CardEmail) {
    //     console.log('passed email is', CardEmail);
    //     await firestore()
    //       .collection('Users')
    //       .doc(state.user.email)
    //       .update({
    //         Passed_Email: firestore.FieldValue.arrayUnion(CardEmail),
    //       });
    //   }

    //   // var docRef = firestore().collection('Users').doc(state.user.email);

    //   // docRef
    //   //   .get()
    //   //   .then(doc => {
    //   //     if (doc.exists) {
    //   //       console.log('Document data:', doc.data().Passed_Email);
    //   //       const Passed_User_array = doc.data().Passed_Email;
    //   //       console.log(Passed_User_array);
    //   //     } else {
    //   //       // doc.data() will be undefined in this case
    //   //       console.log('No such document!');
    //   //     }
    //   //   })
    //   //   .catch(error => {
    //   //     console.log('Error getting document:', error);
    //   //   });
    // };

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

    const swipeRight = async data => {
      // var currCard = cards[idx];
      console.log('what is data', data);
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
            firestore()
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
    const swipedAll = () => {
      console.log('swiped all');
      setAllswiped(true);
    };

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
            console.log('No such document!');
            setshowboarding(true);
          }
        })
        .catch(error => {
          console.log('Error getting document:', error);
        });
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

    //   // var docRef = firestore().collection('Users').doc(state.user.email);
    //   // firestore()
    //   //   .collection('Users')
    //   //   .doc(state.user.email)
    //   //   .get()
    //   //   .then(doc => {
    //   //     if (doc.data().Vibe_Data) {
    //   //       console.log('Document vibe data:', doc.data().Vibe_Data);
    //   //       console.log('yoooi');
    //   //     } else {
    //   //       // doc.data() will be undefined in this case
    //   //       console.log('No such document!');
    //   //       setshowboarding(true);
    //   //     }
    //   //   });
    //   //  docRef
    //   //   .get()
    //   //   .then(doc => {
    //   //     if (doc.exists) {
    //   //       if (doc.data().Vibe_Data) {
    //   //         console.log('Document vibe data:', doc.data().Vibe_Data);
    //   //         console.log('yoooi');
    //   //       }
    //   //     }

    //   //     else {
    //   //       // doc.data() will be undefined in this case
    //   //       console.log('No such document!');
    //   //       setshowboarding(true);
    //   //     }
    //   //   })
    //   //   .catch(error => {
    //   //     console.log('Error getting document:', error);
    //   //   });
    //   // console.log('loadingCard intially');
    //   CheckIfBoarding()
    //   if (state.vibe.length == 0 || cardindex == 0) {
    //     dispatch(
    //       Load_Card(
    //         undefined,
    //         state.user.email,
    //         state.user.no_of_swipe,
    //         state.passed_userArray,
    //         state.Matched_userArray,
    //       ),
    //     );

    //     setcards(state.vibe);

    //     // console.log('stae  vibe 0000 isss', state.vibe);
    //   }

    //   setLoading(false);
    // }, []);
    // useEffect(() => {
    //   if (state.vibe.length == 15) {
    //     setcards(state.vibe);
    //   } else {
    //     return;
    //   }
    // }, [state.vibe.length]);

    console.log('state card is', state.vibe.length);

    //   console.log('state vibe chaning', state.vibe.length);
    //   if (state.vibe.length === 1) {
    //     setAllswiped(true);

    //     const ExpiredDate = new Date();
    //     console.log(ExpiredDate);
    //     console.log(ExpiredDate.getTime());
    //     const ExpiredTime = ExpiredDate.getTime();
    //     const UpdatedTime = ExpiredTime + 15000;
    //     // It is 24 hrrs in milli second 86400000;86397500;
    //     const ToChecKAfter = 12000;
    //     console.log('updated time', UpdatedTime);

    //     setTimeout(() => {
    //       const UpdateDate = new Date();
    //       const NewUpdatedTime = UpdateDate.getTime();
    //       console.log('New update time', NewUpdatedTime);
    //       if (UpdatedTime > NewUpdatedTime) {
    //         console.log(' called here', UpdatedTime);
    //         setMore(true);
    //         setcards([]);
    //         dispatch(
    //           Load_Card(
    //             state.last_card,
    //             state.user.email,
    //             state.user.no_of_swipe,
    //             state.passed_userArray,
    //             state.Matched_userArray,
    //           ),
    //         );

    //         console.log('State vibe coming from settimeout', cards);
    //         setcards(state.vibe);
    //       } else {
    //         console.log('I am not here');
    //       }
    //     }, ToChecKAfter);
    //   }
    // }, [state.vibe]);
    // Intial setting  here
    useEffect(() => {
      CheckIfBoarding();
      const FetchUsersCard = async () => {
        let unsubscribe;

        const No_Of_Swipes = await firestore()
          .collection('Users')
          .doc(state.user.email)
          .get();

        const TotalSwipe = No_Of_Swipes.data().Number_Of_Swips_Done;
        const LastEmailSwipe = No_Of_Swipes.data().Last_Card_Email_Swiped;

        setswipe(TotalSwipe);

        const passeduserdata = await firestore()
          .collection('Users')
          .doc(state.user.email)
          .collection('passeduser')
          .get()
          .then(snapshot =>
            snapshot.docs.map(
              data => data.data().id,
              //  data=>   console.log('what is .dta.', typeof(data.data().id)),
            ),
          );
        console.log('what is passed data', passeduserdata);

        const passeduserids =
          passeduserdata.length > 0 ? passeduserdata : ['test'];
        console.log('what is passed user ids', passeduserids);
        {
          if (passeduserids.length >= 10) {
            passeduserids.splice(0, 3);
          }
        }
        console.log('what is passed user after ids', passeduserids);
        // const data=["rgupta.success@gmail.com",'kunnugarg2@gmail.com','kohlibhavya18@gmail.com','19103098@mail.jiit.ac.in']
        if (TotalSwipe == 0) {
          let Intialquery = await firestore()
            .collection('Users')
            .where('email', 'not-in', [...passeduserids]);

          Intialquery.onSnapshot(snapshot => {
            console.log('value of snap', snapshot.docs.length);
            setcards(
              snapshot.docs
                .filter(doc => doc.id !== state.user.email)
                .map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                })),
            );
          });
        } else if (TotalSwipe > 0 && continueshowingcard) {
          let Afterquery = await firestore()
            .collection('Users')
            .orderBy('email')
            .where('email', 'not-in', [...passeduserids])
            .startAfter(LastEmailSwipe);

          Afterquery.onSnapshot(snapshot => {
            console.log('value of snap', snapshot.docs.length);
            setcards(
              snapshot.docs
                .filter(doc => doc.id !== state.user.email)
                .map(doc => ({
                  // console.log(doc.id,'doc id is')
                  // console.log('doc new data is', doc.data());
                  id: doc.id,
                  ...doc.data(),
                })),
            );
          });
        }

        // let Intialquery = await firestore()
        //   .collection('Users')
        //   .where('email', 'not-in', ['jatin.khurana1704@gmail.com']);

        // Intialquery.onSnapshot(snapshot => {
        //   console.log('value of snap', snapshot.docs.length);
        //   setcards(
        //     snapshot.docs
        //       .filter(doc => doc.id !== state.user.email)
        //       .map(doc => ({
        //         // console.log(doc.id,'doc id is')
        //         // console.log('doc new data is', doc.data());
        //         id: doc.id,
        //         ...doc.data(),
        //       })),
        //   );
        // });
      };
      FetchUsersCard();
    }, []);

    useEffect(() => {
      console.log('card ind q', cardindex);

      if (cardindex == 5) {
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
        // It is 24 hrrs in milli second 86400000;86397500;
        const ToChecKAfter = 86397500;
        console.log('updated time', UpdatedTime);

        setTimeout(() => {
          const UpdateDate = new Date();
          const NewUpdatedTime = UpdateDate.getTime();
          console.log('New update time', NewUpdatedTime);
          if (UpdatedTime > NewUpdatedTime) {
            console.log(' called here', UpdatedTime);
            setMore(true);
          }
        }, ToChecKAfter);
      }
    }, [cardindex]);
    console.log('card index changing', cardindex);
    // useEffect(() => {
    //   if (cardindex == 10) {
    //     const FetchCardsAfter = async () => {
    //       setLoadingScreen(false);
    //       setcards([]);
    //       // await firestore()
    //       //   .collection('Users')
    //       //   .doc(state.user.email)
    //       //   .collection('passeduser')
    //       //   .delete();
    //       // ids passesd
    //       // console.log('after last',LastVisible.data())
    //       let Intialquery = await firestore()
    //         .collection('Users')
    //         .where('email', 'not-in', ['jatin.khurana1704@gmail.com'])
    //         .orderBy('email')

    //         .limit(10);

    //       Intialquery.onSnapshot(snapshot => {
    //         console.log('value of snap', snapshot.docs.length);
    //         setcards(
    //           snapshot.docs
    //             .filter(doc => doc.id !== state.user.email)
    //             .map(doc => ({
    //               // console.log(doc.id,'doc id is')
    //               // console.log('doc new data is', doc.data());
    //               id: doc.id,
    //               ...doc.data(),
    //             })),
    //         );
    //       });
    //       setTimeout(() => {
    //         setLoadingScreen(false);
    //       }, 1500);
    //     };

    //     FetchCardsAfter();
    //   }
    // }, [cardindex]);

    // useEffect(() => {
    //   console.log('after', cardindex);

    //   if (cardindex === 10) {
    //     console.log('inside');
    //     let unsubscribeafter;
    //     ardAfter = async () => {
    //       const passeduserdataafter = await firestore()
    //         .collection('Users')
    //         .doc(state.user.email)
    //         .collection('passeduser')
    //         .get()
    //         .then(snapshot =>
    //           snapshot.docs.map(data =>data.data().id
    //             // console.log('what is .dta. after', data.data()),
    //           ),
    //         );
    //       console.log('what is passed data after', passeduserdataafter);
    //       const passeduseridsafter =
    //         passeduserdataafter.length > 0 ? passeduserdataafter : ['test'];
    //       console.log('what is passed user ids after', passeduseridsafter);
    //       unsubscribeafter = firestore()
    //         .collection('Users')
    //         .orderBy('email')
    //         .where('email', 'not-in', ['prasagatre260@gmail.com'])
    //         .limit(10)
    //         .onSnapshot(snapshot => {
    //           console.log('value of snap after', snapshot.docs.length);
    //           setcards(
    //             snapshot.docs
    //               .filter(doc => doc.id !== state.user.email)
    //               .map(doc => (

    //                 {
    //           // console.log('doc new data is', doc.data())
    //                 id: doc.id,
    //                 ...doc.data(),
    //                } )),
    //           );
    //         });
    //     };
    //     FetchUsersCardAfter();

    //   }
    // }, [cardindex]);
    // console.log('cards after', cards);

    // useEffect(
    //   (() => {
    //     console.log('after', cardindex);

    //     if (cardindex === 10) {
    //       console.log('inside');
    //       let unsubscribeafter;
    //       ardAfter = async () => {
    //         const passeduserdataafter = await firestore()
    //           .collection('Users')
    //           .doc(state.user.email)
    //           .collection('passeduser')
    //           .get()
    //           .then(snapshot =>
    //             snapshot.docs.map(
    //               data => data.data().id,
    //               // console.log('what is .dta. after', data.data()),
    //             ),
    //           );
    //         console.log('what is passed data after', passeduserdataafter);
    //         const passeduseridsafter =
    //           passeduserdataafter.length > 0 ? passeduserdataafter : ['test'];
    //         console.log('what is passed user ids after', passeduseridsafter);
    //         unsubscribeafter = firestore()
    //           .collection('Users')
    //           .orderBy('email')
    //           .where('email', 'not-in', ['prasagatre260@gmail.com'])
    //           .limit(10)
    //           .onSnapshot(snapshot => {
    //             console.log('value of snap after', snapshot.docs.length);
    //             setcards(
    //               snapshot.docs
    //                 .filter(doc => doc.id !== state.user.email)
    //                 .map(doc => ({
    //                   // console.log('doc new data is', doc.data())
    //                   id: doc.id,
    //                   ...doc.data(),
    //                 })),
    //             );
    //           });
    //       };
    //       FetchUsersCardAfter();
    //     }
    //   })[cardindex],
    // );
    // useEffect(() => {
    // useEffect(() => {
    return (
      <>
        {true ? (
          <View style={styles.container}>
            {allswiped ? (
              <View>
                <PremiumTab />
              </View>
            ) : (
              <Swiper
                cards={cards}
                renderCard={item => {
                  console.log('What is item dddd', item);
                  if (item && cards) {
                    return (
                      <View style={[styles.card]}>
                        <ScrollView scrollEnabled={true} style={{flexGrow: 1}}>
                          <View style={{flex: 1}}>
                            <View style={{alignSelf: 'center'}}>
                              <Image
                                style={{
                                  width: 160,
                                  alignSelf: 'center',
                                  height: 160,
                                  borderRadius: 100,
                                }}
                                source={{
                                  uri:
                                    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
                                }}
                              />
                            </View>

                            <View style={{display: 'flex'}}>
                              <View
                                style={{marginHorizontal: 10, marginTop: 10}}
                              >
                                <Text
                                  style={{
                                    color: 'white',
                                    fontSize: 22,
                                    fontFamily: 'poppins',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {item?.name}
                                </Text>
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontWeight: '400',
                                  }}
                                >
                                  {item?.designation || demoData[0].designation}
                                </Text>
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontWeight: '400',
                                  }}
                                >
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
                                  }}
                                >
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
                                    }}
                                  >
                                    What I am here for
                                  </Text>
                                  <View
                                    style={{
                                      marginTop: 8,
                                      flexDirection: 'row',
                                      justifyContent: 'space-evenly',
                                      flexWrap: 'wrap',
                                    }}
                                  >
                                    <View
                                      style={{
                                        boxShadow:
                                          '4px -5px 5px 0px #00000040 inset',
                                        width:
                                          Dimensions.get('window').width / 4.5,
                                        height:
                                          Dimensions.get('window').height / 7.5,
                                        alignItems: 'center',
                                        justifyContent: 'center',

                                        borderRadius: 91 / 2,
                                        borderWidth: 3,
                                        borderColor: 'white',
                                        backgroundColor: '#0077B7',
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: 'white',
                                          textAlign: 'center',
                                          fontFamily: 'Poppins',
                                          fontSize: 16,
                                          fontWeight: '500',
                                        }}
                                      >
                                        {item?.Here_for?.[0]} {'Find Investors'}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        boxShadow:
                                          '4px -5px 5px 0px #00000040 inset',
                                        width:
                                          Dimensions.get('window').width / 4.5,
                                        height:
                                          Dimensions.get('window').height / 7.5,
                                        alignItems: 'center',
                                        justifyContent: 'center',

                                        borderRadius: 91 / 2,
                                        borderWidth: 3,
                                        borderColor: 'white',
                                        backgroundColor: '#0077B7',
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: 'white',
                                          textAlign: 'center',
                                          fontFamily: 'Poppins',
                                          fontSize: 16,
                                          fontWeight: '500',
                                        }}
                                      >
                                        {item?.Here_for?.[1]} {'Hire Employees'}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        boxShadow:
                                          '4px -5px 5px 0px #00000040 inset',
                                        width:
                                          Dimensions.get('window').width / 4.5,
                                        height:
                                          Dimensions.get('window').height / 7.5,
                                        alignItems: 'center',
                                        justifyContent: 'center',

                                        borderRadius: 91 / 2,
                                        borderWidth: 3,
                                        borderColor: 'white',
                                        backgroundColor: '#0077B7',
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: 'white',
                                          textAlign: 'center',
                                          fontFamily: 'Poppins',
                                          fontSize: 16,
                                          fontWeight: '500',
                                        }}
                                      >
                                        {item?.Here_for?.[1]} {'Find Mentors'}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    color: '#0077B7',
                                    fontFamily: 'Poppins',
                                    fontSize: 18,
                                    fontWeight: '700',
                                    marginTop: 6,
                                    marginLeft: 15,
                                  }}
                                >
                                  How can we meet
                                </Text>
                              </View>
                              <View
                                style={{
                                  marginTop: 3,
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',
                                }}
                              >
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
                                    {item?.How_To_Meet?.[0]} {'At Coffe'}
                                  </Text>
                                </View>
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
                                    {item?.How_To_Meet?.[1]} {' At Local Cafe'}
                                  </Text>
                                </View>
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
                                    {item?.How_To_Meet?.[2]} {' Video Call'}
                                  </Text>
                                </View>
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
                                      {item?.Prev_org} {' AMAZON'}
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
                                      {item?.Previous_Designation} {'SDE'}
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
                                      {item?.Previous_org_Duration?.[0]} {' 3 '}
                                    </Text>
                                  </View>
                                </View>
                              </View>
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
                onSwipedRight={() => swipeRight(state?.vibe[0])}
                onSwipedAll={() => swipedAll()}
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
                stackSize={2}
              ></Swiper>
            )}
          </View>
        ) : (
          <>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Loading Cards Please wait
            </Text>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {showboarding ? (
        <VibeBoarding
          showboarding={showboarding}
          setshowboarding={setshowboarding}
        />
      ) : (
        <>
          <IndividualHeaderLayout style={{flex: 1}}>
            <CustomPopup
              modalVisible={prevDailog}
              setModalVisible={() => setPrevDailog(false)}
            >
              <View>
                <Text>Prev Data Show Here</Text>
              </View>
            </CustomPopup>

            <Vibes />
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
    bottom: 75,
    width: Dimensions.get('window').width / 1.12,
    height: Dimensions.get('window').height / 1.29,
    marginHorizontal: 35,
    marginVertical: 20,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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
