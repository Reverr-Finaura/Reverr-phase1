import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import ShortUniqueId from 'short-unique-id';
import firestore from '@react-native-firebase/firestore';
export const MessageHeader = props => {
  const {userData} = props;
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const MakeCall = async () => {
    console.log('Making call');
    const udata = await firestore()
      .collection('Users')
      .doc(state.user.email)
      .get();
    const meeting = udata._data.meeting;

    if (meeting != undefined && meeting.host != '') {
      return JoinCall();
    }
    const uid = new ShortUniqueId();
    const channelName = uid(12);
    const host = true;

    const data = {
      meeting: {
        channelName: channelName,
        host: state.user.email,
      },
    };

    await firestore().collection('Users').doc(state.user.email).update(data);
    await firestore().collection('Users').doc(userData.email).update(data);

    //dispatch({type: 'MEETING', payload: data});
    const token_main = await gettoken(channelName, host);
    navigation.navigate('videoCall', {
      token: token_main,
      userData: userData,
    });
  };

  const JoinCall = async () => {
    const data = await firestore()
      .collection('Users')
      .doc(state.user.email)
      .get();
    const meeting = data._data.meeting;

    //dispatch({type: 'MEETING', payload: data._data});
    console.log(userData);
    const channelName = meeting.channelName;
    const host = meeting.host == state.user.email ? true : false;
    const token_main = await gettoken(channelName, host);
    navigation.navigate('videoCall', {
      token: token_main,
      userData: userData,
    });
    //navigation.navigate('videoCall')
  };
  var token;

  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data.channelName, data.host),
    });
    console.log(
      'res:' +
        Object.keys(response.json()) +
        '->' +
        Object.values(response.json()),
    );
    return response.json();
  }

  const gettoken = async (channelName, host) => {
    var data = {
      channelName,
      host,
    };
    token = await postData(
      'https://reverrserver.herokuapp.com/accesstoken',
      data,
    ).then(data => {
      return data.token;
    });
    //console.log(token);
    //return "006904538e9e76546c49aabef629237f0fdIAD2p3lHk/pCbrcu8+9Yb2Uf2+mVVNSc9OP2mEppl3cElaDfQtYAAAAAEABk0eMrZDXNYgEAAQD08cti";
    return token;
  };
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerComponents}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/Back.png')} />
        </TouchableOpacity>

        <Image
          style={{marginLeft: 5, height: 30, width: 30}}
          source={{uri: userData.image}}
        />

        <Text style={styles.text}>{userData.name}</Text>

        <TouchableOpacity onPress={MakeCall}>
          <Image
            source={require('../../assets/images/Call.png')}
            style={styles.call}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={require('../../assets/images/Options.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
