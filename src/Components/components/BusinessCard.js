import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BulletPoint from './BulletPoint';
import ButtonStroke from './ButtonStroke';
import Theme from '../../utils/Theme';
import Stars from './Stars';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

function BusinessCard({fulldetails, key}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() =>
        navigation.navigate('ScheduleSession', {details: fulldetails})
      }>
      <LinearGradient
        key={key}
        colors={['#030F2D', '#0A255F']}
        style={styles.container}>
        <View style={styles.halfWrapper}>
          <Image
            source={{uri: fulldetails?.image}}
            style={{width: 75, height: 75, borderRadius: 100}}
          />
          <Text style={styles.title}>{fulldetails?.name}</Text>
          <Text style={styles.desc}>{fulldetails?.designation}</Text>

          <View style={{alignfulldetailss: 'center', marginTop: 10}}>
            <Stars rating={fulldetails?.Rating} />
            <Text
              style={{color: Theme.primaryColor, fontSize: 10, marginTop: 5}}>
              {/* {itereviews} Reviews */}
            </Text>
          </View>
        </View>
        <View style={styles.halfWrapper2}>
          <Text style={styles.title}>{fulldetails?.industry}</Text>
          <View style={{paddingVertical: 10}}>
            <BulletPoint title={fulldetails.domain[0]} />
            <BulletPoint title={fulldetails.domain[1]} />
          </View>
          <ButtonStroke
            handlePress={() =>
              navigation.navigate('ScheduleSession', {details: fulldetails})
            }
            haveicon={true}
            label={'Schedule Session'}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
export default BusinessCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: '100%',
    borderRadius: 15,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  halfWrapper: {
    width: '50%',
    paddingHorizontal: 20,
    alignfulldetailss: 'center',
  },
  halfWrapper2: {
    width: '50%',
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  title: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
  },
  desc: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 5,
    opacity: 0.5,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
});
