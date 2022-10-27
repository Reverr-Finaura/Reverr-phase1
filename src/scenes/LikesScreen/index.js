import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {BackButton, IndividualHeaderLayout} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {cos} from 'react-native-reanimated';
import {} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const LikeScreen = () => {
  const navigation = useNavigation();
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [liked, setliked] = useState([]);
  const [error, seterror] = useState('');
  const [LikedData, setLikedData] = useState([{}]);

  console.log('liked datta', LikedData.length);
  useEffect(() => {
    const GetLikedPeople = async () => {
      const Data = state.user.people_liked_me;
      if (Data) {
        Data.map(async item => {
          const dataliked = await firestore()
            .collection('Users')
            .doc(item)
            .get();

          const RecievedData = dataliked.data();
          setLikedData(prev => [...prev, RecievedData]);
        });
      }

      setshow(true);
      console.log('alll set');
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
    <IndividualHeaderLayout>
      <View>
        <BackButton />
      </View>
      <View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 80,
          }}
        ></View>

        <View style={{alignSelf: 'center', marginTop: 12}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Poppins',
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            William and 9 others liked your profile
          </Text>
        </View>

        {show && LikedData.length > 1 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}
          >
            {LikedData.map(data => {
              console.log('what is name', data.email, '', data.id);
              if (data.name === undefined) {
                return;
              }
              return (
                <TouchableOpacity onPress={() => HandleOnPress(data.email)}>
                  <View
                    style={{
                      marginTop: 20,
                      width: Dimensions.get('window').width / 2.5,
                      height: Dimensions.get('window').height / 4,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      borderBottomRightRadius: 10,
                      borderTopRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                      backgroundColor: '#0077B7',
                    }}
                  >
                    <View style={{marginTop: '5%', alignItems: 'center'}}>
                      <View>
                        <Image
                          source={{uri: data.image}}
                          style={{
                            width: 80,

                            height: 80,
                            borderRadius: 40,
                          }}
                        />
                      </View>

                      <View>
                        <Text style={{fontSize: 18, fontWeight: '700'}}>
                          {data.name}
                        </Text>
                      </View>
                      <View>
                        <Text tyle={{fontSize: 16, fontWeight: '500'}}>
                          {data.about}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <></>
        )}
      </View>
    </IndividualHeaderLayout>
  );
};

export {LikeScreen};
