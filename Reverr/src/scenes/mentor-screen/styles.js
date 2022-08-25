import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000c12',
    paddingHorizontal: 8,
  },
  image: {
    width: '100%',
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
});

export default styles;
