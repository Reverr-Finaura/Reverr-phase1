import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {BackButton, IndividualHeaderLayout} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {cos} from 'react-native-reanimated';

const LikeScreen = () => {
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
          const dataliked = await firestore().collection('Users').doc(item).get();
       
          const RecievedData = dataliked.data();
          setLikedData(prev => [...prev, RecievedData]);
        });
      }

      setshow(true);
      console.log('alll set');
    };

    GetLikedPeople();
  }, []);
  return (
    <IndividualHeaderLayout>
      <View>
        <BackButton/>
      </View>
      <View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 80,
          }}
        >
          <Text
            style={{
              color: '#0077B7',
              textAlign: 'center',
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            Buy premium to connect with people who are interested in your
            profile
          </Text>
        </View>

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
          LikedData.map(data => {
            console.log('what is name', data.name);
            if (data.name === undefined) {
              return;
            }
            return (
              <View
                key={data.id}
                style={{
                  marginTop: 20,
                  height: 99,
                  width: 348,
                  borderBottomRightRadius:10,
                  borderTopRightRadius:10,
                  borderBottomLeftRadius:10,
                  borderTopLeftRadius:10,
                  left: 42,
                  backgroundColor: '#0077B7',
                }}
              >
                <View style={{flexDirection: 'row'}}>
                  <View style={{alignSelf: 'center'}}>
                    <Image
                      style={{
                        resizeMode: 'cover',
                        width: 99,
                        alignSelf: 'center',
                        height: 99,
                        borderRadius: 5,
                      }}
                      source={{
                        uri: data.image,
                      }}
                    />
                  </View>
                  <View style={{alignContent:'center',marginLeft:25,}}>
                    <Text
                      style={{
                        
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'Poppins',
                        fontSize: 24,
                        fontWeight: '800',
                      }}
                    >
                      {data.name}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'Poppins',
                        fontSize: 14,
                        flex: 2,
                        flexWrap: 'wrap',
                        fontWeight: '600',
                      }}
                    >
                      {data.about}
                    </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <></>
        )}
      </View>
    </IndividualHeaderLayout>
  );
};

export {LikeScreen};
