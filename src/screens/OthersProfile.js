import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Theme from '../utils/Theme';
import RegularHeader from '../Components/components/RegularHeader';
import LinearGradient from 'react-native-linear-gradient';
import AboutMeSection from '../Components/components/AboutMeSection';
import LineBar from '../Components/components/LineBar';
import WhyHere from '../Components/components/WhyHere';
import ProfileTitle from '../Components/components/ProfileTitle';
import FindMeOn from '../Components/components/FindMeOn';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../utils';
import {CancelRequest, ConnectToSocial} from '../utils/FirebaseFunctionality';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../Redux/actions';

const OthersProfile = props => {
  const othersData = props.route.params.otherUserData;
  const [connectLoading, setConnectLoading] = useState(false);
  const state = useSelector(state => state.UserReducer);

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [selectedText, setSelectedText] = useState('about');
  const handleTextClick = text => {
    switch (text) {
      case 'posts':
        setSelectedText('posts');
        break;
      case 'about':
        setSelectedText('about');
        break;
    }
  };
  //console.log(othersData.email);
  const connectToNetwork = async () => {
    ConnectToSocial(
      state.user.email,
      othersData?.email,
      setConnectLoading,
    ).then(t => {
      //console.log(t.sendRequests, 'newdata');
      dispatch(setUser(t));
    });
  };

  const removeToNetwork = async () => {
    CancelRequest(state.user.email, othersData?.email, setConnectLoading).then(
      t => {
        //console.log(t.sendRequests, 'newdata');
        dispatch(setUser(t));
      },
    );
  };

  useEffect(() => {}, [dispatch, state]);
  console.log(state.user?.sendRequests, 'userUpdated');
  return (
    <View style={styles.container}>
      <RegularHeader
        leftHandlePress={() => navigation.goBack()}
        title="Profile"
      />
      <ScrollView>
        <View style={styles.wrapper}>
          <LinearGradient
            colors={['#3D85E3', '#79C0F2']}
            style={styles.imgborder}>
            <Image source={{uri: othersData?.image}} style={styles.img} />
          </LinearGradient>
          <View
            style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.usertitle}>{othersData?.name}</Text>
            <Image source={Theme.verify} style={styles.verify} />
          </View>
          <Text style={styles.tag}>{othersData?.designation}</Text>
        </View>
        {connectLoading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '5%',
            }}>
            <ActivityIndicator color={AppColors.FontsColor} />
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '5%',
            }}>
            {state?.user?.sendRequests?.includes(othersData?.email) ? (
              <TouchableOpacity
                onPress={() => removeToNetwork()}
                activeOpacity={0.6}
                style={{
                  backgroundColor: 'red',
                  paddingHorizontal: '4%',
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    color: AppColors.FontsColor,
                  }}>
                  Cancel request
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => connectToNetwork()}
                style={{
                  backgroundColor: AppColors.ActiveColor,
                  paddingHorizontal: '4%',
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: AppColors.FontsColor,
                  }}>
                  Connect +
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[
              styles.activeStyle,
              {
                borderBottomColor:
                  selectedText === 'posts'
                    ? Theme.primaryColor
                    : 'rgba(5,5,5,0)',
              },
            ]}
            onPress={() => handleTextClick('posts')}>
            <Text
              style={[
                styles.text,
                {color: selectedText === 'posts' ? Theme.primaryColor : '#FFF'},
              ]}>
              Posts
            </Text>
          </TouchableOpacity>
          <View style={{width: 35}} />
          <TouchableOpacity
            style={[
              styles.activeStyle,
              {
                borderBottomColor:
                  selectedText === 'about'
                    ? Theme.primaryColor
                    : 'rgba(5,5,5,0)',
              },
            ]}
            onPress={() => handleTextClick('about')}>
            <Text
              style={[
                styles.text,
                {color: selectedText === 'about' ? Theme.primaryColor : '#FFF'},
              ]}>
              About
            </Text>
          </TouchableOpacity>
        </View>
        {selectedText === 'about' ? (
          <View>
            <AboutMeSection
              about={othersData?.about}
              location={othersData?.location}
            />

            <View style={{paddingHorizontal: 20}}>
              <LineBar />
            </View>
            <WhyHere />
            <View style={{paddingHorizontal: 20}}>
              <LineBar />
            </View>
            <ProfileTitle title="Currently" textOne={othersData?.designation} />

            <View style={{paddingHorizontal: 20}}>
              <LineBar />
            </View>

            <ProfileTitle title="Industry" textOne={othersData?.industry} />

            <View style={{paddingHorizontal: 20}}>
              <LineBar />
            </View>

            <ProfileTitle title="Education" array={othersData?.education} />

            <View style={{paddingHorizontal: 20}}>
              <LineBar />
            </View>

            {/* <FindMeOn
              title={'Find Me On:'}
              mob={state?.user?.phone}
              email={state?.user?.email}
              linkdin={state?.user?.linkedinLink}
              twitter={state?.user?.twitterLink}
            /> */}
          </View>
        ) : (
          <View style={{paddingHorizontal: '5%'}}>
            {/* {postData?.map((item, index) => (
              <View key={index}>
                <PostCard item={item} />
              </View>
            ))} */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 2,
  },
  subtitle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tabWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    borderBottomColor: '#7c7c7c',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    paddingTop: 15,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 3,
  },
  activeStyle: {
    borderBottomWidth: 4,
    marginRight: 15,
  },
  img: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  imgborder: {
    height: 158,
    width: 158,
    resizeMode: 'contain',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingTop: '3%',
    alignItems: 'center',
  },
  usertitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    textTransform: 'capitalize',
  },
  verify: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  tag: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default OthersProfile;
