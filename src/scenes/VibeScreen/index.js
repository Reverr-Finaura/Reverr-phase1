import React, {useCallback, useRef, useState, useEffect} from 'react';
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
{/*import Swiper from 'react-native-deck-swiper';*/}
import Button from '../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MultiSelect from 'react-native-multiple-select';
import styles from './styles';
import authentication from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import AboutMeSection from '../../Components/components/AboutMeSection';
import FindMeOn from '../../Components/components/FindMeOn';
import GradientHeader from '../../Components/components/GradientHeader';
import HowToMeet from '../../Components/components/HowToMeet';
import LineBar from '../../Components/components/LineBar';
import ProfileTitle from '../../Components/components/ProfileTitle';
import WhyHere from '../../Components/components/WhyHere';
import Theme from '../../utils/Theme';

// import { useNavigation } from '@react-navigation/native';
// import {FlatList, ScrollView} from 'react-native-gesture-handler';
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
      <View style={styles.viewLike}>
        <TouchableOpacity onPress={() => navigation.navigate('LikeScreen')}>
          <View style={styles.viewLike1}>
            <Text style={styles.likeText}>likes</Text>
          </View>
        </TouchableOpacity>
        <View style={{paddingRight: 35}}>
          <TouchableOpacity onPress={() => setFilter(true)}>
            <Icon name="filter" color="#ffffff" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const Vibes = () => {
    const {params} = useRoute();
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
    const [numberOfSwipsDone, setNumberOfSwipsDone] = useState();
    const [getcard, setgetcards] = useState(0);
    const [show, setshow] = useState(false);
    const [vertical, setvertical] = useState(false);

    const [filters, setFilters] = useState({
      hareFor: [],
      yearsExperience: [],
      howMeet: [],
    });
    const ageOptions = [
      {id: '< 1', name: '< 1'},
      {id: '1-2', name: '1-2'},
      {id: '2-5', name: '2-5'},
      {id: '5>', name: '5>'},
    ];

    const hareFor = [
      {id: 'Find Investors', name: 'Find Investors'},
      {id: 'Networking', name: 'Networking'},
      {id: 'Hire Employees', name: 'Hire Employees'},
      {id: 'Find Mentor', name: 'Find Mentor'},
      {id: 'Find Cofounders', name: 'Find Cofounder'},
    ];
    const howMeet = [
      {id: 'At Coffee', name: 'At Coffee'},
      {id: 'Video Call', name: 'Video Call'},
      {id: 'Phone Call', name: 'Phone Call'},
    ];

    const [filteringData, setFilteringData] = useState([]);
    // console.log("🚀 ~ file: index.js:2476 ~ Vibes ~ filteringData:",JSON.stringify (filteringData))

    const filterData = () => {
      if (
        filters.hareFor.length > 0 ||
        filters.howMeet.length > 0 ||
        filters.yearsExperience.length > 0
      ) {
        let res = cards.filter(val => {
          if (val?.Vibe_Data?.Here_for != undefined) {
            return filters.hareFor.every(hereFor =>
              val.Vibe_Data.Here_for.includes(hereFor),
            );
          }
        });

        let res1 = res.filter(val => {
          if (val.Vibe_Data?.How_To_Meet != undefined) {
            return filters.howMeet.every(meeting =>
              val.Vibe_Data.How_To_Meet.includes(meeting),
            );
          }
        });

        let res2 = res1.filter(val => {
          if (val?.Vibe_Data?.Years_Of_Experience != undefined) {
            return filters.yearsExperience.every(yearExp =>
              val.Vibe_Data.Years_Of_Experience.includes(yearExp),
            );
          }
        });

        setFilteringData(res2);
        setFilter(false);
        // alert("Inner")
      } else {
        setFilteringData(cards);
        setFilter(false);
        // alert("Outer")
      }
    };

    const HandleShow = async () => {
      // console.log('at shoiww');
      // console.log(show);
      setshow(() => !show);
      setvertical(() => !vertical);
      // console.log('after', show);
    };

    const swipeLeft = async CurrentIndex => {
      setCount(count + 1);
      HandleOnSwiped(CurrentIndex);

      var tempCards = filteringData.filter(
        it => it.email != authentication().currentUser.email,
      ).filter(
        it => it.Vibe_Data !=undefined
      );

      var tempUser = tempCards[CurrentIndex];

      var My_Email = state.user.email;

      passedUsers(tempUser.email)
      // if (!cards[cardindex]) return;
      // const LeftSwiped = cards[CurrentIndex];
      // // console.log("🚀 ~ file: index.js:2543 ~ swipeLeft ~ LeftSwiped:", LeftSwiped)
      // // console.log('Left detail', LeftSwiped.id);
      // firestore()
      //   .collection('Users')
      //   .doc(state.user.email)
      //   .collection('passeduser')
      //   .doc(LeftSwiped.id)
      //   .set(LeftSwiped);
    };

    const Tapanywhere = cardindex => {
      const data = cards[cardindex];
      // console.log('Tap anywhere', data);
      navigation.navigate('ShowMoreVibe', data);
    };

    const passedUsers = async (user) =>{
      var My_Email = state.user.email;

      await firestore()
            .collection('Users')
            .doc(My_Email)
            .update({
              passedUser: firestore.FieldValue.arrayUnion(user),
            });
      await firestore()
            .collection('Users')
            .doc(My_Email)
            .update({
              Last_Card_Email_Swiped: user,
            });
      await firestore()
            .collection('Users')
            .doc(My_Email)
            .update({
              Number_Of_Swips_Done: firebase.firestore.FieldValue.increment(1)
            });

            setNumberOfSwipsDone(prev=> prev++);
    }

    const swipeRight = async CurrentIndex => {

      var tempCards = filteringData.filter(
        it => it.email != authentication().currentUser.email,
      ).filter(
        it => it.Vibe_Data !=undefined
      );

      var tempUser = tempCards[CurrentIndex];

      var My_Email = state.user.email;

      setCount(count + 1);

      HandleOnSwiped(CurrentIndex);
      // var currCard = cards[idx];
      

      //add swiped user to passed user array of the current user
      passedUsers(tempUser.email)

      //check if the user has liked me or superliked me then match and update in both users
      if((tempUser.liked && tempUser.liked.includes(My_Email) )||(tempUser.super_liked_people && tempUser.super_liked_people.includes(My_Email))){
        var sup = tempUser.super_liked_people ? tempUser.super_liked_people.includes(My_Email) : false;
        try{

          if(sup){
            await firestore()
            .collection('Users')
            .doc(tempUser.email)
            .update({
              super_liked_people: firestore.FieldValue.arrayRemove(My_Email),
            });
            await firestore()
            .collection('Users')
            .doc(My_Email)
            .update({
              people_super_liked_me: firestore.FieldValue.arrayRemove(tempUser.email),
            });
          }else{
            await firestore()
            .collection('Users')
            .doc(tempUser.email)
            .update({
              liked: firestore.FieldValue.arrayRemove(My_Email),
            });
            await firestore()
            .collection('Users')
            .doc(My_Email)
            .update({
              people_liked_me: firestore.FieldValue.arrayRemove(tempUser.email),
            });
          }
          await firestore()
            .collection('Users')
            .doc(My_Email)
            .update({
              Matched_People: firestore.FieldValue.arrayUnion(tempUser.email),
            });
            await firestore()
            .collection('Users')
            .doc(tempUser.email)
            .update({
              Matched_People: firestore.FieldValue.arrayUnion(My_Email),
            });

          // action dispacthed to store matchedpeople
          dispatch(matchedpeople(tempUser.email));
          // Match screen is called here
          navigation.navigate('MatchScreen', {
            data:tempUser,
            data2:state.user
          });

          setPrevDailog(true);
          setPrevData(prev);
        }
        catch(err){
          console.log(err)
          // alert("Please Check your internet connection")
        }
      }
      //else add likeduser's email to user's liked array
      else{
        try{
          
          await firestore()
          .collection('Users')
          .doc(My_Email)
          .update({
            liked: firestore.FieldValue.arrayUnion(tempUser.email),
          });

          await firestore()
          .collection('Users')
          .doc(tempUser.email)
          .update({
            people_liked_me: firestore.FieldValue.arrayUnion(My_Email),
          });
        
        }
        catch (err){
          console.log(err)
          // alert("Please Check your internet connection")
        }

      }
      

      // const data = cards[CurrentIndex];
      // // console.log('right datta', data);

      // // dispatch(RemoveTopCard());
      // // console.log('stae  vibe swipe right isss', state.vibe);
      // console.log('data is', data);
      
      // var Liked_Email = data.id;
      // var Liked_People = data.liked_people;
      // console.log(Liked_Email, "LIKED EMAIL")
      // console.log(Liked_People, "LIKED PEOPLE")
      // await firestore()
      //   .collection('Users')
      //   .doc(state.user.email)
      //   .update({
      //     liked: firestore.FieldValue.arrayUnion(Liked_Email),
      //   });

      // if (Liked_People) {
      //   var check = Liked_People.includes(My_Email);
      //   if (check) {
      //     await firestore()
      //       .collection('Users')
      //       .doc(state.user.email)
      //       .update({
      //         Matched_People: firestore.FieldValue.arrayUnion(Liked_Email),
      //       });
      //     // action dispacthed to store matchedpeople
      //     dispatch(matchedpeople(Liked_Email));
      //     // Match screen is called here
      //     navigation.navigate('MatchScreen', {
      //       data,
      //     });

      //     setPrevDailog(true);
      //     setPrevData(prev);
      //   }
      // } else {
      //   await firestore()
      //     .collection('Users')
      //     .doc(state.user.email)
      //     .update({
      //       liked_people: firestore.FieldValue.arrayUnion(Liked_Email),
      //     })
      //     .then(async () => {
      //       await firestore()
      //         .collection('Users')
      //         .doc(Liked_Email)
      //         .update({
      //           people_liked_me: firestore.FieldValue.arrayUnion(
      //             state.user.email,
      //           ),
      //         });
      //       // console.log('userswiped');
      //     })
      //     .catch(err => {
      //       console.log(err.message);
      //       console.log('please check your internet connection');
      //     });
      // }
    };
    const superLikeCenter = async CurrentIndex => {

      var tempCards = filteringData.filter(
        it => it.email != authentication().currentUser.email,
      ).filter(
        it => it.Vibe_Data !=undefined
      );

      var tempUser = tempCards[CurrentIndex];

      var My_Email = state.user.email;

      setCount(count + 1);

      passedUsers(tempUser.email)

      HandleOnSwiped(CurrentIndex);
      // var currCard = cards[idx];

      //check if the user has liked me or superliked me then match and update in both users
      if((tempUser.liked && tempUser.liked.includes(My_Email) )||(tempUser.super_liked_people && tempUser.super_liked_people.includes(My_Email))){
        var sup = tempUser.super_liked_people ? tempUser.super_liked_people.includes(My_Email) : false;
        try{

          if(sup){
            await firestore()
            .collection('Users')
            .doc(tempUser)
            .update({
              super_liked_people: firestore.FieldValue.arrayRemove(My_Email),
            });
          }else{
            await firestore()
            .collection('Users')
            .doc(tempUser)
            .update({
              liked: firestore.FieldValue.arrayRemove(My_Email),
            });
          }

          await firestore()
            .collection('Users')
            .doc(My_Email)
            .update({
              Matched_People: firestore.FieldValue.arrayUnion(tempUser.email),
            });
            await firestore()
            .collection('Users')
            .doc(tempUser.email)
            .update({
              Matched_People: firestore.FieldValue.arrayUnion(My_Email),
            });
          // action dispacthed to store matchedpeople
          dispatch(matchedpeople(tempUser.email));
          // Match screen is called here
          navigation.navigate('MatchScreen', {
            tempUser,
          });

          setPrevDailog(true);
          setPrevData(prev);
        }
        catch(err){
          console.log(err)
          alert("Please Check your internet connection")
        }
      }
      //else add likeduser's email to user's liked array
      else{
        try{
          
          await firestore()
          .collection('Users')
          .doc(My_Email)
          .update({
            super_liked_people: firestore.FieldValue.arrayUnion(tempUser.email),
          });

          await firestore()
          .collection('Users')
          .doc(tempUser.email)
          .update({
            people_super_liked_me: firestore.FieldValue.arrayUnion(My_Email),
          });
        
        }
        catch (err){
          console.log(err)
          alert("Please Check your internet connection")
        }

      }

      // // console.log("===>", CurrentIndex)

      // setCount(count + 1);

      // HandleOnSwiped(CurrentIndex);
      // // var currCard = cards[idx];

      // const data = cards[CurrentIndex];
      // // console.log('right datta', data);

      // // dispatch(RemoveTopCard());
      // // console.log('stae  vibe swipe right isss', state.vibe);
      // // console.log('data is', data);

      // var Liked_Email = data.id;
      // var My_Email = state.user.email;
      // var Liked_People = data.liked_people;

      // if (Liked_People) {
      //   var check = Liked_People.includes(My_Email);
      //   if (check) {
      //     await firestore()
      //       .collection('Users')
      //       .doc(state.user.email)
      //       .update({
      //         Matched_People: firestore.FieldValue.arrayUnion(Liked_Email),
      //       });
      //     // action dispacthed to store matchedpeople
      //     dispatch(matchedpeople(Liked_Email));
      //     // Match screen is called here
      //     navigation.navigate('MatchScreen', {
      //       data,
      //     });

      //     setPrevDailog(true);
      //     setPrevData(prev);
      //   }
      // } else {
      //   await firestore()
      //     .collection('Users')
      //     .doc(state.user.email)
      //     .update({
      //       super_liked_people: firestore.FieldValue.arrayUnion(Liked_Email),
      //     })
      //     .then(async () => {
      //       await firestore()
      //         .collection('Users')
      //         .doc(Liked_Email)
      //         .update({
      //           super_people_liked_me: firestore.FieldValue.arrayUnion(
      //             state.user.email,
      //           ),
      //         });
      //       // console.log('userswiped');
      //     })
      //     .catch(err => {
      //       console.log(err.message);
      //       console.log('please check your internet connection');
      //     });
      // }
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

      // await firestore().collection('Users').doc(state.user.email).update({
      //   Number_Of_Swips_Done: swipe,
      // });

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
            console.log('Document vibe data:', doc.data().Vibe_Data);
            setshowCards(true);
            // console.log('yoooi');
          } else {
            // doc.data() will be undefined in this case
            setshowCards(false);
            // console.log('No such document!');
            navigation.navigate('VibeBoarding');
          }
        })
        .catch(error => {
          console.log('Error getting document:', error);
        });
    };

    // This will run after VibeBoarding screen
    if (params) {
      // console.log('after boarding screen here');
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

          if (NewExpiredTime > state.user.CardsUpdatedTime) {
            // console.log('hello');
            settoshowtimer(true);
          }
        }
        // CheckIfBoarding();
        // console.log('after boarding');

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
        // console.log('noo');
        // const TotalSwipe = state.user.Number_Of_Swips_Done;
        var LastEmailSwipe = state.user.Last_Card_Email_Swiped;
        // const To_Show_Vibe_Screen = No_Of_Swipes.data().Vibe;
        // if (To_Show_Vibe_Screen) {
        //   return;
        // }
        // console.log('what is total swipe', TotalSwipe);
        // const passeduserdata = await firestore()
        //   .collection('Users')
        //   .doc(state.user.email)
        //   .collection('passeduser')
        //   .get()
        //   .then(snapshot =>
        //     snapshot.docs.map(
        //       data => data.data().id,
        //       setLoading(false),
        //       //  data=>   console.log('what is .dta.', typeof(data.data().id)),
        //     ),
        //   );
        // // console.log('what is passed data', passeduserdata);
        // // alert(passeduserdata)

        // const passeduserids =
        //   passeduserdata.length > 0 ? passeduserdata : ['test'];
        // // console.log('what is passed user ids', passeduserids);

        // let tempList = passeduserids.map(item => item.email);

        var passedusers = state.user.passedUser;

        if(passedusers == undefined || passedusers == [] || passedusers == ""){
          passedusers = ["reverr@reverr.io"] ;
          LastEmailSwipe = "reverr@reverr.io"
        }

        setNumberOfSwipsDone(state.user.Number_Of_Swips_Done)

        let result = cards.filter(item => passedusers.includes(item.email));
        // alert(result)

        {
          // if (passeduserids.length >= 10) {
          //   passeduserids.splice(0, 3);
          // }
        }
        // console.log('what is passed user after ids', passeduserids);
        // const data=["rgupta.success@gmail.com",'kunnugarg2@gmail.com','kohlibhavya18@gmail.com','19103098@mail.jiit.ac.in']
        // if (TotalSwipe == 0) {
        // console.log('heree at 0');
        let Intialquery = await firestore()
          .collection('Users')
          .where('email', 'not-in', [...passedusers]);

        Intialquery.get().then(snapshot => {
          let result = snapshot.docs
          // like
          // let tempList = state.user.likedDislike.map(item => item);
          // let result = snapshot.docs.filter(item =>
          //   (!tempList.includes(item.data().email))
          //   // console.log("--------1222", item)
          // )

          // dislike
          // let tempList2 = state.user.dislike.map(item => item);
          // let result2 = result.filter(item =>
          //   (!tempList2.includes(item.data().email))
          // )
          // result.map((i, index) => {
          //   console.log(index + 1, "ifrer part", i.data().email)
          // })
          // console.log(result.length, '--------------------', snapshot.docs.length);

          // Intialquery.onSnapshot(snapshot => {
          // console.log('value of snap', snapshot.docs.length);

          // let resultss = results.filter(o1 => !reject.some(o2 => o1.email === o2));

          if (state.user.liked != undefined) {
            // let result = snapshot.docs.filter(
            //   o1 => !state.user.liked.some(o2 => o1.email === o2),
            // );
            // console.log(
            //   '🚀 ~ file: index.js:603 ~ Intialquery.get ~ result:',
            //   result.length,
            // );

            setcards(
              result.map(doc => ({
                id: doc.id,
                ...doc.data(),
              })),
            );
            setFilteringData(
              result.map(doc => ({
                id: doc.id,
                ...doc.data(),
              })),
            );
          } else {
            setcards(
              snapshot.docs
                // .filter(doc => doc.id !== state.user.email)
                .map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                })),
            );

            setFilteringData(
              snapshot.docs
                // .filter(doc => doc.id !== state.user.email)
                .map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                })),
            );
          }
          setshowCards(true);
        });
        // }

        if (TotalSwipe > 0 && continueshowingcard) {
          Afterquery = await firestore()
            .collection('Users')
            .orderBy('email')
            .where('email', 'not-in', [...passedusers])
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
          const ExpiredDate = new Date();
          // console.log(ExpiredDate);
          // console.log(ExpiredDate.getTime());
          const ExpiredTime = ExpiredDate.getTime()-10000;
          await firestore()
            .collection('Users')
            .doc(state.user.email)
            .update({AllCardsSwiped: false, Number_Of_Swips_Done: 0, CardsExpiredTime:ExpiredTime});
        }
      };

      handleAllCardSwiped();
    }, [hasPremiumOfVibe]);

    useEffect(() => {
      // console.log('card ind q', cardindex);

      if (numberOfSwipsDone >= 10) {
        if (hasPremiumOfVibe === true) {
          return;
        }
        const ExpiredDate = new Date();
        // console.log(ExpiredDate);
        // console.log(ExpiredDate.getTime());
        const ExpiredTime = ExpiredDate.getTime();
        const UpdatedTime = ExpiredTime + 86397500;
        if(ExpiredTime > state.user.CardsUpdatedTime){
          setcontinueshowingcard(true);
          // console.log('card ind inside', cardindex);
          // var DeletePassedUserReference = firestore()
          //   .collection('Users')
          //   .doc(state.user.email)
          //   .collection('passeduser');
          // DeletePassedUserReference.get().then(querysnapshot => {
          //   Promise.all(querysnapshot.docs.map(d => d.ref.delete()));
          // });
          setAllswiped(false);
    
          const SetFirebaseswipedData = async () => {
            await firestore().collection('Users').doc(state.user.email).update({
              AllCardsSwiped: false,
              numberOfSwipsDone: 0
            });
          };
  
          SetFirebaseswipedData();
          settoshowtimer(false);
        }
        else{
          setcontinueshowingcard(false);
          // console.log('card ind inside', cardindex);
          // var DeletePassedUserReference = firestore()
          //   .collection('Users')
          //   .doc(state.user.email)
          //   .collection('passeduser');
          // DeletePassedUserReference.get().then(querysnapshot => {
          //   Promise.all(querysnapshot.docs.map(d => d.ref.delete()));
          // });
          setAllswiped(true);
    
          const SetFirebaseswipedData = async () => {
            await firestore().collection('Users').doc(state.user.email).update({
              CardsExpiredTime: UpdatedTime,
              CardsUpdatedTime: UpdatedTime,
              AllCardsSwiped: true,
            });
          };
  
          SetFirebaseswipedData();
          settoshowtimer(true);
        }

        // It is 24 hrrs in milli second 86400000;86397500;
        // const ToChecKAfter = 12000;
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
    }, [numberOfSwipsDone]);
    // console.log('card index changing', loading);
    // console.log(showCards);
    // console.log(cards);
    const vibeusers = filteringData.filter(it=> it.Vibe_Data != undefined);
    vibeusers.map((it)=>{

      // console.log( it.email  , "111111111")
    })
    if(vibeusers[0] )
    console.log( vibeusers[0]  , "111111111")
    return (
      <>
        <View style={styles.likewrapper}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('Premium')}>
            <Image source={Theme.hearttick} style={styles.icon} />
            <Text style={styles.text}>view likes</Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if(hasPremiumOfVibe){
                setFilter(true)
              }else{
                alert("You need Vibe Premium to use filters.")
              }
            }  }>
            <Image source={Theme.filter} style={styles.icon} />
            </TouchableOpacity>
        </View>
        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          <>
            {filteringData.length !== 0 ? (
              <View >
                {/* <Text style={{color: 'white'}}>HELOO</Text> */}
                <FlatList
                  data={filteringData.filter(
                    it => it.email != authentication().currentUser.email,
                  ).filter(
                    it => it.Vibe_Data !=undefined
                  )}
                  extraData={filteringData}
                  pagingEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    justifyContent: 'center',
                    flexGrow: 1,
                    width:"50%",
                    height:"88%"
                  }}
                  renderItem={({item, index}) => {
                    // console.log(item.email)
                    if (cardindex == index ) {
                      // console.log(item)
                      return (
                        <ScrollView showsVerticalScrollIndicator={false}>
                          <LinearGradient
                            colors={colors}
                            style={[styles.cardWrapper, styles.shadowProp]}>
                            <View style={styles.wrapper}>
                              <LinearGradient
                                colors={['#3D85E3', '#79C0F2']}
                                style={styles.imgborder}>
                                   {item.image ? (
                                    <Image
                                      style={styles.img}
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
                              </LinearGradient>
                              <View style={styles.titleWrapper}>
                                {item.name ? <Text style={styles.usertitle}>{item.name}</Text>: null}
                                {item.verified && <Image source={Theme.verify} style={styles.verify} />}
                              </View>
                              <Text style={styles.tag}>{item.designation ? item.designation : item.Vibe_Data.Previous_Designation} at {item.Vibe_Data.Previous_Org}</Text>
                              {/* <Text style={styles.location}>New Delhi,India</Text> */}
                            </View>

                            <AboutMeSection about={item.about?item.about:"I haven't added about section yet..."}/>
                            
                            <View style={styles.floatingBanner}>
                              <TouchableOpacity style={styles.align}
                                   onPress={() => {
                                    // navigation.navigate('LikeMatchScreen')
                                    // swipeLefts(index)
                                    // setIndex(indexs+1)
                                    swipeLeft(index);
                                  }}
                              >
                                <Image source={Theme.nopenew} style={styles.btn} />
                                <Text style={styles.btntext}>nope</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.align}
                                onPress={() => {
                                  superLikeCenter(index);
                                }}
                              >
                                <Image source={Theme.supernew} style={styles.btn} />
                                <Text style={styles.btntext}>superlike</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.align}
                                onPress={() => {
                                  // navigation.navigate('LikeMatchScreen')
                                  // swipeLefts(index)
                                  swipeRight(index);
                                  // setIndex(indexs+1)
                                }}
                              >
                                <Image source={Theme.likenew} style={styles.btn} />
                                <Text style={styles.btntext}>like</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                              <LineBar />
                            </View>

                            {item.Vibe_Data.Here_for && 
                            <>
                            <WhyHere hereFor={item.Vibe_Data.Here_for}/>

                            <View style={{paddingHorizontal: 20}}>
                              <LineBar />
                            </View>
                            </>
                            }
                            <ProfileTitle
                              title="Currently"
                              textOne={item.designation ? item.designation : item.Vibe_Data.Previous_Designation}
                              textTwo="Rever,Mastok"
                            />

                            <View style={{paddingHorizontal: 20}}>
                              <LineBar />
                            </View>

                            <ProfileTitle title="Industry" textOne={item.industry?item.industry:item.Vibe_Data.Industry} />

                            <View style={{paddingHorizontal: 20}}>
                              <LineBar />
                            </View>
                            {item.Vibe_Data.Education ?
                            <>
                              <ProfileTitle
                              title="Education"
                              textOne={item.Vibe_Data.Education}
                              textTwo="MBA"
                              />

                              <View style={{paddingHorizontal: 20}}>
                                <LineBar />
                              </View>
                            </>: null
                            }

                            {item.Vibe_Data.How_To_Meet ? <HowToMeet htm={item.Vibe_Data.How_To_Meet} /> : null}

                            <View style={{paddingHorizontal: 20}}>
                              <LineBar />
                            </View>

                            <FindMeOn title={'Find Me On:'} linkedin={item.linkedin} phone={item.phone} email={item.email} />
                          </LinearGradient>

                          <View style={{height: 110}} />
                        

                        
                          {/* <View style={styles.MainCard}>
                            <ScrollView
                              scrollEnabled={true}
                              style={{flexGrow: 1}}
                              showsVerticalScrollIndicator={false}>
                              <View style={{flex: 1}}>
                                <View
                                  style={{alignSelf: 'center', marginTop: 10}}>
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
                                <View style={styles.viewText}>
                                  <Text style={styles.txtName}>
                                    {item?.name}
                                  </Text>
                                  <Text style={styles.ceo}>
                                    {item.Vibe_Data == undefined
                                      ? ''
                                      : item?.Vibe_Data?.Education}
                                  </Text>
                                  <Text style={styles.Delhi}>
                                    New Delhi, India
                                  </Text>
                                </View>

                                <View>
                                  <Text style={styles.about}>About Me</Text>

                                  <Text style={styles.detial} numberOfLines={2}>
                                    Don’t ship it. Don’t settle for good enough.
                                    Do better work than you did yesterday. Get
                                    out of your comfort zone and give it your
                                    all – every day.
                                  </Text>
                                </View>
                                <View style={styles.likebar}>
                                  <View style={styles.nopeText}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        // navigation.navigate('LikeMatchScreen')
                                        // swipeLefts(index)
                                        // setIndex(indexs+1)
                                        swipeLeft(index);
                                      }}>
                                      <Image
                                        style={styles.nope}
                                        source={require('../../../src/assets/images/nope.png')}
                                      />
                                    </TouchableOpacity>
                                    <Text style={styles.textwhite}>nope</Text>
                                  </View>

                                  <View style={styles.superLike}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        superLikeCenter(index);
                                      }}>
                                      <Image
                                        style={styles.nopes}
                                        source={require('../../../src/assets/images/superlike.png')}
                                      />
                                      <Text style={styles.textwhite}>
                                        superlike
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                  <View style={{marginEnd: 10}}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        // navigation.navigate('LikeMatchScreen')
                                        // swipeLefts(index)
                                        swipeRight(index);
                                        // setIndex(indexs+1)
                                      }}>
                                      <Image
                                        style={styles.nope}
                                        source={require('../../../src/assets/images/liketic.png')}
                                      />
                                      <Text style={styles.textwhites}>
                                        like
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                                <TouchableOpacity
                                  onPress={() => setVisible(index)}>
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
                                  <View style={{flex: 1}}>
                                    <View>
                                      <View>
                                        {item.Vibe_Data != undefined && (
                                          <>
                                            <Text style={styles.vibeText}>
                                              What I am here for
                                            </Text>
                                            <View style={styles.viewVibe}>
                                              {item.Vibe_Data != undefined &&
                                                item?.Vibe_Data?.Here_for?.map(
                                                  Here_for => {
                                                    // console.log(">>>>>>>>", Here_for);
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
                                                            style={
                                                              styles.hareFor
                                                            }>
                                                            {Here_for}
                                                          </Text>
                                                        </View>
                                                      </TouchableOpacity>
                                                    );
                                                  },
                                                )}
                                            </View>
                                          </>
                                        )}
                                        {item.Vibe_Data != undefined && (
                                          <>
                                            <View>
                                              <Text style={styles.vibeText}>
                                                Education:
                                              </Text>
                                              <Text style={styles.dataDatabase}>
                                                {item.Vibe_Data == undefined
                                                  ? 'N/A'
                                                  : item?.Vibe_Data?.Education}
                                              </Text>

                                              <Text style={styles.vibeText}>
                                                Industry:
                                              </Text>

                                              <Text style={styles.dataDatabase}>
                                                {item.Vibe_Data == undefined
                                                  ? 'N/A'
                                                  : item?.Vibe_Data?.Industry}
                                              </Text>

                                              <Text style={styles.vibeText}>
                                                Previous Designation:
                                              </Text>
                                              <Text style={styles.dataDatabase}>
                                                {item.Vibe_Data == undefined
                                                  ? 'N/A'
                                                  : item?.Vibe_Data
                                                      ?.Previous_Designation}
                                              </Text>
                                              <Text style={styles.vibeText}>
                                                Previous Organization:
                                              </Text>
                                              <Text style={styles.dataDatabase}>
                                                {item.Vibe_Data == undefined
                                                  ? 'N/A'
                                                  : item?.Vibe_Data
                                                      ?.Previous_Org}
                                              </Text>
                                              <Text style={styles.vibeText}>
                                                How can we meet:
                                              </Text>
                                              {item.Vibe_Data == undefined && (
                                                <Text style={styles.noData}>
                                                  N/A
                                                </Text>
                                              )}
                                              {item.Vibe_Data != undefined &&
                                                item?.Vibe_Data?.How_To_Meet?.map(
                                                  How_To_Meet => {
                                                    // console.log(item);
                                                    return (
                                                      <View>
                                                        <Text
                                                          style={
                                                            styles.dataDatabase
                                                          }>
                                                          {How_To_Meet}
                                                        </Text>
                                                      </View>
                                                    );
                                                  },
                                                )}
                                              <Text style={styles.vibeText}>
                                                Experience:
                                              </Text>
                                              {item.Vibe_Data == undefined && (
                                                <Text style={styles.noData}>
                                                  N/A
                                                </Text>
                                              )}
                                              {item.Vibe_Data != undefined &&
                                                item?.Vibe_Data?.Years_Of_Experience?.map(
                                                  Years_Of_Experience => {
                                                    // console.log(item);
                                                    return (
                                                      <View>
                                                        <Text
                                                          style={
                                                            styles.dataDatabase
                                                          }>
                                                          {Years_Of_Experience}
                                                        </Text>
                                                      </View>
                                                    );
                                                  },
                                                )}
                                            </View>
                                          </>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                )}
                              </View> 
                            </ScrollView>
                          </View> */}
                          
                        </ScrollView>
                      );
                      // }
                    }
                  }}
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
                    <View style={{padding: 20}}>
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
                        selectText="Here For"
                        searchInputPlaceholderText="Search Here For"
                        searchInputStyle={{height: 50}}
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
                        selectText="How we Meet"
                        searchInputPlaceholderText="How we Meet..."
                        searchInputStyle={{height: 40}}
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

  const [indexs, setIndex] = useState(0);

  return (
    <>
      {toshowtimer ? (
        <CountdownTimer
          toshowtimer={toshowtimer}
          settoshowtimer={settoshowtimer}
          finalSetVibePremium={setHasPremiumOfVibe}
        />
      ) : (
        <View style={{backgroundColor: AppColors.primarycolor, flex: 1}}>
          <GradientHeader />
          <CustomPopup
            modalVisible={prevDailog}
            setModalVisible={() => setPrevDailog(false)}>
            <View>
              <Text>Prev Data Show Here</Text>
            </View>
          </CustomPopup>
          {/* <LikeTab /> */}
          <Vibes />
        </View>
      )}
    </>
  );
};

const colors = [
  '#08096F',
  '#0D0D0D',
  Theme.backgroundColor,
  Theme.backgroundColor,
  '#1B1D8B',
];

export {Vibe};
