import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {AppColors, smallString} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import {ArticalLoader} from '../../../Components';
import { useSelector,useDispatch } from 'react-redux';
import { RemoveArticle,SaveArticle } from '../../../Redux/actions';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const ArticleList = props => {
  const state=useSelector(state=>state.UserReducer);
  const dispatch=useDispatch();
  const [articalData, setArticalData] = useState();
  const [loading, setLoading] = useState(false);
  //console.log(state.user.savedArticles);
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

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const removeArticleFromSaves=async(item)=>{
    var bucket=[];
    for(var i=0;i<state.user.savedArticles.length;i++){
      if(item.id!=state.user.savedArticles[i]){
        bucket.push(state.user.savedArticles[i]);
      }
    }
    //console.log("bucket:"+bucket);
    dispatch(RemoveArticle(item.id));
    await firestore().collection('Users').doc(state.user.email).update({
      savedArticles:bucket
    }).then(()=>{
      showToast('Article Removed Successfully!')
    }).catch(err=>{
      showToast('Problem in removing Article!')
    })
  }

  const saveArticle=async(item)=>{
    //console.log(item);
    dispatch(SaveArticle(item.id)) 
    await firestore().collection('Users').doc(state.user.email).update({
      savedArticles:[...state.user.savedArticles,item.id]
    }).then(()=>{
      showToast('Article saved Successfully!')
    }).catch(err=>{
      showToast('Problem in saving Article!')
    })
  }

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
                      onPress={() =>{
                        if(state.user.savedArticles.includes(item.id)){
                          removeArticleFromSaves(item); 
                        }else{
                          saveArticle(item)
                        }
                      }
                    }
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Ionic
                        name="heart"
                        size={20}
                        // color="gray"
                           color={
                            state.user.savedArticles.includes(item.id) ? 'red' : 'gray'
                          }
                          
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
