import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { AppColors } from '../../utils';
import {useNavigation} from '@react-navigation/native';
import { CustomButton } from '../../Components';
import { BackButton } from '../../Components';
import LinearGradient from 'react-native-linear-gradient';

const MentorCalender = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BackButton
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>Availability</Text>
      </View>
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: -0.7, y: 1.3}}
        end={{x: 1, y: 0.5}}
        style={styles.Container}>
        <Text
          style={{color: AppColors.FontsColor, fontFamily: 'Poppins-SemiBold'}}>
          Working hours
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditCalender');
          }}>
          <Text style={{color: 'red', fontFamily: 'Poppins-SemiBold'}}>
            Edit
          </Text>
        </TouchableOpacity>
      </LinearGradient>
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
    marginStart: '5%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '2%',
    paddingHorizontal: '6%',
    paddingVertical: '3%',
    marginTop: '8%',
    borderRadius: 20,
  },
});
export {MentorCalender};
