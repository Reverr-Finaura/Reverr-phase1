import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppColors} from '../../../utils';
import {BackButton, CustomPopup, ProfileDetailsBox} from '../../../Components';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../viewProfile/style';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {getPost} from '../../../utils/FirebaseFunctionality';
import {styles2} from '../../Room/styles';
import {
  load_room_data,
  refresh_rooms_list,
  set_allLoaded,
  like_post,
  pin_post,
  deletePost,
} from '../../../Redux/actions';
import {mentorService} from '../../../Redux/services/mentor.service';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const IndividuaProfile = props => {
  const navigation = useNavigation();
  const state = useSelector(state => state.UserReducer);
  const [posts, setPosts] = useState(false);
  const [about, setAbout] = useState(true);
  const [popup, setPopup] = useState(false);
  const [_id, set_Id] = useState('');
  const [owner, setOwner] = useState(false);
  const dispatch = useDispatch();
  const [postData, setPostData] = useState('');

  const handleDelete = post => {
    console.log(post.id, 'postdetails');
    dispatch(deletePost(post, post.id));
  };
  const likePost = (id, item) => {
    dispatch(like_post(id, item, state.user.email));
  };

  const _handleLoadMore = () => {
    console.log('on end reached dispatched');
    dispatch(load_room_data(state?.lastDocument || undefined));
  };

  const handleRefresh = () => {
    dispatch(set_allLoaded(false));
    dispatch(refresh_rooms_list());
  };

  // console.log(state.Rooms.postedby === state.user.email, 'RoomsData');

  const renderCard = ({item, index}) => {
    console.log(state.allLoaded, 'Hey!');
    // console.log(state.Rooms[0], 'userdta');
    return (
      <LinearGradient
        key={item.id}
        colors={[AppColors.CardColor, AppColors.CardColor]}
        start={{x: -3, y: 1.3}}
        end={{x: 3, y: 0.5}}
        style={styles2.postCard}>
        <View style={styles2.creatorDetails}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewProfile', {
                  postData: item,
                });
              }}>
              <Image style={styles2.dp} source={{uri: item.postedby.image}} />
            </TouchableOpacity>
            <View style={{marginStart: '3%'}}>
              <Text style={styles2.name}>{item.postedby.name}</Text>
              <Text style={styles2.company}>@{item.postedby.name}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: AppColors.BtnClr,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop: '-5%',
                marginRight: '4%',
              }}>
              12/08/2022
            </Text>
            <TouchableOpacity
              onPress={() => {
                setPopup(true);
                set_Id(item.id);
                setOwner(
                  state.user.email == item.postedby.email ? true : false,
                );
                // alert(item.id);
              }}>
              <Icon3
                name="ellipsis-vertical"
                size={22}
                color={AppColors.ActiveColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        {item.id === _id && (
          <CustomPopup
            modalVisible={popup}
            setModalVisible={setPopup}
            onRequestClose={() => setPopup(false)}>
            <View>
              {owner && (
                <View
                  style={{
                    borderBottomColor: AppColors.FontsColor,
                    borderBottomWidth: 1,
                    paddingVertical: '4%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(item);
                      // alert(item.id);
                      setPopup(false);
                    }}>
                    <Text style={{color: AppColors.FontsColor}}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View
                style={{
                  borderBottomColor: AppColors.FontsColor,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  paddingVertical: '4%',
                }}>
                <TouchableOpacity>
                  <Text style={{color: AppColors.FontsColor}}>Share</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderBottomColor: AppColors.FontsColor,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  paddingVertical: '4%',
                }}>
                <TouchableOpacity onPress={() => savePost(item)}>
                  <Text style={{color: AppColors.FontsColor}}>
                    {state.savedPosts && state.savedPosts.includes(item.id)
                      ? 'Unsave'
                      : 'Save'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingVertical: '4%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setPopup(false)}>
                  <Text style={{color: AppColors.FontsColor}}>close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </CustomPopup>
        )}
        <View>
          {item.image == '' ? (
            <View style={{paddingHorizontal: '5%'}}>
              <Text style={styles2.details}>{item.text}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles2.details}>{item.text}</Text>
              <View
                style={[styles2.image, {overflow: 'hidden', marginTop: '2%'}]}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: item.image}}
                />
              </View>
            </View>
          )}
        </View>
        <View style={styles2.IconContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => likePost(item.id, item)}>
              {item.likes.includes(state.user.email) ? (
                <Image
                  source={require('../../../assets/images/likedone.png')}
                  style={{
                    tintColor: AppColors.ActiveColor,
                    width: 30,
                    height: 30,
                  }}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/like.png')}
                  style={{
                    tintColor: AppColors.ActiveColor,
                    width: 20,
                    height: 22,
                  }}
                />
              )}
            </TouchableOpacity>
            <Text style={{marginStart: '8%', color: AppColors.BtnClr}}>
              {item.likes.length} reactions
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                dispatch(pin_post(item));
                navigation.navigate('comments', {
                  postData: item,
                });
              }}>
              <Image
                source={require('../../../assets/images/comment.png')}
                style={{
                  tintColor: AppColors.ActiveColor,
                  height: 22,
                  width: 20,
                }}
              />
            </TouchableOpacity>
            <Text style={{marginStart: '8%', color: AppColors.BtnClr}}>
              {item.comments.length} comments
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

  useEffect(() => {
    dispatch(mentorService);
    if (state.lastDocument == undefined) {
      dispatch(set_allLoaded(false));
      dispatch(load_room_data(undefined));
    } else {
      dispatch(load_room_data(state.lastDocument));
    }
    /* getPost().then(res => {
      let dd = res.map(d => d._data);
      setPostData(
        dd.filter(
          item => item.postedby._documentPath._parts[1] == state.user.email,
        ),
      );
      /* console.log(
        dd[2].postedby._documentPath._parts[1] == state.user.email,
        'pspsp',
      ); 
    }); */
    let t = state.Rooms.filter(item => item.postedby.email == state.user.email);
    setPostData(t);
    console.log(state.Rooms, 'filtered');
  }, []);

  if (!state) {
    return (
      <View style={styles.mainscreen}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: AppColors.primarycolor}}>
      <View style={{height: Height / 2.4, width: '100%'}}>
        <View
          style={{
            backgroundColor: '#093B6A80',
            height: '70%',
            marginTop: '4%',
            marginHorizontal: '3%',
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '8%',
              paddingVertical: '2%',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon2 name="angle-left" size={29} color={AppColors.FontsColor} />
            </TouchableOpacity>
            <Text
              style={{
                color: AppColors.FontsColor,
                marginStart: '35%',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Profile
            </Text>
          </View>
        </View>

        <LinearGradient
          colors={[AppColors.ActiveColor, '#012437']}
          start={{x: 0.3, y: 1.3}}
          end={{x: 2, y: 0.9}}
          style={{
            position: 'absolute',
            top: '40%',
            height: Height / 3.1,
            left: '8%',
            right: '8%',
            borderRadius: 10,
            alignItems: 'center',
            elevation: 10,
            zIndex: 5,
          }}>
          <View style={{marginTop: '20%'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: AppColors.FontsColor,
                letterSpacing: 1,
                textAlign: 'center',
              }}>
              {state.user.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: AppColors.BtnClr,
                textAlign: 'center',
              }}>
              @ {state.user.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '2%',
              }}>
              <Image source={require('../../../assets/images/linkdin.png')} />
              <Image source={require('../../../assets/images/twitter.png')} />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingStart: '12%',
                marginTop: '5%',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: AppColors.FontsColor}}>Gender</Text>
                <Text style={{color: AppColors.FontsColor}}>Male</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: AppColors.FontsColor}}>Hometown</Text>
                <Text style={{color: AppColors.FontsColor}}>
                  New Delhi, India
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: AppColors.FontsColor}}>Location</Text>
                <Text style={{color: AppColors.FontsColor}}>New Delhi</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
            position: 'absolute',
            left: '16%',
            right: '16%',
            top: '22%',
          }}>
          <TouchableOpacity>
            <ImageBackground
              source={require('../../../assets/images/shadow.png')}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="camera" size={22} color={AppColors.FontsColor} />
            </ImageBackground>
          </TouchableOpacity>
          <Image
            source={{uri: state.user.image}}
            style={{
              width: 110,
              height: 110,
              borderRadius: 80,
              borderWidth: 5,
              borderColor: AppColors.FontsColor,
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <ImageBackground
              source={require('../../../assets/images/shadow.png')}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="cog" size={22} color={AppColors.FontsColor} />
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: AppColors.CardColor,
            borderBottomWidth: 2,
            justifyContent: 'space-around',
            marginHorizontal: '8%',
            marginTop: '20%',
            paddingHorizontal: '5%',
          }}>
          <TouchableOpacity
            style={{
              paddingBottom: '4%',
              borderBottomColor: posts
                ? AppColors.ActiveColor
                : AppColors.primarycolor,
              borderBottomWidth: 4,
            }}
            onPress={() => {
              setPosts(true);
              setAbout(false);
            }}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: posts ? AppColors.ActiveColor : AppColors.FontsColor,
                },
              ]}>
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingBottom: '4%',
              borderBottomColor: about
                ? AppColors.ActiveColor
                : AppColors.primarycolor,
              borderBottomWidth: 4,
            }}
            onPress={() => {
              setPosts(false);
              setAbout(true);
            }}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: about ? AppColors.ActiveColor : AppColors.FontsColor,
                },
              ]}>
              About
            </Text>
          </TouchableOpacity>
        </View>
        {posts && (
          <View style={{paddingBottom: '5%'}}>
            <FlatList
              data={postData}
              keyExtractor={item => item.id}
              renderItem={renderCard}
              // onEndReached={_handleLoadMore}
              onEndReachedThreshold={1}
              // refreshing={state.refreshing}
              // onRefresh={handleRefresh}
            />
          </View>
        )}
        {about && (
          <View>
            <LinearGradient
              colors={[AppColors.primarycolor, AppColors.poupopbg]}
              start={{x: 0, y: 0.8}}
              end={{x: 0.9, y: 0}}
              style={{
                marginHorizontal: '5%',
                borderRadius: 40,
                alignItems: 'center',
                paddingVertical: '3%',
                marginTop: '3%',
                paddingHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: AppColors.FontsColor,
                  fontSize: 14,
                  textAlign: 'center',
                  paddingHorizontal: '5%',
                }}>
                I am a marketing research , looking for mentorship, I am an IIM
                Bangalore graduate and have worked with Fintech for 5 years.
              </Text>
            </LinearGradient>
            <ProfileDetailsBox userData={state.user} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export {IndividuaProfile};
