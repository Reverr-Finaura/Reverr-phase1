import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Theme from '../../utils/Theme';
import Ionic from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {smallString} from '../../utils';
import {ArticalLoader} from '../loaders';

function ArticleCard({articalData, loading}) {
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  // const [articalData, setArticalData] = useState();
  // const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  //console.log(state.user.savedArticles);
  // async function getArticles() {
  //   setLoading(true);
  //   const snapshot = await firestore()
  //     .collection('Blogs')
  //     .get()
  //     .then(res => {
  //       setArticalData(res.docs.map(doc => doc.data()));
  //       setLoading(false);
  //     });
  // }

  // useEffect(() => {
  //   getArticles();
  // }, []);

  // const showToast = msg => {
  //   ToastAndroid.show(msg, ToastAndroid.SHORT);
  // };

  // const removeArticleFromSaves = async item => {
  //   var bucket = [];
  //   for (var i = 0; i < state?.user?.savedArticles.length; i++) {
  //     if (item.id != state?.user?.savedArticles[i]) {
  //       bucket.push(state?.user?.savedArticles[i]);
  //     }
  //   }
  //   //console.log("bucket:"+bucket);
  //   dispatch(RemoveArticle(item.id));
  //   await firestore()
  //     .collection('Users')
  //     .doc(state.user.email)
  //     .update({
  //       savedArticles: bucket,
  //     })
  //     .then(() => {
  //       showToast('Article Removed Successfully!');
  //     })
  //     .catch(err => {
  //       showToast('Problem in removing Article!');
  //     });
  // };

  // const saveArticle = async item => {
  //   //console.log(item);
  //   dispatch(SaveArticle(item.id));
  //   await firestore()
  //     .collection('Users')
  //     .doc(state.user.email)
  //     .update({
  //       savedArticles: [...state?.user?.savedArticles, item.id],
  //     })
  //     .then(() => {
  //       showToast('Article saved Successfully!');
  //     })
  //     .catch(err => {
  //       showToast('Problem in saving Article!');
  //     });
  // };

  // console.log(articalData,"articalData");

  return (
    <>
      {loading ? (
        <View style={{}}>
          <ArticalLoader />
        </View>
      ) : (
        <FlatList
          data={articalData}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                console.log('artdkh');
                navigation.navigate('ArticalDetails', {
                  articalData: item,
                });
              }}
              key={index}
              style={styles.container}>
              <View style={{width: '23%'}}>
                <Image
                  source={{uri: item?.image?.imageUrl}}
                  style={styles.img}
                />
              </View>

              <View
                style={{
                  paddingLeft: 10,
                  width: '80%',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={styles.title}> {item.heading}</Text>
                <View style={styles.line} />
                <Text numberOfLines={2} style={styles.desc}>
                  {smallString(item.body, 100)}
                </Text>
              </View>

              {/* <View style={styles.corner}>
              <Image source={Theme.triangle} style={styles.triangle} />
              <Text style={styles.number}>169</Text>
            </View> */}
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
}
export default ArticleCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1C',
    marginTop: 25,
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
