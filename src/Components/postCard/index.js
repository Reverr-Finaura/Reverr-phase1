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
                    width: 30,
                    height: 30,
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
                source={require('../../assets/images/comment.png')}
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
  }, []);

  return (
    <View style={{paddingBottom: '5%'}}>
      <FlatList
        data={postData}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        onEndReached={_handleLoadMore}
        onEndReachedThreshold={1}
        refreshing={state.refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default PostCard;
