import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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

  text: {
    position: 'absolute',
    color: 'white',
    fontWeight: '800',
    fontSize: 32,
    paddingHorizontal: 40,
    marginLeft: 20,
    marginTop: 320,
    textAlign: 'center',
  },
  icon: {
    width: 93,
    height: 93,
    marginLeft: 167,
    marginTop: 480,
  },
});

export default styles;
