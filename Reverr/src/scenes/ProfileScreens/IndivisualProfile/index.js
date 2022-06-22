import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react';
  import { AppColors } from '../../../utils';
  import { BackButton } from '../../../Components';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import Ionic from 'react-native-vector-icons/Ionicons';
  import {useNavigation} from '@react-navigation/native';
  import { useDispatch, useSelector } from 'react-redux';
  import { styles } from './style';
  import auth from '@react-native-firebase/auth';
  import { clearUserState } from '../../../Redux/actions';
  
  const Width = Dimensions.get('screen').width;
  const Height = Dimensions.get('screen').height;
  
  const IndividuaProfile = props => {
    const navigation = useNavigation();
    const state=useSelector(state=>state.UserReducer);
    const dispatch=useDispatch();
    
    if(!state){
        return <View style={styles.mainscreen}><ActivityIndicator size="large" color='purple'/></View>
    }
    return (
        <ScrollView style={styles.screen}>
          <View style={styles.header}>
            <View style={{width: '40%'}}>
              <BackButton
                IconSize={30}
                onPress={async() => {
                  await auth().signOut().then(()=>{
                    dispatch(clearUserState());
                    navigation.navigate('Login');
                  }).catch(e=>{
                    console.log("error in logout")
                  }) 
                  
                }}
              />
            </View>
            <Text
              style={{
                color: AppColors.FontsColor,
                fontFamily: 'Poppins-Regular',
                marginStart: Width / 30,
                fontSize: 22,
              }}>
              Profile
            </Text>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.topIcons}>
              <TouchableOpacity
                onPress={() => {
                  //navigation.navigate('Subscription');
                }}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="star" size={25} color={AppColors.ActiveColor} />
                <Text style={styles.text}>Membership</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Settings');
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginStart: Width / 1.83,
                }}>
                <Ionic
                  name="settings-outline"
                  size={28}
                  color={AppColors.ActiveColor}
                />
                <Text style={styles.text}>Setting</Text>
              </TouchableOpacity>
            </View>
            <View style={{height: '12%'}}>
              <Text
                style={[
                  styles.text,
                  {
                    width: '100%',
                    textAlign: 'center',
                    marginLeft: 10,
                    marginTop: Height / 82,
                    fontSize: 18,
                    textTransform: 'capitalize',
                  },
                ]}>
                {state.user && state.user.name}
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    width: '100%',
                    textAlign: 'center',
                    marginLeft: 10,
                    color: AppColors.infoFonts,
                    fontSize: 18,
                    textTransform: 'capitalize',
                  },
                ]}>
                {state.user && state.user.designation}
              </Text>
            </View>
            <View
              style={{
                height: '17%',
                marginTop: '2%',
                borderBottomColor: AppColors.FontsColor,
                borderBottomWidth: 1,
              }}>
              <Text style={[styles.text, {fontSize: 18}]}>About</Text>
              <Text style={styles.about}>{state.user && state.user.about}</Text>
            </View>
            <View
              style={{
                height: '9%',
                flexDirection: 'row',
                marginTop: '2%',
                alignItems: 'center',
                paddingBottom: '4%',
                justifyContent: 'space-between',
                borderBottomColor: AppColors.FontsColor,
                borderBottomWidth: 1,
              }}>
              <Text style={[styles.text, {fontSize: 18}]}>Industry</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.text, {fontSize: 18, paddingRight: '5%'}]}>
                  {state.user && state.user.industry}
                </Text>
                <Icon
                  name="angle-right"
                  size={25}
                  color={AppColors.FontsColor}
                  style={{paddingRight: '2%', marginTop: '1%'}}
                />
              </View>
            </View>
            <View style={styles.CompanyDetails}>
              <Text style={[styles.text, {fontSize: 18}]}>Experience</Text>
              <Text style={[styles.txt, {width: Width / 2}]}>
                {state.user.experience &&
                  state.user.experience.length > 0 &&
                  state.user.experience.map(ex => ex)}
              </Text>
            </View>
            <View style={[styles.CompanyDetails, {height: Height / 9}]}>
              <Text style={[styles.text, {fontSize: 18}]}>Skills</Text>
              <Text style={[styles.txt, {width: Width / 2}]}>
                {state.user.skills &&
                  state.user.skills.length > 0 &&
                  state.user.skills.map(sk => sk)}
              </Text>
            </View>
            <View style={[styles.CompanyDetails]}>
              <Text style={[styles.text, {fontSize: 18}]}>Education</Text>
              <Text style={[styles.txt]}>
                {state.user.education &&
                  state.user.education.length > 0 &&
                  state.user.education.map(ed => ed)}
              </Text>
            </View>
          </View>
          <View style={styles.dp}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: state.user.image}}
            />
          </View>
        </ScrollView>
    );
  };
  
  
  
  export {IndividuaProfile};
  