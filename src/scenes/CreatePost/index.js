import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Alert,
  Video,
  ToastAndroid,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../../utils';
import {CustomButton} from '../../Components';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {
  AddCameraImage,
  AddCameraVideo,
  AddGalleryImage,
  AddGalleryVideo,
} from '../../utils/FirebaseFunctionality';
//import {UserContext} from '../../App';
import {BottomPopup} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CreatePost = props => {
  //const {state, dispatch} = useContext(UserContext);
  const state = useSelector(state => state.UserReducer);
  const [popup, setPopup] = useState(false);
  const [image, setImage] = useState(false);
  const [video, setVideo] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //const {setPosts, fetchPosts2} = props.route.params;
  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };
  const postData = async post => {
    await firestore()
      .collection('Posts')
      .add(post)
      .then(p => {
        console.log(p);
        //setPosts([]);
        //dispatch(add_post_to_rooms(post));
        //fetchPosts2();
        console.log('Post Added!');

        showToast('Your post has been posted.');
      })
      .catch(error => {
        showToast('Error in posting!.');
      });
  };
  const submitPost = async () => {
    var post = {
      postedby: firestore().collection('Users').doc(state.user.email),
      image: imageUrl,
      comments: [],
      likes: [],
      text,
      createdat: firestore.Timestamp.fromDate(new Date()),
    };
    postData(post);
    navigation.goBack();
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.cross}>
          <Icon name="times" size={18} color={AppColors.FontsColor} />
        </TouchableOpacity>
        <Text
          style={{
            color: AppColors.FontsColor,
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          }}></Text>
        <CustomButton
          Title="Post"
          style={styles.post}
          onPress={() => submitPost()}
        />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.card}>
          <View style={styles.profile}>
            <Image style={styles.dp} source={{uri: state.user.image}} />
            <View style={{justifyContent: 'center', marginStart: '3%'}}>
              <Text style={styles.name}>{state.user.name}</Text>
              <Text style={styles.company}>{state.user.designation}</Text>
            </View>
          </View>
          {imageUrl ? (
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  margin: 20,
                  resizeMode: 'cover',
                }}
                source={{uri: imageUrl}}
              />
            </View>
          ) : null}
          {videoUrl ? (
            <View>
              <Video
                style={{
                  width: 100,
                  height: 100,
                  margin: 20,
                  resizeMode: 'cover',
                }}
                source={{uri: videoUrl}}
              />
            </View>
          ) : null}
          <TextInput
            style={styles.msg}
            multiline={true}
            value={text}
            onChangeText={e => {
              setText(e);
            }}
            placeholder="What do you want to share?"
            numberOfLines={8}
            maxLength={150}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '5%',
              paddingVertical: '5%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setPopup(true);
                setImage(true);
                setVideo(false);
              }}>
              <Icon name="camera" size={27} color={AppColors.FontsColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginStart: '5%'}}
              onPress={() => {
                setPopup(true);
                setVideo(true);
                setImage(false);
              }}>
              <Icon name="video" size={27} color={AppColors.FontsColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomPopup
        visible={popup}
        handleOpen={() => {
          setPopup(true);
        }}
        handleClose={() => {
          setPopup(false);
        }}
        animationConfig={{
          speed: 14,
          bounciness: 4,
        }}
        containerStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
        overlayColor="rgba(0,0,0,0.4)">
        <LinearGradient
          colors={[AppColors.primarycolor, '#012437']}
          start={{x: -0.7, y: 1.3}}
          end={{x: 1, y: 0.5}}
          style={styles.BottomPoupop}>
          <TouchableOpacity
            onPress={() => {
              if (image) {
                AddCameraImage(setImageUrl);
                setPopup(false);
              }
              if (video) {
                AddCameraVideo(setVideoUrl);
                setPopup(false);
              }
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '8%',
              marginTop: '15%',
            }}>
            <Icon name="camera" color={AppColors.FontsColor} size={25} />
            <Text style={[styles.name, {marginStart: '5%'}]}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (image) {
                AddGalleryImage(setImageUrl);
                setPopup(false);
              }
              if (video) {
                AddGalleryVideo(setVideoUrl);
                setPopup(false);
              }
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '8%',
              marginTop: '5%',
            }}>
            <Icon name="camera" color={AppColors.FontsColor} size={25} />
            <Text style={[styles.name, {marginStart: '5%'}]}>
              Select From Gallary
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </BottomPopup>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
  },
  cross: {
    backgroundColor: AppColors.CardColor,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  post: {
    width: 90,
    paddingVertical: '1%',
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '2%',
    paddingTop: '5%',
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: AppColors.CardColor,
  },
  profile: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },
  dp: {
    height: 60,
    width: 60,
  },
  name: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  company: {
    color: AppColors.infoFonts,
    fontFamily: 'Poppins-Regular',
  },
  msg: {
    borderRadius: 4,
    marginHorizontal: '5%',
    color: AppColors.FontsColor,
    fontSize: 20,
    paddingHorizontal: 9,
    fontFamily: 'Poppins-Regular',
    lineHeight: 23,
    textAlignVertical: 'top',
  },
  BottomPoupop: {
    width: '100%',
    height: Height / 4.5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 0,
  },
});
export {CreatePost};
