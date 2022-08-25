import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: '#2C313F',
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 15,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  message: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '500',
  },
  time: {
    color: 'white',
    fontSize: 12,
  },
});

export default styles;
