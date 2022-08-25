import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {Menu} from '../../dumy-Data/drawerMenu';
import {CustomButton} from '../CustomButton';
import {useSelector} from 'react-redux';

const DrawerContent = () => {
  const state = useSelector(state => state.UserReducer);
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
      <View style={{marginVertical: '5%', paddingHorizontal: '9%'}}>
        <FlatList
          data={Menu}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: '4%',
              }}>
              <Image source={item.icon} style={{tintColor: AppColors.BtnClr}} />
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
    borderRadius: 30,
    paddingTop: '5%',
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
