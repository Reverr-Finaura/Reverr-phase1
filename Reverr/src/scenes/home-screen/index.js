import {View, Text, Dimensions, ScrollView, Image} from 'react-native';
import React, {useState, Suspense} from 'react';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {HomeCard, IndividualHeaderLayout, TabMenu} from '../../components';
import {ArticalLoader} from '../../Components/ArticalLoader';
import {ArticleList} from '../artical-screen';
import {NewsList} from '../news-screen';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Home = () => {
  const state = useSelector(state => state.UserReducer);
  const [articals, setArticals] = useState(true);
  const [news, setNews] = useState(false);

  /*   const ArticalList = React.lazy(() =>
    import('../artical-screen/articalList/index'),
  ); */
  return (
    <IndividualHeaderLayout>
      <ScrollView>
        <View style={styles.wlcmConatiner}>
          <View>
            <Text style={styles.welcmTxt}>Hi, {state.user.name}</Text>
            <Text style={styles.subText}>
              Today is a good day to learn something new !
            </Text>
          </View>
          <View style={styles.vectorContainer}>
            <Image
              style={styles.vector}
              source={require('../../assets/images/HomeVector.png')}
            />
          </View>
        </View>
        <HomeCard />
        <View style={styles.menu}>
          <TabMenu
            news={news}
            article={articals}
            onPressNews={() => {
              setNews(true);
              setArticals(false);
            }}
            onPressArticle={() => {
              setArticals(true);
              setNews(false);
            }}
          />
          {articals ? (
            /*  <Suspense fallback={<ArticalLoader />}>
              <ArticalList />
            </Suspense> */
            <ArticleList />
          ) : (
            <NewsList />
          )}
        </View>
      </ScrollView>
    </IndividualHeaderLayout>
  );
};

export {Home};
