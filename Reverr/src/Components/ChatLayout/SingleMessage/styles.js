import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    left: 8,
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 8,

    color: 'white',
    // backgroundColor: 'blue',
  },
  message: {
    color: '#939292',
    maxWidth: '45%',
    fontSize: 12,
  },
  time: {
    color: '#939292',
    fontSize: 12,
  },
});

export default styles;
