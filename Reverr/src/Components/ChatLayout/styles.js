import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    top: '20%',
    // backgroundColor: 'red',
  },
  image: {
    width: 395,
    height: 36,
    bottom: 35,
    alignSelf: 'center',
    borderRadius: 10,
  },
  text: {
    backgroundColor: '#0077b7',
    alignSelf: 'center',
    borderRadius: 10,
    width: 85,
    height: 25,
    textAlign: 'center',
    bottom: 66,
    paddingHorizontal: 18,
    color: 'white',
  },
  chatContainer: {
    position: 'absolute',
    width: 388,
    height: 424,
    right: 10,
    top: 28,
    borderRadius: 10,
  },
});

export default styles;
