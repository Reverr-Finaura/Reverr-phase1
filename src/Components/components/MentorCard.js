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
          <Image source={{uri: item?.image}} style={{flex: 1,height:'50%',width:'60%',borderRadius:160}} />
        )}
      </View>
      <LinearGradient
         colors={['#202020', '#202020']}
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
   backgroundColor:'#202020',
    height: 120,
    width: Width / 4,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  imageWrapper: {
    paddingLeft:8,
    padding:5,
    width: '160%',
    height: '70%',
    borderWidth: 2,

  },
  infowrapper: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize:10,
    color: '#FFF',
  },
  desig: {
    textAlign:'justify',
    color: '#FFF',
    fontWeight: '500',
    opacity: 0.6,
    fontSize: 7,
    marginTop: 1,
  },

});
