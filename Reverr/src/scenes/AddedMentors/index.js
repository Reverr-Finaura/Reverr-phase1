import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppColors} from '../../utils';
import {BackButton} from '../../Components';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const AddedMentors = props => {
  const state = useSelector(state => state.UserReducer);
  const dates = props.route.params.dates;
  const [all, setAll] = useState();
  const [listColumn, setListColumn] = useState(2);
  const navigation = useNavigation();
  useEffect(() => {
    //GetAllMentors(setAll);
    setAll(state.user.mentors);
    //console.log(all);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BackButton
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>Your Mentors</Text>
      </View>

      {state.user.mentors.length == 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 200,
          }}>
          <Text style={{color: 'grey'}}>No mentor is Present.</Text>
          <Text style={{color: 'grey'}}>
            Plese Go through mentors subscription plans.
          </Text>
        </View>
      ) : (
        <View style={{marginTop: '8%'}}>
          <FlatList
            data={all}
            numColumns={2}
            renderItem={({item}) => (
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: 0.4, y: 1.3}}
                end={{x: 1, y: 0.5}}
                style={styles.Card}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    //console.log(dates)
                    // console.log(item);
                    navigation.navigate('CalanderAppointments', {
                      dates: dates,
                      mentor: item,
                    });
                  }}>
                  <Image style={styles.Dp} source={{uri: item.image}} />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.Name}>{item.name}</Text>
                    <Text style={styles.Skills}>{item.industry}</Text>
                  </View>
                  <View style={styles.rating}>
                    <Icon name="star" size={12} color={AppColors.infoFonts} />
                    <Icon
                      name="star"
                      size={12}
                      style={{marginStart: '3%'}}
                      color={AppColors.infoFonts}
                    />
                    <Icon
                      name="star"
                      size={12}
                      style={{marginStart: '3%'}}
                      color={AppColors.infoFonts}
                    />
                    <Icon
                      name="star"
                      size={12}
                      style={{marginStart: '3%'}}
                      color={AppColors.infoFonts}
                    />
                    <Icon
                      name="star"
                      size={12}
                      style={{marginStart: '3%'}}
                      color={AppColors.infoFonts}
                    />
                    <Text
                      style={{
                        color: AppColors.ActiveColor,
                        marginStart: '5%',
                      }}>
                      {item.reviews.length != 0
                        ? ' '
                        : item.reviews.length + ' Reviews'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            )}
          />
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
  headerTitle: {
    color: AppColors.FontsColor,
    marginStart: '20%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  Card: {
    marginVertical: 10,
    width: Width / 2.18,
    marginHorizontal: '2%',
    borderRadius: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  Dp: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  container: {
    flexDirection: 'row',
  },
  Name: {
    color: AppColors.FontsColor,
    fontSize: 13,
    marginTop: '4%',
    fontFamily: 'Poppins-Regular',
  },
  Skills: {
    color: AppColors.infoFonts,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  schedule: {
    paddingHorizontal: Width / 50,
    paddingVertical: 5,
    marginVertical: '5%',
    flexDirection: 'row',
    borderColor: AppColors.FontsColor,
    borderWidth: 2,
    alignItems: 'center',
    borderRadius: 15,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export {AddedMentors};
