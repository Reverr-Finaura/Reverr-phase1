import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {BackButton, ProfileDetailsBox} from '../../../Components';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../../utils';
import {
  ApprovedReq,
  CancelRequest,
  ConnectToSocial,
  rejectRequest,
} from '../../../utils/FirebaseFunctionality';
import {useEffect} from 'react';
import {add_user} from '../../../Redux/actions';
import firestore from '@react-native-firebase/firestore';
import PostCard from '../../../Components/postCard';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const ViewProfile = props => {
  const navigation = useNavigation();
  const state = useSelector(state => state.UserReducer);
  const [posts, setPosts] = useState(false);
  const [about, setAbout] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetails = props.route.params.postData.postedby;
  const [postData, setPostData] = useState('');

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(state.user.email)
      .get()
      .then(res => {
        console.log(res._data, 'resAdd');
        dispatch(add_user(res._data));
      });
    let t = state.Rooms.filter(
      item => item.postedby.email == userDetails.email,
    );
    setPostData(t);
    //console.log(state.Rooms, 'filtered');
  }, [dispatch, connectLoading, loading]);

  console.log(state.user.sendRequests);

  const connectToNetwork = async () => {
    ConnectToSocial(state.user.email, userDetails.email, setConnectLoading);
  };

  const removeToNetwork = async () => {
    CancelRequest(state.user.email, userDetails.email, setConnectLoading);
  };

  if (!state) {
    return (
      <View style={styles.mainscreen}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: AppColors.primarycolor}}>
      <View style={{height: Height / 2.4, width: '100%'}}>
        <View
          style={{
            backgroundColor: '#093B6A80',
            height: '70%',
            marginTop: '4%',
            marginHorizontal: '3%',
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '8%',
              paddingVertical: '2%',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon2 name="angle-left" size={29} color={AppColors.FontsColor} />
            </TouchableOpacity>
            <Text
              style={{
                color: AppColors.FontsColor,
                marginStart: '35%',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Profile
            </Text>
          </View>
        </View>

        <LinearGradient
          colors={[AppColors.ActiveColor, '#012437']}
          start={{x: 0.3, y: 1.3}}
          end={{x: 2, y: 0.9}}
          style={{
            position: 'absolute',
            top: '40%',
            height: Height / 3.1,
            left: '8%',
            right: '8%',
            borderRadius: 10,
            alignItems: 'center',
            elevation: 10,
            zIndex: 5,
          }}>
          <View style={{marginTop: '20%'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: AppColors.FontsColor,
                letterSpacing: 1,
                textAlign: 'center',
              }}>
              {userDetails.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: AppColors.BtnClr,
                textAlign: 'center',
              }}>
              @ {userDetails.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '2%',
              }}>
              {state.user.network.includes(userDetails.email) ? (
                <View>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: AppColors.primarycolor,
                        fontSize: 19,
                        fontWeight: 'bold',
                      }}>
                      Connected
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  {state &&
                  state.user.recivedRequests.includes(userDetails.email) ? (
                    <View style={{paddingVertical: '2%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-around',
                          paddingHorizontal: '15%',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            ApprovedReq(
                              state.user.email,
                              userDetails.email,
                              setLoading,
                            );
                          }}
                          style={styles.button}>
                          <Text style={{color: AppColors.FontsColor}}>
                            Approve
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            rejectRequest(
                              state.user.email,
                              userDetails.email,
                              setLoading,
                            );
                          }}
                          style={[styles.button, {backgroundColor: 'red'}]}>
                          <Text style={{color: AppColors.FontsColor}}>
                            Reject
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View>
                      {connectLoading ? (
                        <View>
                          <ActivityIndicator
                            size={30}
                            color={AppColors.primarycolor}
                          />
                        </View>
                      ) : (
                        <>
                          {state &&
                          state.user.sendRequests.includes(
                            userDetails.email,
                          ) ? (
                            <TouchableOpacity onPress={removeToNetwork}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: AppColors.primarycolor,
                                  fontSize: 22,
                                }}>
                                Cancel Request
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity onPress={connectToNetwork}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: AppColors.primarycolor,
                                  fontSize: 22,
                                }}>
                                Connect +
                              </Text>
                            </TouchableOpacity>
                          )}
                        </>
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingStart: '12%',
                marginTop: '5%',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: AppColors.FontsColor}}>Gender</Text>
                <Text style={{color: AppColors.FontsColor}}>Male</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: AppColors.FontsColor}}>Hometown</Text>
                <Text style={{color: AppColors.FontsColor}}>
                  New Delhi, India
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: AppColors.FontsColor}}>Location</Text>
                <Text style={{color: AppColors.FontsColor}}>New Delhi</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            position: 'absolute',
            left: '16%',
            right: '16%',
            top: '22%',
          }}>
          {/* <TouchableOpacity>
            <ImageBackground
              source={require('../../../assets/images/shadow.png')}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="camera" size={22} color={AppColors.FontsColor} />
            </ImageBackground>
          </TouchableOpacity> */}
          <Image
            source={{uri: userDetails.image}}
            style={{
              width: 110,
              height: 110,
              borderRadius: 80,
              borderWidth: 5,
              borderColor: AppColors.FontsColor,
            }}
          />
          {/*   <TouchableOpacity>
            <ImageBackground
              source={require('../../../assets/images/shadow.png')}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="cog" size={22} color={AppColors.FontsColor} />
            </ImageBackground>
          </TouchableOpacity> */}
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: AppColors.CardColor,
            borderBottomWidth: 2,
            justifyContent: 'space-around',
            marginHorizontal: '8%',
            marginTop: '20%',
            paddingHorizontal: '5%',
          }}>
          <TouchableOpacity
            style={{
              paddingBottom: '4%',
              borderBottomColor: posts
                ? AppColors.ActiveColor
                : AppColors.primarycolor,
              borderBottomWidth: 4,
            }}
            onPress={() => {
              setPosts(true);
              setAbout(false);
            }}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: posts ? AppColors.ActiveColor : AppColors.FontsColor,
                },
              ]}>
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingBottom: '4%',
              borderBottomColor: about
                ? AppColors.ActiveColor
                : AppColors.primarycolor,
              borderBottomWidth: 4,
            }}
            onPress={() => {
              setPosts(false);
              setAbout(true);
            }}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: about ? AppColors.ActiveColor : AppColors.FontsColor,
                },
              ]}>
              About
            </Text>
          </TouchableOpacity>
        </View>
        {posts && <PostCard postData={postData} />}
        {about && (
          <View>
            <LinearGradient
              colors={[AppColors.primarycolor, AppColors.poupopbg]}
              start={{x: 0, y: 0.8}}
              end={{x: 0.9, y: 0}}
              style={{
                marginHorizontal: '5%',
                borderRadius: 40,
                alignItems: 'center',
                paddingVertical: '3%',
                marginTop: '3%',
                paddingHorizontal: '2%',
              }}>
              <Text style={[styles.text, {fontWeight: 'bold', fontSize: 15}]}>
                “I like being aware of new things around me ”
              </Text>
              <Text
                style={{
                  color: AppColors.ActiveColor,
                  fontSize: 14,
                  textAlign: 'center',
                  paddingHorizontal: '5%',
                }}>
                I am a marketing research , looking for mentorship, I am an IIM
                Bangalore graduate and have worked with Fintech for 5 years.
              </Text>
            </LinearGradient>
            <ProfileDetailsBox userData={state.user} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export {ViewProfile};
