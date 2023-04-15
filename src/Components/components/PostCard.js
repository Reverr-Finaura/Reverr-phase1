import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  deletePost,
  like_post,
  load_room_data,
  pin_post,
  refresh_rooms_list,
  setUser,
  set_allLoaded,
} from '../../Redux/actions';
import {timeAgo} from '../../utils/Helper/helper';
import Theme from '../../utils/Theme';
import {AppColors} from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  RemovePost,
  savePost,
  sharePost,
  unsavePost,
} from '../../utils/FirebaseFunctionality';
import {log} from 'react-native-reanimated';

function PostCard({item, index}) {
  // console.log(item,"kdhskhd");

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
  const SharePost = async (postText, id) => {
    try {
      const result = await Share.share({
        message: postText,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log(result.activityType, 'result.activityType');
        } else {
          // shared

          sharePost(id, state?.user?.email);
          console.log('Post Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('dismissed');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const saveYourPost = postID => {
    if (item.saved.includes(postID)) {
      unsavePost(postID, state?.user?.email).then(res => {
        console.log(res, 'unsaved');
        dispatch(setUser(res));
      });
    } else {
      savePost(postID, state?.user?.email).then(res => {
        console.log(res, 'saved');
        dispatch(setUser(res));
      });
    }
  };
  return (
    <View style={[styles.container, {position: 'relative'}]}>
      {item?.id === _id && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => set_Id('')}
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: 'absolute',
            zIndex: 20,
            paddingLeft: '25%',
            paddingRight: '7%',
            paddingTop: '5%',
            overflow: 'hidden',
          }}>
          <View
            style={{backgroundColor: Theme.textLightColor, borderRadius: 20}}>
            <View>
              {state?.user?.email == item?.postedby?.email && (
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
                    }}>
                    <Text
                      style={{
                        color: AppColors.primarycolor,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Delete
                    </Text>
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
                  <Text
                    style={{
                      color: AppColors.primarycolor,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: '4%',
                }}>
                <TouchableOpacity onPress={() => savePost(item)}>
                  <Text
                    style={{
                      color: AppColors.primarycolor,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {state.savedPosts && state.savedPosts.includes(item.id)
                      ? 'Unsave'
                      : 'Save'}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View
                style={{
                  paddingVertical: '4%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => set_Id("")}>
                  <Text style={{color: AppColors.primarycolor,fontFamily:'Poppins-Regular'}}>close</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          set_Id(item.id);
        }}
        style={styles.dots}
        hitSlop={{left: 15, right: 10, top: 15, bottom: 15}}>
        <Image
          source={Theme.threedots}
          style={{height: 13, width: 13, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
      <View style={styles.upperWrapper}>
        <TouchableOpacity
          onPress={() => {
            if (item?.postedby?.email === state.user.email) {
              navigation.navigate('Profile');
            } else {
              navigation.navigate('OthersProfile', {
                otherUserData: item?.postedby,
              });
            }
          }}>
          <Image
            source={{uri: item?.postedby?.image}}
            style={{height: 45, width: 45, borderRadius: 100}}
          />
        </TouchableOpacity>
        <View style={{paddingLeft: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.title}>{item?.postedby?.name}</Text>
            <Text style={styles.hrs}>
              {timeAgo(new Date(item?.createdAt?.seconds * 1000))}
            </Text>
          </View>
          {item?.postedby?.designation !== '' && (
            <Text style={styles.desig}>{item?.postedby?.designation}</Text>
          )}
        </View>
      </View>

      <View style={styles.line} />
      {item?.image === '' ? (
        <View>
          <Text style={styles.desc}>{item?.text}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.desc}>{item?.text}</Text>
          <Image source={{uri: item?.image}} style={styles.img} />
        </View>
      )}

      {/* {hasArt === true ? <Image source={Theme.art} style={styles.img} /> : null} */}

      <View style={styles.line} />
      <View style={styles.footerWrapper}>
        <TouchableOpacity
          onPress={() => likePost(item.id, item)}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.likes.includes(state.user.email) ? (
            <Icon name="heart" size={19} color="red" />
          ) : (
            <Icon name="heart-outline" size={20} color={AppColors.CardColor} />
          )}
          <Text
            style={{
              color: '#FFF',
              fontWeight: '600',
              fontSize: 13,
              marginLeft: 5,
            }}>
            {item?.likes?.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dispatch(pin_post(item));
            navigation.navigate('writecomments', {
              postData: item,
            });
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={Theme.chatsmall}
            style={{height: 20, width: 20, resizeMode: 'contain'}}
          />
          <Text
            style={{
              color: '#FFF',
              fontWeight: '600',
              fontSize: 13,
              marginLeft: 5,
            }}>
            {item?.comments?.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            SharePost(item?.text, item.id);
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={Theme.share}
            style={{height: 20, width: 20, resizeMode: 'contain'}}
          />
          <Text
            style={{
              color: '#FFF',
              fontWeight: '600',
              fontSize: 13,
              marginLeft: 5,
            }}>
            {item.share?.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => saveYourPost()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={Theme.bookmark}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <Text
            style={{
              color: '#FFF',
              fontWeight: '600',
              fontSize: 13,
              marginLeft: 5,
            }}>
            {item?.saved?.length}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default PostCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  upperWrapper: {
    flexDirection: 'row',
  },
  title: {
    color: Theme.primaryColor,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  desig: {
    marginTop: 3,
    color: Theme.textLightColor,
    fontSize: 12,
  },
  hrs: {
    marginTop: 3,
    color: Theme.textLightColor,
    fontSize: 10,
    marginLeft: 10,
    opacity: 0.5,
    marginBottom: 2,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#2F2F2F',
    opacity: 0.6,
    marginVertical: 10,
  },
  desc: {
    color: '#FFF',
    fontWeight: '500',
    letterSpacing: 0.15,
    textAlign: 'justify',
    lineHeight: 17,
  },
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: '100%',
    height: 170,
    marginTop: 15,
    borderRadius: 10,
  },
  dots: {
    top: 25,
    position: 'absolute',
    right: 15,
  },
});
