
import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  View,

  Text,
  Image,
  Animated,
  PanResponder,
  ActivityIndicator,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Button from '../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MultiSelect from 'react-native-multiple-select';
import styles from './styles';
// import { useNavigation } from '@react-navigation/native';
// import {FlatList, ScrollView} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { CustomPopup, IndividualHeaderLayout } from '../../Components';
import { Choice } from '../../Components';
import { AppColors } from '../../utils';
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
import { cardData } from '../../dumy-Data/defaultHomeCardData';
import { VibeBoarding } from '../../Components/VibeBoarding';
import CountDown from 'react-native-countdown-component';
import { firebase } from '@react-native-firebase/database';
import { CountdownTimer } from '../CountdownTimer';
import { useLayoutEffect } from 'react';
import { blue } from 'react-native-redash';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
const data = [
  { id: 1, name: 'John', hareFor: 'Find Investors', howMeet: 'At Coffee', yearsExperience: 1 },
  { id: 2, name: 'Jane', hareFor: 'Networking', howMeet: 'Video Call', yearsExperience: 1 },
  { id: 3, name: 'Jack', hareFor: 'Hire Employees', howMeet: 'Local Cafe', yearsExperience: 1 },
  { id: 4, name: 'Jill', hareFor: 'Find Mentor', howMeet: 'Video Call', yearsExperience: 1 },
  { id: 5, name: 'T', hareFor: 'Find Cofounders', howMeet: 'At Coffee', yearsExperience: 1 },

];
const Vibe = () => {
  const state = useSelector(state => state.UserReducer);
  //  console.log("",JSON.stringify (state.Rooms,2,4))

  //  console.log(">>>",state.Rooms[7].postedby)

  // state.Rooms.map((room,i) => {
  //   if(room?.postedby?.Vibe_Data !=undefined){
  //     console.log(i,'=======================>', room?.postedby?.Vibe_Data);

  //   }else{
  //     console.log(i,'===========UNDEFINED============>', room?.postedby?.Vibe_Data);

  //   }
  // });






  const [continueshowingcard, setcontinueshowingcard] = useState(true);
  const [prevDailog, setPrevDailog] = useState(false);
  const [allswiped, setAllswiped] = useState(false);
  const [toshowtimer, settoshowtimer] = useState(false);
  const [TotalSwipe, setTotalswipe] = useState(0);
  const [showCards, setshowCards] = useState(false);
  const [hasPremiumOfVibe, setHasPremiumOfVibe] = useState(false);
  // console.log('hasPremiumm', hasPremiumOfVibe);
  const [selected1, setselected1] = useState([]);

  // const [filter, setFilter] = useState(false);
  // console.log("🚀 ~ file: index.js:135 ~ Vibe ~ filter:", filter)



  const filterModal = () => {
    setFilter(v => !v);
  };
  const navigation = useNavigation();

  // const isFocused = useIsFocused();

  const LikeTab = () => {
    return (
      <View
        style={styles.viewLike}>
        <TouchableOpacity onPress={() => navigation.navigate('LikeScreen')}>
          <View
            style={styles.viewLike1}>

            <Text
              style={styles.likeText}>
              likes
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingRight: 35 }}>
          <TouchableOpacity onPress={() => setFilter(true)}>
            <Icon name="filter" color="#ffffff" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const Vibes = () => {
    const { params } = useRoute();
    const data = 'abc';
    // console.log('data paraams ', params);
    const [filter, setFilter] = useState(false);

    const [visible, setVisible] = useState(false);

    const toggleData = () => {
      setVisible(!visible);
    };

    const navigation = useNavigation();
    const state = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();

    const [moreInfo, setMoreInfo] = useState(-1);
    const [bool, setBool] = useState(false);
    const [cardindex, setcardindex] = useState(0);
    const [count, setCount] = useState(0);

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

    const [filters, setFilters] = useState({
      hareFor: [],
      yearsExperience: [],
      howMeet: [],
    });
    const ageOptions = [
      { id: '< 1', name: '< 1', },
      { id: '1-2', name: '1-2', },
      { id: '2-5', name: '2-5', },
      { id: '5>', name: '5>', },
    ];

    const hareFor = [
      { id: 'Find Investors', name: 'Find Investors' },
      { id: 'Networking', name: 'Networking' },
      { id: 'Hire Employees', name: 'Hire Employees' },
      { id: 'Find Mentor', name: 'Find Mentor' },
      { id: 'Find Cofounders', name: 'Find Cofounder' },
    ];
    const howMeet = [
      { id: 'At Coffee', name: 'At Coffee' },
      { id: 'Video Call', name: 'Video Call' },
      { id: 'Local Cafe', name: 'Local Cafe' },
    ];

    const [filteringData, setFilteringData] = useState([])
    // console.log("🚀 ~ file: index.js:2476 ~ Vibes ~ filteringData:",JSON.stringify (filteringData))





    const filterData = () => {
      if (filters.hareFor.length > 0 || filters.howMeet.length > 0 || filters.yearsExperience.length > 0) {
        let res = cards.filter((val) => {
          if (val?.Vibe_Data?.Here_for != undefined) {
            return filters.hareFor.every((hereFor) =>
              val.Vibe_Data.Here_for.includes(hereFor)
            );
          }
        });

        let res1 = res.filter((val) => {
          if (val.Vibe_Data?.How_To_Meet != undefined) {
            return filters.howMeet.every((meeting) =>
              val.Vibe_Data.How_To_Meet.includes(meeting)
            );
          }
        });

        let res2 = res1.filter((val) => {
          if (val?.Vibe_Data?.Years_Of_Experience != undefined) {
            return filters.yearsExperience.every((yearExp) =>
              val.Vibe_Data.Years_Of_Experience.includes(yearExp)
            );
          }
        });


        setFilteringData(res2)
        setFilter(false)
        // alert("Inner")

      } else {
        setFilteringData(cards)
        setFilter(false)
        // alert("Outer")

      }

    }

    const HandleShow = async () => {
      // console.log('at shoiww');
      // console.log(show);
      setshow(() => !show);
      setvertical(() => !vertical);
      // console.log('after', show);
    };

    const swipeLeft = async CurrentIndex => {

      setCount(count + 1)
      HandleOnSwiped(CurrentIndex)
      if (!cards[cardindex]) return;
      const LeftSwiped = cards[CurrentIndex];
      console.log("🚀 ~ file: index.js:2543 ~ swipeLeft ~ LeftSwiped:", LeftSwiped)
      // console.log('Left detail', LeftSwiped.id);
      firestore()
        .collection('Users')
        .doc(state.user.email)
        .collection('passeduser')
        .doc(LeftSwiped.id)
        .set(LeftSwiped);
    };

    const Tapanywhere = cardindex => {
      const data = cards[cardindex];
      // console.log('Tap anywhere', data);
      navigation.navigate('ShowMoreVibe', data);
    };

    const swipeRight = async CurrentIndex => {
      console.log("===>", CurrentIndex)

      setCount(count + 1)

      HandleOnSwiped(CurrentIndex)
      // var currCard = cards[idx];

      const data = cards[CurrentIndex];
      console.log('right datta', data);


      // dispatch(RemoveTopCard());
      // console.log('stae  vibe swipe right isss', state.vibe);
      // console.log('data is', data);

      var Liked_Email = data.id;
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
            // console.log('userswiped');
          })
          .catch(err => {
            console.log(err.message);
            console.log('please check your internet connection');
          });
      }
    };
    const superLikeCenter = async CurrentIndex => {
      console.log("===>", CurrentIndex)

      setCount(count + 1)

      HandleOnSwiped(CurrentIndex)
      // var currCard = cards[idx];

      const data = cards[CurrentIndex];
      console.log('right datta', data);


      // dispatch(RemoveTopCard());
      // console.log('stae  vibe swipe right isss', state.vibe);
      // console.log('data is', data);

      var Liked_Email = data.id;
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
            super_liked_people: firestore.FieldValue.arrayUnion(Liked_Email),
          })
          .then(async () => {
            await firestore()
              .collection('Users')
              .doc(Liked_Email)
              .update({
                super_people_liked_me: firestore.FieldValue.arrayUnion(
                  state.user.email,
                ),
              });
            // console.log('userswiped');
          })
          .catch(err => {
            console.log(err.message);
            console.log('please check your internet connection');
          });
      }
    };
    const [cards, setcards] = useState([]);
    // console.log('What is item dddd', cards);
    // alert(cards);

    const swipedAll = () => {
      console.log('swiped all');
      setAllswiped(true);
    };

    const HandleOnSwiped = async cardindex => {

      setcardindex(prev => prev + 1);
      setswipe(prev => prev + 1);

      const Data = cards[cardindex];
      // console.log('datattaa', Data);
      await firestore().collection('Users').doc(state.user.email).update({
        Number_Of_Swips_Done: swipe,
      });

      // await firestore()
      //   .collection('Users')
      //   .doc(state.user.email)
      //   .update({Last_Card_Email_Swiped: Data.id});
    };

    // console.log('state card is', state.vibe.length);
    // console.log('datta coming from boarding', data);
    const CheckIfBoarding = async () => {
      await firestore()
        .collection('Users')
        .doc(state.user.email)
        .get()
        .then(doc => {
          if (doc.data().Vibe_Data) {
            // console.log('Document vibe data:', doc.data().Vibe_Data);
            setshowCards(true);
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
      CheckIfBoarding();

      let Afterquery;
      const FetchUsersCard = async () => {
        if (state.user.AllCardsSwiped) {
          // console.log(state.user, 'what is this');
          const NewExpiredDate = new Date();
          // console.log(NewExpiredDate);
          // console.log('Expiredtime', NewExpiredDate.getTime());
          const NewExpiredTime = NewExpiredDate.getTime();

          if (NewExpiredTime <= state.user.CardsUpdatedTime) {
            console.log('hello');
            settoshowtimer(true);
          }
        }
        // CheckIfBoarding();
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
        // console.log('what is total swipe', TotalSwipe);
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
        // if (TotalSwipe == 0) {
        console.log('heree at 0');
        let Intialquery = await firestore()
          .collection('Users')

          .where('email', 'not-in', [...passeduserids]);

        Intialquery.get().then(snapshot => {

          // Intialquery.onSnapshot(snapshot => {
          // console.log('value of snap', snapshot.docs.length);
          setcards(
            snapshot.docs
              // .filter(doc => doc.id !== state.user.email)
              .map(doc => ({
                id: doc.id,
                ...doc.data(),
              })),
          );
          setFilteringData(snapshot.docs
            // .filter(doc => doc.id !== state.user.email)
            .map(doc => ({
              id: doc.id,
              ...doc.data(),
            })),)
          setshowCards(true);
        });
        // }

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
      if (showCards) {

        FetchUsersCard();
      }
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
            .update({ AllCardsSwiped: false, Number_Of_Swips_Done: 0 });
        }
      };

      handleAllCardSwiped();
    }, [hasPremiumOfVibe]);

    useEffect(() => {
      // console.log('card ind q', cardindex);

      if (cardindex >= 5) {
        if (hasPremiumOfVibe === true) {
          return;
        }
        setcontinueshowingcard(false);
        // console.log('card ind inside', cardindex);
        var DeletePassedUserReference = firestore()
          .collection('Users')
          .doc(state.user.email)
          .collection('passeduser');
        DeletePassedUserReference.get().then(querysnapshot => {
          Promise.all(querysnapshot.docs.map(d => d.ref.delete()));
        });

        setAllswiped(true);

        const ExpiredDate = new Date();
        // console.log(ExpiredDate);
        // console.log(ExpiredDate.getTime());
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
        // console.log('updated time', UpdatedTime);

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

        <View
          style={styles.viewLike}>
          <TouchableOpacity onPress={() => navigation.navigate('LikeScreen')}>
            <View
              style={styles.viewLike1}>
              <MaterialCommunityIcons name="heart-plus-outline" color="#ffffff" size={20} />
              <Text
                style={styles.likeText}>
                view likes
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ paddingRight: 20 }}>
            <TouchableOpacity onPress={() => setFilter(true)}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require('../../../src/assets/images/FadersHorizontal.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          <>
            {filteringData.length !== 0 ? (
              <View style={styles.container}>
                {/* <Text style={{color: 'white'}}>HELOO</Text> */}
                <FlatList
                  data={filteringData.filter(it => it.email != '')}
                  extraData={filteringData}
                  pagingEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
                  renderItem={({ item, index }) => {
                    const a = item.name == undefined ? "NA" : item.name
                    console.log("lllllllllll", item)
                    if (cardindex == index) {

                      return (
                        <ScrollView showsVerticalScrollIndicator={false}>
                          <View
                            style={styles.MainCard}>
                            <ScrollView scrollEnabled={true} style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                              <View style={{ flex: 1 }}>
                                <View style={{ alignSelf: 'center', marginTop: 10 }}>
                                  {item.image ? (
                                    <Image
                                      style={styles.coverImage}
                                      source={{
                                        uri: item.image,
                                      }}
                                    />
                                  ) : (
                                    <Image
                                      style={styles.coverImage}
                                      source={{
                                        uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
                                      }}
                                    />
                                  )}
                                </View>


                                <View
                                  style={styles.viewText}>
                                  <Text
                                    style={styles.txtName}>
                                    {item?.name}
                                  </Text>
                                  <Text
                                    style={styles.ceo}>
                                    {item.Vibe_Data == undefined ? "" : item?.Vibe_Data?.Education}
                                  </Text>
                                  <Text
                                    style={styles.Delhi}>
                                    New Delhi, India
                                  </Text>
                                </View>

                                <View>
                                  <Text
                                    style={styles.about}>
                                    About Me
                                  </Text>
                                  <Text
                                    style={styles.detial}
                                    numberOfLines={2}>
                                    Don’t ship it. Don’t settle for good enough. Do
                                    better work than you did yesterday. Get out of
                                    your comfort zone and give it your all – every
                                    day.
                                  </Text>
                                </View>
                                <View
                                  style={styles.likebar}>
                                  <View style={styles.nopeText}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        // navigation.navigate('LikeMatchScreen')
                                        // swipeLefts(index)
                                        // setIndex(indexs+1)
                                        swipeLeft(index)
                                      }
                                      }>
                                      <Image
                                        style={styles.nope}
                                        source={require('../../../src/assets/images/nope.png')}
                                      />
                                    </TouchableOpacity>
                                    <Text style={styles.textwhite}>nope</Text>
                                  </View>

                                  <View style={styles.superLike}>
                                    <TouchableOpacity
                                      onPress={() => { superLikeCenter(index) }
                                      }>
                                      <Image
                                        style={styles.nopes}
                                        source={require('../../../src/assets/images/superlike.png')}
                                      />
                                      <Text style={styles.textwhite}>superlike</Text>
                                    </TouchableOpacity>
                                  </View>
                                  <View style={{ marginEnd: 10 }}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        // navigation.navigate('LikeMatchScreen')
                                        // swipeLefts(index)
                                        swipeRight(index)
                                        // setIndex(indexs+1)
                                      }
                                      }>
                                      <Image
                                        style={styles.nope}
                                        source={require('../../../src/assets/images/liketic.png')}
                                      />
                                      <Text
                                        style={styles.textwhites}>
                                        like
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                                <TouchableOpacity onPress={() => setVisible(index)}>
                                  <Entypo
                                    style={styles.entypo}
                                    name={
                                      visible === index
                                        ? ''
                                        : 'chevron-small-down'
                                    }
                                    size={40}
                                    color="#ffffff"></Entypo>
                                </TouchableOpacity>

                                {visible === index && (
                                  <View style={{ flex: 1 }}>
                                    <View>
                                      <View>
                                        {
                                          item.Vibe_Data != undefined && (
                                            <>
                                              <Text
                                                style={styles.vibeText}>
                                                What I am here for
                                              </Text>
                                              <View
                                                style={styles.viewVibe}>
                                                {item.Vibe_Data != undefined && item?.Vibe_Data?.Here_for?.map(
                                                  Here_for => {
                                                    console.log(">>>>>>>>", Here_for);
                                                    return (
                                                      <TouchableOpacity
                                                        onPress={data =>
                                                          navigation.navigate(
                                                            'ShowMoreVibe',
                                                            {
                                                              data,
                                                            },
                                                          )
                                                        }>
                                                        <View
                                                          style={styles.circle}>
                                                          <Text
                                                            style={styles.hareFor}>

                                                            {Here_for}

                                                          </Text>
                                                        </View>
                                                      </TouchableOpacity>
                                                    );
                                                  },
                                                )}
                                              </View>
                                            </>
                                          )
                                        }
                                        {item.Vibe_Data != undefined && (
                                          <>
                                            <View>
                                              <Text
                                                style={
                                                  styles.vibeText
                                                }>
                                                Education:
                                              </Text>
                                              <Text
                                                style={styles.dataDatabase}>
                                                {item.Vibe_Data == undefined ? "N/A" : item?.Vibe_Data?.Education}
                                              </Text>


                                              <Text
                                                style={styles.vibeText}>
                                                Industry:
                                              </Text>


                                              <Text
                                                style={styles.dataDatabase}>
                                                {item.Vibe_Data == undefined ? "N/A" : item?.Vibe_Data?.Industry}
                                              </Text>

                                              <Text
                                                style={styles.vibeText}>
                                                Previous Designation:
                                              </Text>
                                              <Text
                                                style={styles.dataDatabase}>
                                                {
                                                  item.Vibe_Data == undefined ? "N/A" : item?.Vibe_Data
                                                    ?.Previous_Designation
                                                }
                                              </Text>
                                              <Text
                                                style={styles.vibeText}>
                                                Previous Organization:
                                              </Text>
                                              <Text
                                                style={styles.dataDatabase}>
                                                {item.Vibe_Data == undefined ? "N/A" : item?.Vibe_Data?.Previous_Org}
                                              </Text>
                                              <Text
                                                style={styles.vibeText}>
                                                How can we meet:
                                              </Text>
                                              {item.Vibe_Data == undefined && <Text
                                                style={styles.noData}>
                                                N/A
                                              </Text>}
                                              {item.Vibe_Data != undefined && item?.Vibe_Data?.How_To_Meet?.map(
                                                How_To_Meet => {
                                                  // console.log(item);
                                                  return (
                                                    <View>
                                                      <Text
                                                        style={styles.dataDatabase}>
                                                        {How_To_Meet}
                                                      </Text>
                                                    </View>
                                                  );
                                                },
                                              )}
                                              <Text
                                                style={styles.vibeText}>
                                                Experience:
                                              </Text>
                                              {item.Vibe_Data == undefined && <Text
                                                style={styles.noData}>
                                                N/A
                                              </Text>}
                                              {item.Vibe_Data != undefined && item?.Vibe_Data?.Years_Of_Experience?.map(
                                                Years_Of_Experience => {
                                                  // console.log(item);
                                                  return (
                                                    <View>
                                                      <Text
                                                        style={styles.dataDatabase}>
                                                        {Years_Of_Experience}
                                                      </Text>
                                                    </View>
                                                  );
                                                },
                                              )}
                                            </View>

                                          </>)}

                                      </View>
                                    </View>
                                  </View>
                                )}
                              </View>
                            </ScrollView>

                          </View>
                        </ScrollView>
                      );
                      // }
                    }
                  }
                  }
                  keyExtractor={(item, index) => index.toString()}
                />

              </View>
            ) : (
              <>
                <View style={styles.loader}>
                  <ActivityIndicator size="large" color="#8AB9FF" />
                </View>
              </>
            )}
            <Modal transparent={true} visible={filter}>
              <View style={styles.ModelBack}>
                <View style={styles.modelViewOne}>
                  <View style={styles.modelViewTwo}>
                    <Entypo
                      onPress={() => setFilter(false)}
                      name="cross"
                      size={25}
                      color="#000"></Entypo>
                    <Text style={styles.modelText}>Filter</Text>
                  </View>
                  <ScrollView>


                    <View style={{ padding: 20 }}>

                      <MultiSelect
                        items={hareFor}
                        uniqueKey="id"
                        displayKey="name"

                        onSelectedItemsChange={selectedItems =>
                          setFilters({
                            ...filters,
                            hareFor: selectedItems,
                          })
                        }
                        editable={false}
                        selectTextOnFocus={false}
                        selectedItems={filters.hareFor}
                        selectText="Hare For"
                        searchInputPlaceholderText="Search Hare For"
                        searchInputStyle={{ height: 50 }}
                        styleDropdownMenu={true}
                        styleDropdownMenuSubsection={true}
                        styleIndicator={true}

                        styleInputGroup={true}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        searchInputTextColor="#000"
                        hideDropdown={true}
                        hideTags={true}
                        hideSubmitButton={true}

                      />
                      <MultiSelect
                        items={ageOptions}
                        uniqueKey="id"
                        displayKey="name"

                        onSelectedItemsChange={selectedItems =>
                          setFilters({
                            ...filters,
                            yearsExperience: selectedItems,
                          })
                        }
                        selectedItems={filters.yearsExperience}
                        selectText="Year Experience"
                        searchInputPlaceholderText="Search Year Experience"

                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        searchInputTextColor="#000"
                        hideDropdown={true}
                        hideTags={true}
                        hideSubmitButton={true}

                      />
                      <MultiSelect
                        items={howMeet}
                        uniqueKey="id"
                        displayKey="name"
                        onSelectedItemsChange={selectedItems =>
                          setFilters({
                            ...filters,
                            howMeet: selectedItems,
                          })
                        }
                        selectedItems={filters.howMeet}
                        selectText="How we Meat"
                        searchInputPlaceholderText="How we Meet..."
                        searchInputStyle={{ height: 40 }}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        searchInputTextColor="#000"
                        hideDropdown={true}
                        hideTags={true}
                        hideSubmitButton={true}
                      />
                      <Button
                        backgroundColor={'#2A72DE'}
                        title={'Apply Filter'}
                        onPress={filterData}
                        marginLeft={20}
                        marginRight={20}
                      />
                    </View>
                  </ScrollView>

                </View>
              </View>
            </Modal>
          </>
        )}
      </>
    );
  };

  const [indexs, setIndex] = useState(0)

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
          <IndividualHeaderLayout style={{ flex: 1 }}>
            <CustomPopup
              modalVisible={prevDailog}
              setModalVisible={() => setPrevDailog(false)}>
              <View>
                <Text>Prev Data Show Here</Text>
              </View>
            </CustomPopup>
            {/* <LikeTab /> */}
            <Vibes />


          </IndividualHeaderLayout>

        </>
      )}
    </>
  );
};



export { Vibe };
