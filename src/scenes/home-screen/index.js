import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomMenuBar,
  HomeCard,
  IndividualHeaderLayout,
  SkeltonLoader,
} from '../../Components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {mentorService} from '../../Redux/services/mentor.service';
import {load_room_data, set_allLoaded} from '../../Redux/actions';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../../utils';
import {ArticleList} from '../artical-screen';
import {NewsList} from '../news-screen';
import PostCard from '../../Components/postCard';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const Home = () => {
  const state = useSelector(state => state.UserReducer);
  const loader = useSelector(state => state.UserReducer);
  const [articles, setArticles] = useState(false);
  const [discussion, setDiscussion] = useState(true);
  const [news, setNews] = useState(false);
  const [_id, set_Id] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mentorService);
    if (state.lastDocument == undefined) {
      dispatch(set_allLoaded(false));
      dispatch(load_room_data(undefined));
    } else {
      dispatch(load_room_data(state.lastDocument));
    }
  }, []);
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to close App?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

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
                <PostCard postData={state.Rooms} />
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
