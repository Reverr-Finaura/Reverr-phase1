import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors, smallString} from '../../utils';
import {BackButton} from '../../Components';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {ApprovedReq, rejectRequest} from '../../utils/FirebaseFunctionality';
import {add_user, setUser} from '../../Redux/actions';

const Requests = () => {
  const state = useSelector(state => state.UserReducer);
  const [loading, setLoading] = useState(false);
  const [recivedReq, setRecivedReq] = useState([]);
  const [loader, setLoader] = useState(false);

  const getRequested = async () => {
    setLoader(true);
    let rec = [];
    for (let index = 0; index < state.user.recivedRequests.length; index++) {
      let req = await firestore()
        .collection('Users')
        .doc(state.user.recivedRequests[index])
        .get();
      rec.push(req._data);
      if (index === state.user.recivedRequests.length - 1) {
        setLoader(false);
      }
    }
    setRecivedReq(rec);
    setLoader(false);
  };
  //console.log(state.user.recivedRequests, 'jjhjh');

  const dispatch = useDispatch();

  useEffect(() => {
    getRequested();
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
      {loader ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '50%',
          }}>
          <ActivityIndicator size={45} color={AppColors.FontsColor} />
        </View>
      ) : (
        <View>
          {recivedReq?.length === 0 ? (
            <View
              style={{
                height: '70%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: AppColors.FontsColor,
                }}>
                No Requests Found Pending ...
              </Text>
            </View>
          ) : (
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
                      <Image source={{uri: item.image}} style={[styles.dp]} />
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
                        {loading ? (
                          <View>
                            <ActivityIndicator />
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              ApprovedReq(
                                state.user.email,
                                item.email,
                                setLoading,
                              ).then(r => {
                                //  console.log(r, 'aproved');
                                dispatch(setUser(r));
                              });
                            }}
                            style={styles.button}>
                            <Text style={{color: AppColors.FontsColor}}>
                              Approve
                            </Text>
                          </TouchableOpacity>
                        )}
                        {loading ? (
                          <View>
                            <ActivityIndicator />
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              rejectRequest(
                                state.user.email,
                                item.email,
                                setLoading,
                              ).then(r => {
                                console.log(r, 'reject');
                                dispatch(setUser(r));
                              });
                            }}
                            style={[styles.button, {backgroundColor: 'red'}]}>
                            <Text style={{color: AppColors.FontsColor}}>
                              Reject
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </LinearGradient>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      )}
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
  dp: {
    height: 90,
    width: 90,
    borderRadius: 50,
  },
});

export {Requests};
