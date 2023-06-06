import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  BackHandler,
  Dimensions,
  RefreshControlComponent,
  RefreshControl,
  Spinner,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ArticleCard from '../../Components/components/ArticleCard';
import BlueButtonRounded from '../../Components/components/BlueButtonRounded';
import GradientHeader from '../../Components/components/GradientHeader';
import NewsCard from '../../Components/components/NewsCard';
import PostCard from '../../Components/components/PostCard';
import {
  fetchInitialData,
  fetchMoreData,
  getPost,
} from '../../utils/FirebaseFunctionality';
import {newsData} from '../../utils/sampledata';
import Theme from '../../utils/Theme';
import firestore from '@react-native-firebase/firestore';
import {getRoomData} from '../../Redux/appSlice';
import {useNavigation} from '@react-navigation/native';
import {mentorService} from '../../Redux/services/mentor.service';
import {
  load_room_data,
  refresh_rooms_list,
  set_allLoaded,
} from '../../Redux/actions';
import {SkeltonLoader} from '../../Components';
import {ShortSkeltonLoader} from '../../Components/ShortSkeletonLoader';
import {NewsList} from '../../scenes/news-screen';
import {AppColors, smallString} from '../../utils';
import axios from 'axios';

const Height = Dimensions.get('window').height;

function Home() {
  const state = useSelector(state => state.UserReducer);
  const loader = useSelector(state => state.UserReducer);
  const [articles, setArticles] = useState(false);
  const [discussion, setDiscussion] = useState(true);
  const [news, setNews] = useState(false);
  const [_id, set_Id] = useState('');
  const navigation = useNavigation();
  const [menu, setMenu] = useState('Featured');
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [refreshRoom, setRefreshRoom] = useState(false);
  const [lastPost, setLastPost] = useState(false);
  const [allData, setAllData] = useState([]);
  const [articalData, setArticalData] = useState();
  const [articalLoader, setArticalLoader] = useState(false);
  const dispatch = useDispatch();

  const [allPosts, setAllPosts] = useState([]);

  const menuItems = ['Featured', 'Discussion', 'News', 'Articles'];
  const [newsData, setNewsData] = useState();
  const [newsLoading, setNewsLoading] = useState(false);
  const options = {
    method: 'GET',
    url: 'https://api.bing.microsoft.com/v7.0/news/search',
    params: {q: 'startup', safeSearch: 'Off', textFormat: 'Raw'},
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'bd03e8f8f29b46479ee4c2004280308f',
    },
  };

  const getAllPost = async () => {
    await firestore()
      .collection('Posts')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let post = [];
        querySnapshot.forEach(documentSnapshot => {
          post.push(documentSnapshot.data());
        });
        setAllPosts(post);

        console.log(allPosts.length, 'Featured');
      });
  };

  async function getNews() {
    setNewsLoading(true);
    try {
      await axios.request(options).then(res => {
        // console.log(res.data.value, 'sdhjshdjs');
        setNewsData(res.data.value);
        setNewsLoading(false);
      });
    } catch (err) {
      console.log(err, 'news error');
      setNewsLoading(false);
    }
  }
  async function getArticles() {
    setArticalLoader(true);
    const snapshot = await firestore()
      .collection('Blogs')
      .get()
      .then(res => {
        setArticalData(res.docs.map(doc => doc.data()));
        setArticalLoader(false);
      })
      .catch(error => {
        setArticalLoader(false);
        console.log(error, 'error');
      });
  }
  useEffect(() => {
    getNews();
    getArticles();
    getAllPost();
    //console.log(allPosts, 'posts');
  }, []);

  useEffect(() => {
    dispatch(mentorService);
    if (state.lastDocument == undefined) {
      dispatch(set_allLoaded(false));
      dispatch(load_room_data(undefined));
    } else {
      dispatch(load_room_data(state.lastDocument, setLastPost));
    }
  }, []);

  const _handleLoadMore = () => {
    // console.log('on end reached dispatched');
    dispatch(load_room_data(state?.lastDocument || undefined, setLastPost));
  };

  const handleRefresh = () => {
    setLastPost(false);
    dispatch(set_allLoaded(false));
    dispatch(load_room_data(undefined, setLastPost));
  };

  // console.log(state?.Rooms, 'Rooms');

  const [postType, setPostType] = useState();
  const [newsType, setNewsType] = useState();
  const [articalType, setArticalType] = useState();

  const generateAllData = () => {
    let posttype = state?.Rooms?.map(obj => ({...obj, type: 'post'}));
    let newstype = newsData?.map(obj => ({...obj, type: 'news'}));
    let articaltype = articalData?.map(obj => ({...obj, type: 'artical'}));
    if (posttype && newstype && articaltype) {
      let b = posttype.splice(4);
      let t = newstype.splice(2);
      let t2 = articaltype.splice(1);
      // let p = posttype.splice(8);
      setAllData([...posttype, ...newstype, ...articaltype]);
    }

    // console.log(posttype.length, 'length');
    setNewsType(newstype);
    setPostType(posttype);
    setArticalType(articaltype);
  };

  useEffect(() => {
    generateAllData();
    return () => {
      // console.log('clean');
    };
  }, [state?.Rooms]);

  // console.log(
  //   allData.map(r => r.type === 'news' && r),
  //   'lehdhh',
  // );

  const loadMore = () => {
    const all = [...allData];
    dispatch(load_room_data(state?.lastDocument || undefined, setLastPost));
    const h = [...state?.Rooms];
    const post = h.slice(postType.length);
    const newPost = post?.map(obj => ({...obj, type: 'post'}));
    newPost.splice(4);
    const n = newsData.slice(newsType.length);
    const newNews = n?.map(obj => ({...obj, type: 'news'}));
    newNews.splice(2);
    const ar = articalData?.slice(articalType.length);
    const newArticals = ar?.map(obj => ({...obj, type: 'artical'}));
    newArticals.splice(1);
    setAllData([...all, ...newPost, ...newNews, ...newArticals]);
    setPostType(newPost);
    setNewsType(newNews);
    setArticalType(newArticals);
  };

  //console.log(state?.Rooms.length, 'ooo');

  return (
    <View style={{flex: 1}}>
      <GradientHeader />
      <View
        style={{
          flex: 1,
          backgroundColor: Theme.backgroundColor,
          paddingHorizontal: 25,
          paddingTop: 25,
        }}>
        <View>
          <Text style={styles.title}>
            Hello
            <Text
              style={{color: Theme.primaryColor, textTransform: 'capitalize'}}>
              {state? ' ' + state.user.name.trim().split(" ")[0]:null}
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => setIsOpenMenu(!isOpenMenu)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: '6%',
              width: 80,
            }}>
            <Text style={styles.subtitle}>{menu}</Text>
            <Image
              source={Theme.dropdown}
              style={{height: 8, width: 8, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          {isOpenMenu && (
            <View
              style={{
                backgroundColor: '#1C1C1C',
                borderRadius: 10,
                elevation: 0.6,
                zIndex: 20,
                position: 'absolute',
                borderWidth: 1,
                borderColor: AppColors.CardColor,
                top: '13%',
                height: 140,
                paddingTop: '5%',
                paddingLeft: '8%',
              }}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setMenu(item);
                    setIsOpenMenu(false);
                  }}
                  key={index}
                  style={{paddingHorizontal: '5%', paddingVertical: '5%'}}>
                  <Text
                    style={{
                      color:
                        menu === item
                          ? Theme.primaryColor
                          : AppColors.FontsColor,
                      fontWeight: 'bold',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={{height: '84%'}}>
            {menu === 'Featured' && (
              <View>
                {allData.length === 0 ? (
                  <SkeltonLoader />
                ) : (
                  <FlatList
                    data={allData}
                    refreshing={state.refreshing}
                    onRefresh={handleRefresh}
                    onEndReached={() => {
                      let check = allData.filter(r => r.type === 'post');
                      // console.log(check.length, 'check');
                      // console.log(state?.Rooms?.length, 'room');
                      // console.log(check.length != state?.Rooms?.length);
                      if (check.length != state?.Rooms?.length) {
                        console.log(check.length, 'reached');
                        loadMore();
                      } else {
                        ToastAndroid.showWithGravity(
                          'No More Post avilable',
                          ToastAndroid.LONG,
                          ToastAndroid.CENTER,
                        );
                      }
                    }}
                    renderItem={({item, index}) => (
                      <View>
                        {item.type === 'post' && (
                          <PostCard item={item} index={index} />
                        )}
                        {item.type === 'news' && (
                          <TouchableOpacity
                            style={{
                              marginTop: '7%',
                              flexDirection: 'row',
                              borderWidth: 1,
                              borderColor: AppColors.CardColor,
                              borderRadius: 10,
                            }}
                            onPress={() => {
                              navigation.navigate('NewsDetails', {
                                articalData: item,
                              });
                            }}>
                            <Image
                              style={{
                                height: 100,
                                width: '30%',
                                borderRadius: 10,
                              }}
                              source={{uri: item.image.thumbnail.contentUrl}}
                            />
                            <View
                              style={{
                                marginHorizontal: '4%',
                                marginTop: '2%',
                                width: '90%',
                                overflow: 'hidden',
                              }}>
                              <Text style={styles2.title}>
                                {' '}
                                {item.category}
                              </Text>
                              <Text
                                style={{
                                  color: AppColors.FontsColor,
                                  fontFamily: 'Poppins-Regular',
                                  textAlign: 'justify',
                                  marginTop: '2%',
                                  width: '70%',
                                }}>
                                {item.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                        {item.type === 'artical' && (
                          <TouchableOpacity
                            onPress={() => {
                              console.log('artdkh');
                              navigation.navigate('ArticalDetails', {
                                articalData: item,
                              });
                            }}
                            key={index}
                            style={styles2.container}>
                            <View style={{width: '23%'}}>
                              <Image
                                source={{uri: item?.image?.imageUrl}}
                                style={styles2.img}
                              />
                            </View>

                            <View
                              style={{
                                paddingLeft: 10,
                                width: '80%',
                                justifyContent: 'space-evenly',
                              }}>
                              <Text style={styles2.title}> {item.heading}</Text>
                              <View style={styles2.line} />
                              <Text numberOfLines={2} style={styles2.desc}>
                                {smallString(item.body, 100)}
                              </Text>
                            </View>

                            {/* <View style={styles.corner}>
                        <Image source={Theme.triangle} style={styles.triangle} />
                        <Text style={styles.number}>169</Text>
                      </View> */}
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  />
                )}
              </View>
            )}
            {menu === 'Discussion' && (
              <View style={{height: Height / 1.5, paddingBottom: '2%'}}>
                {state.Rooms.length === 0 ? (
                  <SkeltonLoader />
                ) : (
                  <View style={{paddingBottom: '3%'}}>
                    <FlatList
                      data={state?.Rooms}
                      onEndReached={_handleLoadMore}
                      onEndReachedThreshold={0.1}
                      scrollEventThrottle={150}
                      ListFooterComponent={() =>
                        !lastPost ? <ShortSkeltonLoader /> : null
                      }
                      refreshing={state.refreshing}
                      onRefresh={handleRefresh}
                      renderItem={({item, index}) => (
                        <View key={index}>
                          <PostCard item={item} />
                        </View>
                      )}
                      keyExtractor={(item, index) => index}
                    />
                    <View style={{height: 120}} />
                  </View>
                )}
              </View>
            )}
            {menu === 'News' && (
              <View style={{flex: 1, paddingBottom: '7%'}}>
                {/* <NewsCard /> */}
                <Text
                  style={[styles.title, {fontSize: 18, fontWeight: 'bold'}]}>
                  Trending News
                </Text>
                <View style={{height: Height / 1.64}}>
                  <NewsList newsData={newsData} loading={newsLoading} />
                </View>
              </View>
            )}
            {menu === 'Articles' && (
              <View style={{paddingBottom: '25%'}}>
                <ArticleCard
                  articalData={articalData}
                  loading={articalLoader}
                />
              </View>
            )}
          </View>

          {/* <PostCard hasArt={true} /> */}
        </View>
      </View>
      {(menu === 'Discussion' || menu ==="Featured") && (
        <TouchableOpacity onPress={() => navigation.navigate('createpost')}>
          <Image source={Theme.addbtn} style={styles.corner} />
        </TouchableOpacity>
      )}
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFF',
    marginRight: 5,
    fontWeight: 'bold',
  },
  corner: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    borderRadius: 100,
    position: 'absolute',
    right: 15,
    bottom: 5,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ntitle: {
    backgroundColor: AppColors.primarycolor,
    width: '100%',
    height: '40%',
    paddingVertical: 5,
    alignItems: 'center',
    textAlign: 'center',
    elevation: 0.6,
  },
  // heading: {
  //   color: AppColors.FontsColor,
  //   fontFamily: 'Poppins-Regular',
  //   paddingStart: 22,
  //   paddingTop: 5,
  //   fontSize: 16,
  // },
  // news: {
  //   color: 'white',
  //   fontFamily: 'Poppins-Regular',
  //   fontSize: 18,
  //   marginStart: '5%',
  //   marginTop: '3%',
  // },
  // NewsContainer: {
  //   width: '48%',
  //   height: 200,
  //   borderRadius: 10,
  //   overflow: 'hidden',
  //   marginHorizontal: 5,
  //   marginVertical: 5,
  //   borderWidth: 1,
  //   borderColor: AppColors.infoFonts,
  // },
  // title: {
  //   backgroundColor: AppColors.primarycolor,
  //   width: '100%',
  //   height: '40%',
  //   paddingVertical: 5,
  //   alignItems: 'center',
  //   textAlign: 'center',
  //   elevation: 0.6,
  // },
});

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1C',
    marginVertical: '6%',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 10,
  },
  img: {
    height: 80,
    width: '100%',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
  desc: {
    fontWeight: '500',
    paddingRight: '4%',
    fontSize: 13,
    color: '#fff',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#2F2F2F',
    opacity: 0.6,
    marginVertical: 5,
  },
  triangle: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
  },
  number: {
    color: '#FFF',
    fontSize: 12,
  },
  corner: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#2F2F2F',
    marginLeft: 10,
  },
});