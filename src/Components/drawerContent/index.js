import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {AppColors} from '../../utils';
import {Menu} from '../../dumy-Data/drawerMenu';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth, {deleteUser, firebase} from '@react-native-firebase/auth';

const DrawerContent = () => {
  const state = useSelector(state => state.UserReducer);
  const navigation = useNavigation();

 


  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          color: AppColors.FontsColor,
          fontSize: 19,
          fontWeight: 'bold',
        }}>
        Profile
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('IndividualProfile')}
        style={{marginTop: '10%'}}>
        <Image
          source={{uri: state.user.image}}
          style={{
            width: 90,
            height: 90,
            borderRadius: 90,
            marginTop: '3%',
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          color: AppColors.FontsColor,
          fontSize: 19,
          fontWeight: 'bold',
          marginTop: '3%',
        }}>
        {state.user.name}
      </Text>
      <View style={{marginVertical: '15%', paddingHorizontal: '9%'}}>
        <FlatList
          data={Menu}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: '4%',
              }}
              onPress={() => {
                navigation.navigate(item.path);
              }}>
              <Image
                source={item.icon}
                style={{tintColor: AppColors.BtnClr, width: 27, height: 27}}
              />
              <Text
                style={{
                  color: AppColors.BtnClr,
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginStart: '7%',
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />



      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>Upgrade to </Text>
        <Text
          style={{
            color: AppColors.ActiveColor,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Premium
        </Text>
      </View>
      <Text style={styles.text}>and receive exclusive access to:</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.6}>
        <Text style={styles.text}>Upgrade</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.poupopbg,
    paddingTop: '5%',
    height: '100%',
  },
  text: {
    color: AppColors.FontsColor,
    textAlign: 'center',
    fontSize: 15,
  },
  button: {
    backgroundColor: 'black',
    marginHorizontal: '20%',
    paddingVertical: '2%',
    marginVertical: '5%',
    borderRadius: 10,
    marginBottom: '16%',
  },
});
export {DrawerContent};
