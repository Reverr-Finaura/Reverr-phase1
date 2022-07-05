import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {AppColors, smallString} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import {ArticalLoader} from '../../../Components';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const ArticleList = props => {
  const [articalData, setArticalData] = useState();
  const [loading, setLoading] = useState(false);
  async function getArticles() {
    setLoading(true);
    const snapshot = await firestore()
      .collection('Blogs')
      .get()
      .then(res => {
        setArticalData(res.docs.map(doc => doc.data()));
        setLoading(false);
      });
  }

  const navigation = useNavigation();

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <View style={styles.screen}>
      {loading ? (
        <ArticalLoader />
      ) : (
        <View style={styles.ListContainer}>
          <View style={{marginTop: '2%'}}>
            <FlatList
              data={articalData}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ArticalDetails', {
                      articalData: item,
                    });
                  }}>
                  <View style={styles.line}></View>
                  <View style={styles.title}>
                    <Text style={styles.text}>{item.heading}</Text>
                    <TouchableOpacity
                      onPress={() => saveArticle(item)}
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Ionic
                        name="heart"
                        size={20}
                        color="gray"
                        /*   color={
                            state.savedArticles.includes(item.id) ? 'red' : 'grey'
                          } */
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.description}>
                    <Text style={styles.desc}>
                      {smallString(item.body, 100)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    height: Height > 684 ? Height / 1.32 : Height / 1.41,
  },
  ListContainer: {
    paddingHorizontal: 20,
    marginTop: Height > 684 ? 20 : 10,

    width: '100%',
    height: Height > 684 ? '100%' : '100%',
  },
  line: {
    backgroundColor: AppColors.infoFonts,
    width: '100%',
    height: 1,
  },
  title: {
    paddingTop: Height > 684 ? 20 : 7,
    paddingStart: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Bold',
  },
  description: {
    paddingBottom: 20,
    paddingStart: 5,
  },
  desc: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
  },
});

export {ArticleList};
