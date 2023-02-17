import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {BackButton, IndividualHeaderLayout} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {cos} from 'react-native-reanimated';
import {} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LikeScreen = () => {
  const navigation = useNavigation();
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [liked, setliked] = useState([]);
  const [error, seterror] = useState('');
  const [LikedData, setLikedData] = useState([{}]);

  // console.log('liked datta', LikedData.length);

  const userFunc = async () => {
    const savedUser = await firestore()
      .collection('Users')
      .doc('mauricerana@gmail.com')
      .get();
    //  console.log('Its a :' +JSON.stringify (savedUser._data));
    // dispatch(add_user(savedUser._data));
  };

  useEffect(() => {
    const GetLikedPeople = async () => {
      const Data = state.user.people_liked_me;

      Data?.map(async item => {
        console.log(item, 'kjdksskjshf');
        const dataliked = await firestore()
          .collection('Users')
          .doc('mauricerana@gmail.com')
          .get();

        const RecievedData = dataliked.data();
        console.log('12345==================rer===>', RecievedData);

        // console.log(dataliked._data, 'kssk');
        alert(RecievedData, 'alll set');

        setLikedData(prev => [...prev, RecievedData]);
      });

      setshow(true);
      console.log(LikedData, 'alll set');
    };

    GetLikedPeople();
  }, []);

  const HandleOnPress = async dataid => {
    console.log('at onpress', dataid);
    const cardliked = await firestore().collection('Users').doc(dataid).get();

    const CardRecivedData = cardliked.data();

    navigation.navigate('ShowMoreVibe', CardRecivedData);
  };
  return (
    <View
      style={{
        backgroundColor: '#020E2C',
        height: Dimensions.get('window').height,
      }}>
      <View style={{marginTop: 20}}>
        <BackButton />
        <Text
          style={{
            textAlign: 'left',
            fontSize: 16,
            fontWeight: '700',
            marginHorizontal: 15,
            alignItems: 'center',
            textAlign: 'center',
            marginTop: 10,
            color: 'white',
          }}>
          Buy Premium to connect people who are interested in your profile
        </Text>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 14,
            fontWeight: '700',
            marginHorizontal: 15,
            alignItems: 'center',
            textAlign: 'center',
            marginTop: 20,
            color: '#0077B7',
          }}>
          William and 9 other liked your profile
        </Text>
      </View>
      <View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 10,
          }}></View>

        {show && LikedData.length > 1 ? (
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                marginBottom: 20,
              }}>
              {LikedData?.map(data => {
                //console.log('what is name', data.email, '', data.id);
                if (data?.name === undefined) {
                  return;
                }
                return (
                  <View>
                    <TouchableOpacity onPress={() => HandleOnPress(data.email)}>
                      <View
                        style={{
                          marginTop: 20,

                          justifyContent: 'center',
                          flexDirection: 'row',
                          borderBottomRightRadius: 10,
                          borderTopRightRadius: 10,
                          borderBottomLeftRadius: 10,
                          borderTopLeftRadius: 10,
                          backgroundColor: '#000000',
                          borderColor: '#0077B7',
                          borderWidth: 2,
                        }}>
                        <View style={{margin: 10}}>
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              source={{uri: data.image}}
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 20,
                              }}
                            />
                            <View style={{alignSelf: 'center'}}>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  fontSize: 18,
                                  fontWeight: '700',
                                  marginLeft: 10,
                                  color: 'white',
                                }}>
                                {data.name}
                              </Text>
                              <Text
                                style={{
                                  textAlign: 'left',
                                  fontSize: 14,
                                  fontWeight: '700',
                                  marginLeft: 10,
                                  color: '#0077B7',
                                }}>
                                Market Research
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: '500',
                                  color: 'white',
                                  width: 200,
                                  marginLeft: 10,
                                  flexWrap: 'wrap',
                                }}>
                                {data.about}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <>
            <Text>skfjsfj</Text>
          </>
        )}
      </View>
    </View>
  );
};

export {LikeScreen};
