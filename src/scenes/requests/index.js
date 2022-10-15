import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors, smallString} from '../../utils';
import {BackButton} from '../../Components';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {ApprovedReq, rejectRequest} from '../../utils/FirebaseFunctionality';
import {add_user} from '../../Redux/actions';

const Requests = () => {
  const state = useSelector(state => state.UserReducer);
  const [loading, setLoading] = useState(false);
  const [recivedReq, setRecivedReq] = useState([]);

  const getRequested = async () => {
    let rec = [];
    for (let index = 0; index < state.user.recivedRequests.length; index++) {
      let req = await firestore()
        .collection('Users')
        .doc(state.user.recivedRequests[index])
        .get();

      rec.push(req._data);
    }
    setRecivedReq(rec);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getRequested();
    firestore()
      .collection('Users')
      .doc(state.user.email)
      .get()
      .then(res => {
        console.log(res._data, 'resAdd');
        dispatch(add_user(res._data));
      });
  }, [dispatch, loading]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <BackButton IconSize={30} />
        <Text
          style={{
            color: AppColors.FontsColor,
            marginStart: '5%',
            fontSize: 20,
          }}>
          Requests
        </Text>
      </View>
      <View>
        <FlatList
          data={recivedReq}
          keyExtractor={item => item.email}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                width: '47%',
                marginVertical: '2%',
                marginHorizontal: '2%',
                alignItems: 'center',
              }}>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0.5}}
                style={styles.Card}>
                <Image
                  source={require('../../assets/images/MentorProfile.png')}
                  style={styles.dp}
                />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.industry}>
                  {smallString(item.industry, 20)}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around',
                    paddingHorizontal: '6%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      ApprovedReq(state.user.email, item.email, setLoading);
                    }}
                    style={styles.button}>
                    <Text style={{color: AppColors.FontsColor}}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      rejectRequest(state.user.email, item.email, setLoading);
                    }}
                    style={[styles.button, {backgroundColor: 'red'}]}>
                    <Text style={{color: AppColors.FontsColor}}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          )}
        />
      </View>
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
    marginVertical: '3%',
  },
  Card: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: '8%',
  },
  name: {
    color: AppColors.FontsColor,
    marginTop: '5%',
    fontSize: 18,
  },
  industry: {
    color: AppColors.infoFonts,
    marginVertical: '5%',
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: '7%',
    paddingVertical: '3%',
    borderRadius: 5,
  },
});

export {Requests};
