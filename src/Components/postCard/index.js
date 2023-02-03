import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {Image, TouchableOpacity, View, Text, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  load_room_data,
  refresh_rooms_list,
  set_allLoaded,
  like_post,
  pin_post,
  deletePost,
} from '../../Redux/actions';
import {AppColors} from '../../utils';
import {styles2} from './styles';
import {useEffect} from 'react';
import {mentorService} from '../../Redux/services/mentor.service';
import {CustomPopup} from '../CustomPopup';
import {timeAgo} from '../../utils/Helper/helper';

const PostCard = ({postData}) => {
  const navigation = useNavigation();
  const state = useSelector(state => state.UserReducer);
  const [popup, setPopup] = useState(false);
  const [_id, set_Id] = useState('');
  const [owner, setOwner] = useState(false);
  const dispatch = useDispatch();

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

  /*  const renderCard = ({item, index}) => {
    console.log(new Date(item.createdAt.seconds * 1000).getMonth, 'Hey!');
    console.log(state.allLoaded, 'Hey!');

    return (
      <LinearGradient
        key={item.id}
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: 0.9, y: 1.3}}
        end={{x: 0.3, y: 0.5}}
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
              <Text style={styles2.name}>
                {item.postedby.name.charAt(0).toUpperCase() +
                  item.postedby.name.slice(1)}
              </Text>
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
              {`${new Date(item.createdAt.seconds * 1000).getDate()}/${new Date(
                item.createdAt.seconds * 1000,
              ).getMonth()}/${new Date(
                item.createdAt.seconds * 1000,
              ).getFullYear()}`}
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
                  source={require('../../assets/images/likedone.png')}
                  style={{
                    tintColor: AppColors.ActiveColor,
                    width: 30,
                    height: 30,
                  }}
                />
              ) : (
                <Image
                  source={require('../../assets/images/like.png')}
                  style={{
                    tintColor: AppColors.ActiveColor,
                    width: 22,
                    height: 22,
                  }}
                />
              )}
            </TouchableOpacity>
            <Text style={{marginStart: '8%', color: AppColors.BtnClr}}>
              {item.likes.length} Likes
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
                source={require('../../assets/images/comment.png')}
                style={{
                  tintColor: AppColors.ActiveColor,
                  height: 22,
                  width: 22,
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
  }; */

  const renderCard2 = ({item, index}) => {
    //console.log(timeAgo(new Date(item.createdAt.seconds * 1000)));
    return (
      <View style={styles2.postCard}>
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
              <Text style={[styles2.name, {textTransform: 'capitalize'}]}>
                {item.postedby.name}
              </Text>
              <Text
                style={{
                  color: AppColors.FontsColor,
                  fontSize: 12,

                  textDecorationColor: AppColors.FontsColor,
                }}>
                {item.postedby.designation}
              </Text>
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
              {/* {`${new Date(item.createdAt.seconds * 1000).getDate()}/${new Date(
                item.createdAt.seconds * 1000,
              ).getMonth()}/${new Date(
                item.createdAt.seconds * 1000,
              ).getFullYear()}`} */}
              {timeAgo(new Date(item.createdAt.seconds * 1000))}
              {/*  {timeAgo(new Date(item.createdAt).toISOString())} */}
            </Text>
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
          {item.image === null || '' ? (
            <View style={{paddingHorizontal: '5%'}}>
              <Text style={styles2.details}>{item.text}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles2.details}>{item.text}</Text>
              <View
                style={[
                  styles2.image,
                  {overflow: 'hidden', marginBottom: '6%'},
                ]}>
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
            <TouchableOpacity
              style={{
                paddingTop: '6%',
              }}
              onPress={() => likePost(item.id, item)}>
              {item.likes.includes(state.user.email) ? (
                <Icon3 name="heart" size={22} color={AppColors.FontsColor} />
              ) : (
                <Icon3
                  name="heart-outline"
                  size={22}
                  color={AppColors.FontsColor}
                />
              )}
            </TouchableOpacity>
            <Text style={{marginStart: '8%', color: AppColors.BtnClr}}>
              {item.likes.length}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                paddingTop: '6%',
              }}
              onPress={() => {
                dispatch(pin_post(item));
                navigation.navigate('comments', {
                  postData: item,
                });
              }}>
              <Icon3
                name="chatbubble-ellipses-outline"
                size={22}
                color={AppColors.FontsColor}
              />
            </TouchableOpacity>
            <Text style={{marginStart: '8%', color: AppColors.BtnClr}}>
              {item.comments.length}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                paddingTop: '6%',
              }}
              /*  onPress={() => {
                dispatch(pin_post(item));
                navigation.navigate('comments', {
                  postData: item,
                });
              }} */
            >
              <Icon3
                name="share-outline"
                size={22}
                color={AppColors.FontsColor}
              />
            </TouchableOpacity>
            <Text style={{marginStart: '8%', color: AppColors.BtnClr}}>
              {item.comments.length}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                color={AppColors.FontsColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  }, []);

  return (
    <View
      style={{
        paddingBottom: '5%',
        marginTop: '2%',
        backgroundColor: AppColors.primarycolor,
        paddingHorizontal: '3%',
      }}>
      <FlatList
        data={postData}
        keyExtractor={item => item.id}
        renderItem={renderCard2}
        onEndReached={_handleLoadMore}
        onEndReachedThreshold={1}
        refreshing={state.refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default PostCard;
