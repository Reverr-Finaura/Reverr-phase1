import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../../utils';

const HeaderLayout = props => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <View style={styles.Container}>
        <TouchableOpacity style={styles.dp} onPress={props.onPressDp}>
          <Image
            style={{
              height: 40,
              width: 40,
              backgroundColor: AppColors.primarycolor,
              borderRadius: 200,
            }}
            source={require('../../assets/images/dp.jpg')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onPressCalander}
          style={styles.calender}>
          <Icon name="calendar-alt" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.logo}>
          <Image
            style={{
              height: 90,
              width: 90,
            }}
            source={require('../../assets/images/Logo.png')}
          />
        </View>
        <TouchableOpacity
          onPress={props.onPressNoti}
          style={styles.notification}>
          <Icon name="bell" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onPressChat} style={styles.chat}>
          <Ionic name="chatbox-ellipses-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    height: '10%',
  },
  calender: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: AppColors.primarycolor,
  },
  notification: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chat: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {HeaderLayout};
