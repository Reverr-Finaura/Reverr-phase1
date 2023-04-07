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
import Theme from '../../utils/Theme';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

function RegularHeader({title, leftHandlePress}) {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#1B1D8B', Theme.backgroundColor]}
      style={styles.container}>
      <TouchableOpacity onPress={leftHandlePress}>
        <Image source={Theme.arrowleft} style={styles.arrow} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity />
    </LinearGradient>
  );
}
export default RegularHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    paddingVertical: '4%',
    paddingBottom: '8%',
  },
  arrow: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
});
