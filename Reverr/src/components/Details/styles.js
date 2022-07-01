import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 8,
    padding: 8,
    marginBottom: 8,
    bottom: 10,
    borderRadius: 10,
  },
  button: {
    padding: 6,
  },
  buttonActive: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  textActive: {fontSize: 16, fontWeight: '400', color: 'black'},
});

export default styles;
