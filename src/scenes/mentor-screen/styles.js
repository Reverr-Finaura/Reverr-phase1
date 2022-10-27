import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000c12',
    paddingHorizontal: 8,
  },
  image: {
    width: '40%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginHorizontal: '27%',
    fontSize: width > 400 ? 20 : 16,
    fontWeight: '700',
  },
  card: {
    flex: 1,
    width: Dimensions.get('window').width / 1.1,
  },
  Card: {
    width: '46%',
    height: Height / 10,
    margin: '2%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
