import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000c12',
  },
  backButton: {
    position: 'absolute',
    width: 28,
    height: 28,
    left: 8,
    top: 33,
  },
  textContainer: {
    width: 272,
    height: 33,
    top: 167,
    left: 42,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '800',
    fontSize: 22,
    alignItems: 'center',
    lineHeight: 33,
  },
  verification: {
    position: 'absolute',
    height: 46.34,
    left: 250,
  },
});
