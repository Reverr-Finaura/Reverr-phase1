import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../utils/Theme';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {NewsLoader} from '../loaders';
import {smallString} from '../../utils';
import { getTimeAgo, timeAgo } from '../../utils/Helper/helper';
import { formatTimeAgo } from '../../utils/Helper/helper';

const windowWidth = Dimensions.get('window').width;

const NewsCard = () => {
  const [newsData, setNewsData] = useState();
  const [clmn, setClmn] = useState(3);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const options = {
    method: 'GET',
    url: 'https://api.bing.microsoft.com/v7.0/news/search',
    params: {q: 'startup', safeSearch: 'Off', textFormat: 'Raw'},
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'bd03e8f8f29b46479ee4c2004280308f',
    },
  };

  async function getNews() {
    setLoading(true);
    try {
      await axios.request(options).then(res => {
        //console.log(res.data, 'hdhsdjh');
        setNewsData(res.data.value);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getNews();
   // console.log(newsData, 'newsData');
  }, []);
  return (
    <View style={styles.screen}>
      {loading ? (
        <NewsLoader />
      ) : (
        <View
          style={{
            paddingTop: '5%',
          }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={newsData}
            keyExtractor={item => item.datePublished}
            renderItem={({item}) => {

            
              if (item.image) {
                return (
                  <TouchableOpacity style={styles.container}>
                    <TouchableOpacity
                      style={styles.dots}
                      hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}>
                      <Image
                        source={Theme.threedots}
                        style={{height: 13, width: 13, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <ImageBackground
                      style={styles.img}
                      source={{uri: item.image.thumbnail.contentUrl}}>
                      <LinearGradient
                        colors={['rgba(5,5,5,0.1)', 'rgba(5,5,5,0.5)']}
                        style={styles.textwrapper}>
                        <Text numberOfLines={2} style={styles.newstitle}>
                          {smallString(item.name, 60)}
                        </Text>
                        <Text numberOfLines={1} style={styles.ago}>
                        {getTimeAgo(new Date(item?.datePublished).getTime() / 1000)}
                        </Text>
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }
            }}
            
          />
        </View>
      )}
    </View>
  );
};
export default NewsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1C',
    minWidth: 190,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 20,
  },
  img: {
    width: '100%',
    height: 160,
  },
  textwrapper: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingLeft: 15,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingRight: 10,
  },
  newstitle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  ago: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.6,
    marginTop: 5,
  },
  dots: {
    top: 15,
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
});
