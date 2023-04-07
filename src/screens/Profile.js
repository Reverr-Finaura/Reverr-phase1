import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AboutMeSection from '../Components/components/AboutMeSection';
import FindMeOn from '../Components/components/FindMeOn';
import LineBar from '../Components/components/LineBar';
import ProfileTitle from '../Components/components/ProfileTitle';
import RegularHeader from '../Components/components/RegularHeader';
import WhyHere from '../Components/components/WhyHere';
import Theme from '../utils/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {mentorService} from '../Redux/services/mentor.service';
import {load_room_data, set_allLoaded} from '../Redux/actions';
import PostCard from '../Components/components/PostCard';

function Profile() {
  const state = useSelector(state => state.UserReducer);

  const navigation = useNavigation();

  const [selectedText, setSelectedText] = useState('about');

  const dispatch = useDispatch();

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
  const [postData, setPostData] = useState('');

  useEffect(() => {
    dispatch(mentorService);
    if (state.lastDocument == undefined) {
      dispatch(set_allLoaded(false));
      dispatch(load_room_data(undefined));
    } else {
      dispatch(load_room_data(state.lastDocument));
    }
    let t = state.Rooms.filter(item => item.postedby.email == state.user.email);
    setPostData(t);
    //console.log(state.Rooms, 'filtered');
  }, []);

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
            <Image source={{uri: state.user?.image}} style={styles.img} />
          </LinearGradient>
          <View
            style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.usertitle}>{state.user?.name}</Text>
            <Image source={Theme.verify} style={styles.verify} />
          </View>
          <Text style={styles.tag}>@jatinkhurana</Text>
        </View>

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
              about={state.user?.about}
              location={state.user?.location}
            />

            <View style={{paddingHorizontal: 20}}>
              <LineBar />
            </View>

            <WhyHere />

            <View style={{paddingHorizontal: 20}}>
              <LineBar />
            </View>

            <ProfileTitle
              title="Currently"
              textOne={state?.user?.designation}
            />

            <View style={{paddingHorizontal: 20}}>
              <LineBar />
            </View>

            <ProfileTitle title="Industry" textOne={state.user?.industry} />

            <View style={{paddingHorizontal: 20}}>
              <LineBar />
            </View>

            <ProfileTitle title="Education" array={state?.user?.education} />

            <View style={{paddingHorizontal: 20}}>
              <LineBar />
            </View>

            <FindMeOn
              title={'Find Me On:'}
              mob={state?.user?.phone}
              email={state?.user?.email}
              linkdin={state?.user?.linkedinLink}
              twitter={state?.user?.twitterLink}
            />
          </View>
        ) : (
          <View style={{paddingHorizontal: '5%'}}>
            {postData?.map((item, index) => (
              <View key={index}>
                <PostCard item={item} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
export default Profile;

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
