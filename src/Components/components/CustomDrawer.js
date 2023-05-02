import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../utils/Theme';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

function CustomDrawer(props) {
  const state = useSelector(state => state.UserReducer);
  const [hasPremiumOfVibe, setHasPremiumOfVibe] = useState(false);
  const navigation = useNavigation();

  useEffect(()=>{
    if (state.user.hasVibePremium) {
      if (state.user.hasVibePremium === true) {
        state.user.Premium.map(item => {
          if (item.id === 'VIBE') {
            if (
              new Date(item.DateOfExpiry.seconds * 1000) >= new Date()
            ) {
              setHasPremiumOfVibe(true);
            }
          }
        });
      }
    }
  },[])

  return (
    <LinearGradient
      colors={['#1B1D8B', Theme.backgroundColor]}
      style={styles.container}>
      <View style={styles.contentHolder}>
        <LinearGradient
          colors={['#3D85E3', '#79C0F2']}
          style={styles.imgborder}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={{uri: state?.user?.image}} style={styles.img} />
          </TouchableOpacity>
        </LinearGradient>
        <View>
          <View
            style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.usertitle}>{state?.user?.name}</Text>
            {state?.user?.verified? <Image source={Theme.verify} style={styles.verify} />: null}
          </View>
        </View>
      </View>

      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {!hasPremiumOfVibe? 
      <View style={styles.label}>
        <Text style={styles.labeltext}>Upgrade to Premium</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('premiumPlans')}
          style={styles.upgd}>
          <Text style={{fontSize: 14, color: '#FFF', fontWeight: 'bold'}}>
            Upgrade
          </Text>
        </TouchableOpacity>
      </View>
      :null}
    </LinearGradient>
  );
}
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 110,
    width: 110,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  imgborder: {
    height: 115,
    width: 115,
    resizeMode: 'contain',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  contentHolder: {
    alignItems: 'center',
    paddingTop: '25%',
  },
  usertitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  verify: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  label: {
    width:"100%",
    position: 'absolute',
    bottom: '8%',
    alignItems: 'center',
  },
  labeltext: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  upgd: {
    resizeMode: 'contain',
    borderRadius: 100,
    width: '75%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColor,
    alignSelf: 'center',
    marginTop: 15,
  },
});
