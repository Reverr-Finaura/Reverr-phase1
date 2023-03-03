import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { BackButton, IndividualHeaderLayout } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { cos } from 'react-native-reanimated';
import { } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import styles from './styles';
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
        // alert(RecievedData, 'alll set');

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

    // navigation.navigate('ShowMoreVibe', CardRecivedData);
  };
  return (
    <View
      style={styles.mainView}>
      <View style={{ marginTop: 20 }}>
        <BackButton />
        <Text
          style={styles.buyPremium}>
          Buy Premium to connect people who are interested in your profile
        </Text>
        <Text
          style={styles.william}>
          William and 9 other liked your profile
        </Text>
      </View>
      <View>


        {show && LikedData.length > 1 ? (
          <ScrollView>
            <View
              style={styles.card}>
              {LikedData?.map(data => {
                //console.log('what is name', data.email, '', data.id);
                if (data?.name === undefined) {
                  return;
                }
                return (
                  <View>
                    <TouchableOpacity onPress={() => HandleOnPress(data.email)}>
                      <View
                        style={styles.mainDesign}>
                        <View style={styles.view2}>
                          <View style={styles.view3}>
                            <Image style={styles.coverImage}
                              source={{ uri: data.image }}

                            />
                            <View style={styles.view4}>
                              <Text
                                style={styles.txtName}>
                                {data.name}
                              </Text>
                              <Text
                                style={styles.market}>
                                Market Research
                              </Text>
                              <Text
                                style={styles.about}>
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
            <Text></Text>
          </>
        )}
      </View>
    </View>
  );
};

export { LikeScreen };
