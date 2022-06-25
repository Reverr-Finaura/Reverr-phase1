import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000c12',
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
    bottom: 38,
  },
  image: {
    width: '90%',
    alignSelf: 'center',
    height: '12%',
    marginTop: 16,
    borderRadius: 24,
    bottom: 42,
  },
  mentorName: {
    color: 'white',
    alignSelf: 'center',
    bottom: '16%',
    fontSize: 24,
    fontWeight: '600',
  },
  mentorProfession: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    bottom: '16%',
  },
  details: {
    position: 'relative',
    width: '95%',
    alignSelf: 'center',
    height: '18%',
    borderRadius: 10,
  },
});

export default styles;
