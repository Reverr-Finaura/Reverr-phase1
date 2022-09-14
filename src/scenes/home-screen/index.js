import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomMenuBar,
  CustomPopup,
  HomeCard,
  IndividualHeaderLayout,
  SkeltonLoader,
} from '../../Components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {mentorService} from '../../Redux/services/mentor.service';
import {
  load_room_data,
  refresh_rooms_list,
  set_allLoaded,
  like_post,
  pin_post,
  deletePost,
} from '../../Redux/actions';
import {useNavigation} from '@react-navigation/native';
import {AppColors, smallString} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {styles2} from '../Room/styles';
import {ArticleList} from '../artical-screen';
import {NewsList} from '../news-screen';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const Home = () => {
  const state = useSelector(state => state.UserReducer);
  const loader = useSelector(state => state.UserReducer);
  const [articles, setArticles] = useState(false);
  const [discussion, setDiscussion] = useState(true);
  const [news, setNews] = useState(false);
  const [popup, setPopup] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [seemoreId, setSeemoreId] = useState();
  const [_id, set_Id] = useState('');
  const [owner, setOwner] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
                navigation.navigate('IndividualProfile');
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
              <Icon2
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
        <View style={styles2.postContainer}>
          {item.image !== '' && item.image !== undefined ? (
            <View>
              {item.text !== '' ? (
                <View>
                  {seeMore ? (
                    item.id == seemoreId && (
                      <View style={[styles2.image, {overflow: 'hidden'}]}>
                        <ImageBackground
                          style={{width: '100%', height: '100%'}}
                          source={{uri: item.image}}>
                          <View style={{paddingHorizontal: '5%'}}>
                            <Text style={styles2.details}>{item.text}</Text>
                            <TouchableOpacity
                              onPress={() => {
                                setSeeMore(false);
                              }}>
                              <Text style={styles2.company}>Hide</Text>
                            </TouchableOpacity>
                          </View>
                        </ImageBackground>
                      </View>
                    )
                  ) : (
                    <View>
                      <Image style={styles2.image} source={{uri: item.image}} />
                      <View>
                        <Text style={styles2.details}>
                          {smallString(item.text, 100)}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setSeemoreId(item.id);
                            setSeeMore(true);
                          }}>
                          <Text style={styles2.company}>See More</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ) : (
                <Image style={styles2.image} source={{uri: item.image}} />
              )}
            </View>
          ) : (
            <View>
              <Text style={styles2.details}>{item.text}</Text>
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
                // navigation.navigate('comments', {
                //   postData: item,
                // });
                navigation.navigate('comments');
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
  const [postloader, setPostloader] = useState(false);

  useEffect(() => {
    dispatch(mentorService);
    if (state.lastDocument == undefined) {
      dispatch(set_allLoaded(false));
      dispatch(load_room_data(undefined));
    } else {
      setPostloader(true);
      dispatch(load_room_data(state.lastDocument));
      setPostloader(false);
    }
  }, []);

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
  // console.log(state.user, 'postaloader');
  console.log(state.loading, 'loader');
  return (
    <IndividualHeaderLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: '5%',
            marginVertical: '2%',
          }}>
          <Text style={styles.welcmTxt}>Hey </Text>
          <Text style={[styles.welcmTxt, {color: AppColors.ActiveColor}]}>
            {state.user.name}
          </Text>
        </View>
        <HomeCard />
        <View style={{}}>
          <CustomMenuBar
            Item1="Articles"
            Item2="Discussion"
            Item3="News"
            active1={articles}
            active2={discussion}
            active3={news}
            ClickOnItem1={() => {
              setArticles(true);
              setDiscussion(false);
              setNews(false);
            }}
            ClickOnItem2={() => {
              setDiscussion(true);
              setArticles(false);
              setNews(false);
            }}
            ClickOnItem3={() => {
              setNews(true);
              setDiscussion(false);
              setArticles(false);
            }}
          />
          {discussion && (
            <View>
              {state.Rooms.length == 0 ? (
                <SkeltonLoader />
              ) : (
                <View style={{width: '100%', marginBottom: '3%'}}>
                  {state.Rooms.length > 0 && (
                    <FlatList
                      data={state.Rooms}
                      keyExtractor={item => item.id}
                      renderItem={renderCard}
                      onEndReached={_handleLoadMore}
                      onEndReachedThreshold={1}
                      refreshing={state.refreshing}
                      onRefresh={handleRefresh}
                    />
                  )}
                </View>
              )}
            </View>
          )}
          {articles && (
            <View>
              <ArticleList />
            </View>
          )}
          {news && (
            <View>
              <NewsList />
            </View>
          )}
        </View>
      </ScrollView>
      {discussion && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('CreatePost')}
          style={{
            position: 'absolute',
            backgroundColor: AppColors.ActiveColor,
            borderRadius: 50,
            right: 0,
            bottom: 20,
            padding: 10,
            paddingHorizontal: 13,
          }}>
          <Icon name="plus" size={30} color={AppColors.FontsColor} />
        </TouchableOpacity>
      )}
    </IndividualHeaderLayout>
  );
};
/* const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
}); */
export {Home};
