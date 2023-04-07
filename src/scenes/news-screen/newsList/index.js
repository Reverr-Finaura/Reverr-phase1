import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState, useRef, useContext} from 'react';
import {AppColors, smallString} from '../../../utils';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {NewsLoader} from '../../../Components';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const NewsList = () => {
  const [newsData, setNewsData] = useState();
  const [clmn, setClmn] = useState(2);
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
        setNewsData(res.data.value);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getNews();
    console.log(newsData?.length, 'newsData');
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
            data={newsData}
            numColumns={clmn}
            renderItem={({item}) => {
              if (item.image) {
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.NewsContainer}
                    onPress={() => {
                      navigation.navigate('NewsDetails', {
                        articalData: item,
                      });
                    }}>
                    <ImageBackground
                      style={{flex: 1}}
                      source={{uri: item.image.thumbnail.contentUrl}}>
                      <View style={styles.title}>
                        <Text
                          style={{
                            color: AppColors.FontsColor,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {smallString(item.name, 30)}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }
            }}
          />
          <View style={{height: 150}} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  heading: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    paddingStart: 22,
    paddingTop: 5,
    fontSize: 16,
  },
  news: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    marginStart: '5%',
    marginTop: '3%',
  },
  NewsContainer: {
    width: '48%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  title: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '40%',
    paddingVertical: 5,
    alignItems: 'center',
    top: Height > 684 ? 135 : 130,
  },
});
export {NewsList};
