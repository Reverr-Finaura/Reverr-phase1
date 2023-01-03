import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000c12',
    paddingTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 24,
  },
  button: {
    marginTop: 24,
    marginHorizontal: 24,
  },
  mentor: {
    alignSelf: 'center',
    bottom: 20,
    height: 170,
    width: 170,
    borderRadius: 100,
  },
  image: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    height: '30%',
    marginTop: 16,
    borderRadius: 24,
  },
  mentorName: {
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  mentorProfession: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
  },
  details: {
    position: 'relative',
    width: '95%',
    alignSelf: 'center',
    height: '18%',
    borderRadius: 10,
  },
  scheduleBtn: {
    backgroundColor: 'red',
    bottom: 32,
  },
});

export default styles;
