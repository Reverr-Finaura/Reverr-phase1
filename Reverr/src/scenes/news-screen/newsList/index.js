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

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const NewsList = () => {
  const [newsData, setNewsData] = useState();
  const [clmn, setClmn] = useState(3);
  const navigation = useNavigation();

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
    try {
      const response = await axios.request(options);
      setNewsData(response.data.value);
    } catch (err) {
      console.log(err);
    }
  }
  var count = 5;
  useEffect(() => {
    getNews();
    console.log(newsData, 'newsData');
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.screen}>
      <View>
        <View style={{height: Height > 684 ? Height / 1.3 : Height / 1.35}}>
          <View>
            <Text style={styles.news}>News</Text>
          </View>
          <FlatList
            data={newsData}
            nestedScrollEnabled={true}
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
                          {smallString(item.name, 60)}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
      </View>
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
    width: '47%',
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
