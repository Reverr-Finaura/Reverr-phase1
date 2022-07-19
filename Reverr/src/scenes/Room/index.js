import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../../utils';
import {BackButton, CustomPopup} from '../../Components';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {CustomMenuBar} from '../../Components';
import {CreatePostButton} from '../../Components';
import {smallString} from '../../utils';
import firestore from '@react-native-firebase/firestore';
//import App, {SavedPostContext, UserContext} from '../../App';
//import { CustomPopup } from '../../Components';
import storage from '@react-native-firebase/storage';
import {SkeltonLoader} from '../../Components';
import {SavePost, RemovePost} from '../../utils/FirebaseFunctionality';
import {useDispatch, useSelector} from 'react-redux';
import {
  load_room_data,
  refresh_rooms_list,
  set_allLoaded,
  like_post,
  pin_post,
  deletePost,
} from '../../Redux/actions';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const Rooms = () => {
  //const userType=props?.route?.params?.userType || 'Individual';
  const [_id,set_Id]=useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [features, setFeatures] = useState(true);
  const [subs, setSubs] = useState(false);
  const [message, setMessage] = useState();
  const navigation = useNavigation();
  //const {state, dispatch} = useContext(UserContext);
  var state = useSelector(state => state.UserReducer);

  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [seemoreId, setSeemoreId] = useState();
  const [id, setId] = useState();
  const [owner, setOwner] = useState(false);


  const handleDelete=post=>{
    dispatch(deletePost(post,post.id)); 
  }

  useEffect(() => {
    if (state.lastDocument == undefined) {
      dispatch(set_allLoaded(false));
      dispatch(load_room_data(undefined));
    } else {
      dispatch(load_room_data(state.lastDocument));
    }
    //setLoading(false);
  }, [dispatch]);

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

  const renderCard = ({item}) => {
    //console.log("Hey!")
    //console.log(item);
    return (
      <LinearGradient
        key={item.id}
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: -3, y: 1.3}}
        end={{x: 3, y: 0.5}}
        style={styles.postCard}>
        <View style={styles.creatorDetails}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.dp} source={{uri: item.postedby.image}} />
            <View style={{marginStart: '3%'}}>
              <Text style={styles.name}>{item.postedby.name}</Text>
              <Text style={styles.company}>{item.postedby.designation}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={()=>{
            setPopup(true);
            set_Id(item.id);
            setOwner(state.user.email==item.postedby.email?true:false);
            
            }}>
            <Icon2
              name="ellipsis-vertical"
              size={22}
              color={AppColors.FontsColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.postContainer}>
          {item.image !== '' && item.image !== undefined ? (
            <View>
              {item.text !== '' ? (
                <View>
                  {seeMore ? (
                    item.id == seemoreId && (
                      <View style={[styles.image, {overflow: 'hidden'}]}>
                        <ImageBackground
                          style={{width: '100%', height: '100%'}}
                          source={{uri: item.image}}>
                          <View style={{paddingHorizontal: '5%'}}>
                            <Text style={styles.details}>{item.text}</Text>
                            <TouchableOpacity
                              onPress={() => {
                                setSeeMore(false);
                              }}>
                              <Text style={styles.company}>Hide</Text>
                            </TouchableOpacity>
                          </View>
                        </ImageBackground>
                      </View>
                    )
                  ) : (
                    <View>
                      <Image style={styles.image} source={{uri: item.image}} />
                      <View>
                        <Text style={styles.details}>
                          {smallString(item.text, 100)}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setSeemoreId(item.id);
                            setSeeMore(true);
                          }}>
                          <Text style={styles.company}>See More</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ) : (
                <Image style={styles.image} source={{uri: item.image}} />
              )}
            </View>
          ) : (
            <View>
              <Text style={styles.details}>{item.text}</Text>
            </View>
          )}
        </View>
        <View style={styles.IconContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => likePost(item.id, item)}>
              <Icon2
                name="heart"
                color={
                  item.likes.includes(state.user.email)
                    ? 'red'
                    : AppColors.FontsColor
                }
                size={22}
              />
            </TouchableOpacity>
            <Text style={[styles.name, {marginStart: '8%'}]}>
              {item.likes.length}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                dispatch(pin_post(item));
                // navigation.navigate('comments', {
                //   postData: item,
                // });
                navigation.navigate('comments');
              }}>
              <Icon name="comment" size={22} color={AppColors.FontsColor} />
            </TouchableOpacity>
            <Text style={[styles.name, {marginStart: '8%'}]}>
              {item.comments.length}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('demo');
              }}>
              <Icon
                name="share-square"
                size={22}
                color={AppColors.FontsColor}
              />
            </TouchableOpacity>
            <Text style={[styles.name, {marginStart: '8%'}]}>{item.share}</Text>
          </View>
        </View>

        <CustomPopup
          key={_id}
          // key={item.id}
          visible={popup}
          postId={id}
          id={item.id}
          owner={owner}
          hideModal={() => {
            setPopup(false);
          }}>
          {owner && (
            <View
              style={{
                borderBottomColor: AppColors.FontsColor,
                borderBottomWidth: 2,
                paddingVertical: '4%',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <Text style={{color: AppColors.FontsColor}}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{
              borderBottomColor: AppColors.FontsColor,
              borderBottomWidth: 2,
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
              borderBottomWidth: 2,
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
        </CustomPopup>
      </LinearGradient>
    );
  };

  if (!state.allLoaded) {
    return <SkeltonLoader />;
  } else {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <BackButton
            IconSize={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text
            style={{
              color: AppColors.FontsColor,
              marginStart: Width / 3.5,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 21,
            }}>
            Room
          </Text>
        </View>
        <CustomMenuBar
          Item1="Featured"
          Item2="Discussion"
          active1={features}
          active2={subs}
          ClickOnItem1={() => {
            setFeatures(true);
            setSubs(false);
          }}
          ClickOnItem2={() => {
            setSubs(true);
            setFeatures(false);
          }}
        />
        {state.Rooms.length > 0 && (
          <FlatList
            data={state.Rooms}
            keyExtractor={item => item.id.toString()}
            renderItem={renderCard}
            onEndReached={_handleLoadMore}
            onEndReachedThreshold={1}
            refreshing={state.refreshing}
            onRefresh={handleRefresh}
          />
        )}

        {!features && (
          <CreatePostButton
            style={styles.createBtn}
            onPress={() => {
              navigation.navigate('CreatePost');
            }}
          />
        )}
      </View>
    );
  }
};

export {Rooms};
