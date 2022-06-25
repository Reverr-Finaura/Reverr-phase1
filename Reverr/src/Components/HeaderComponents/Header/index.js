import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../../../utils';

const Header = props => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.dp} onPress={props.onPressDp}>
        <Image
          style={{
            height: 40,
            width: 40,
            backgroundColor: AppColors.primarycolor,
            borderRadius: 200,
          }}
          source={{uri: props.DpUrl}}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressCalander} style={styles.calender}>
        <Icon name="calendar-alt" size={28} color="white" />
      </TouchableOpacity>
      <View style={styles.logo}>
        <Image
          style={{
            height: 90,
            width: 90,
          }}
          source={require('../../../assets/images/logo.png')}
        />
      </View>
      <TouchableOpacity onPress={props.onPressNoti} style={styles.notification}>
        <Icon name="bell" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressChat} style={styles.chat}>
        <Ionic name="chatbox-ellipses-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
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

export {Header};
