import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {MentorList} from '../../Components/Mentor-list';
import styles from './styles';
import {ChatLayout} from '../../Components/ChatLayout';
import {IndividualHeaderLayout} from '../../Components';
import {useSelector} from 'react-redux';
import {AppColors} from '../../utils';
import firestore from '@react-native-firebase/firestore';
import authentication from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../utils/Theme';
import GradientHeader from '../../Components/components/GradientHeader';

export const Messages = () => {
  //console.log(mentors);
  const state = useSelector(state => state.UserReducer);
  const [mentors, setMentors] = useState(true);
  const [networks, setNetworks] = useState(false);
  const [networkUser, setNetworkUser] = useState([]);
  const [matchedUser, setMatchedUser] = useState([]);
  const [totalNetworkUser, setTotalNetworkUser] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('match=====', state.user);

  const getNetworksUsers = async () => {
    setLoading(true);
    let network = [];
    for (let index = 0; index < state.user.network.length; index++) {
      await firestore()
        .collection('Users')
        .doc(state.user.network[index])
        .get()
        .then(res => {
          network.push(res._data);
          setLoading(false);
          //console.log(res._data, 'res._data');
        });
    }
    setNetworkUser(network);
    let matched = [];
    for (let j = 0; j < state.user.matched.length; j++) {
      await firestore()
        .collection('Users')
        .doc(state.user.matched[j])
        .get()
        .then(res => {
          matched.push(res._data);
          //console.log(res._data, 'res._data');
        });
    }
    setMatchedUser(matched);
    setLoading(false);
  };
  useEffect(() => {
    getNetworksUsers();
    let total = networkUser.concat(matchedUser);
    setTotalNetworkUser(total);

    console.log(totalNetworkUser, 'total');
  }, [networks, mentors]);

  return (
    <View style={styles.container}>
      <GradientHeader />
      <View>
        <Text style={styles.title}>Messages</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setMentors(true);
              setNetworks(false);
            }}
            style={{
              backgroundColor: mentors ? AppColors.ActiveColor : null,
              width: '45%',
              alignItems: 'center',
              paddingVertical: '3%',
              borderWidth: 2,
              borderColor: AppColors.ActiveColor,
              borderRadius: 5,
            }}>
            {state?.user?.userType == 'Mentor' ? (
              <Text style={styles.subTitle}>Clients</Text>
            ) : (
              <Text style={styles.subTitle}>Mentors</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setNetworks(true);
              setMentors(false);
            }}
            style={{
              backgroundColor: networks ? AppColors.ActiveColor : null,
              width: '45%',
              alignItems: 'center',
              paddingVertical: '3%',
              borderWidth: 2,
              borderColor: AppColors.ActiveColor,
              borderRadius: 5,
            }}>
            <Text style={styles.subTitle}>Network</Text>
          </TouchableOpacity>
        </View>

        {mentors && (
          <View style={{marginTop: '3%'}}>
            {state?.user?.mentors?.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={state.user.mentors}
                renderItem={({item}) => <MentorList mentor={item} />}
              />
            ) : (
              <Text style={{color: 'grey', fontSize: 14, marginLeft: 50}}>
                Please Subscribe To Mentors for Guidence
              </Text>
            )}
            <ChatLayout
              usersArray={
                state.user.userType == 'Mentor'
                  ? state.user.clients
                  : state.user.mentors
              }
              loader={loading}
            />
          </View>
        )}
        {networks && (
          <View style={{marginTop: '3%'}}>
            {state?.user?.mentors?.length > 0 && (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={state.user.mentors}
                renderItem={({item}) => <MentorList mentor={item} />}
              />
            )}
            {/* {loading == false ? ( */}

            <ChatLayout
              loader={loading}
              usersArray={totalNetworkUser.filter(
                it => it.email != authentication().currentUser.email,
              )}
            />
            {/* ) : ( */}
            {/* <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  marginVertical: 100,
                }}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )} */}
          </View>
        )}
      </View>
    </View>
  );
};
