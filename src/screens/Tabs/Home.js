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
import {load_room_data, set_allLoaded} from '../../Redux/actions';
import {SkeltonLoader} from '../../Components';

const Height = Dimensions.get('window').height;

function Home() {
  const state = useSelector(state => state.UserReducer);
  const loader = useSelector(state => state.UserReducer);
  const [articles, setArticles] = useState(false);
  const [discussion, setDiscussion] = useState(true);
  const [news, setNews] = useState(false);
  const [_id, set_Id] = useState('');
  const navigation = useNavigation();
  const [menu, setMenu] = useState('All');
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const dispatch = useDispatch();

  const menuItems = ['All', 'Rooms', 'Articals'];

  useEffect(() => {
    dispatch(mentorService);
    if (state.lastDocument == undefined) {
      dispatch(set_allLoaded(false));
      dispatch(load_room_data(undefined));
    } else {
      dispatch(load_room_data(state.lastDocument));
    }
  }, []);
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to close App?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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
            Hello,{' '}
            <Text
              style={{color: Theme.primaryColor, textTransform: 'capitalize'}}>
              {state.user.name}
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => setIsOpenMenu(!isOpenMenu)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: '6%',
              width:80
            }}>
            <Text style={styles.subtitle}>Featured</Text>
            <Image
              source={Theme.dropdown}
              style={{height: 8, width: 8, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          {isOpenMenu && (
            <View
              style={{
                backgroundColor: 'white',
                zIndex: 20,
                position: 'absolute',
                top: '12%',
                height:100,
                paddingTop:'5%',
                paddingLeft:'8%'
                
              }}>
              {menuItems.map((item, index) => (
                <TouchableOpacity onPress={()=>{
                  setMenu(item)
                  setIsOpenMenu(false)
                }} key={index} style={{paddingHorizontal: '5%',paddingVertical:'5%'}}>
                  <Text style={{color:menu===item?Theme.primaryColor:Theme.backgroundColor,fontWeight:'bold'}}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingBottom: '30%'}}>
            <View>
              {state.Rooms.length == 0 ? (
                <SkeltonLoader />
              ) : (
                <>
                  {state.Rooms?.map((item, index) => (
                    <View key={index}>
                      <PostCard item={item} />
                    </View>
                  ))}
                </>
              )}
            </View>
            <View style={styles.wrapper}>
              <Text style={[styles.title, {fontSize: 18, fontWeight: 'bold'}]}>
                Trending News
              </Text>
              <BlueButtonRounded label={'Read More'} />
            </View>

            <NewsCard />

            <View style={{paddingBottom: '30%'}}>
              <ArticleCard />
            </View>
          </ScrollView>

          {/* <PostCard hasArt={true} /> */}
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('createpost')}>
        <Image source={Theme.addbtn} style={styles.corner} />
      </TouchableOpacity>
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
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});