import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Width = Dimensions.get('window').width;

function MentorCard({item}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ScheduleSession', {details: item})}
      style={styles.container}>
      <View style={styles.imageWrapper}>
        {item?.image !== '' && (
          <Image source={{uri: item?.image}} style={{flex: 1}} />
        )}
      </View>
      <LinearGradient
        colors={['#0A255F', '#061A46']}
        style={styles.infowrapper}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.desig}>{item?.designation}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
export default MentorCard;

const styles = StyleSheet.create({
  container: {
    height: 190,
    width: Width / 3.38,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  imageWrapper: {
    height: '60%',
    width: '100%',
  },
  infowrapper: {
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  desig: {
    color: '#FFF',
    fontWeight: '500',
    opacity: 0.6,
    fontSize: 11,
    marginTop: 1,
  },
});
