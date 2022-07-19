import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000c12',
    // marginHorizontal: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    marginTop: 32,
    marginHorizontal: 24,
  },
  header: {
    top: 16,
    marginLeft: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  plans: {
    left: 8,
    marginLeft: 16,
    marginTop: 100,
  },
  text: {
    color: 'white',
    right: '70%',
    top: '45%',
  },
});

export default styles;
