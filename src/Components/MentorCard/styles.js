import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    flexWrap: 'wrap',
    width: 175,
    height: 175,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  buttonContainer: {
    maxHeight: 175,
    maxWidth: 175,
    alignItems: 'center',
  },
  mentorProfile: {
    position: 'absolute',
    top: 8,
    alignSelf: 'center',
  },
  mentorName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center',
    lineHeight: 24,
    bottom: '48%',
    // backgroundColor: 'blue',
  },
  mentorProfession: {
    color: 'gray',
    alignSelf: 'center',
    bottom: '48%',
    // backgroundColor: 'green',
  },
  reviewContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    bottom: '42%',
    // backgroundColor: 'blue',
  },
  reviews: {
    color: '#2b67f6',
    fontSize: 8,
    lineHeight: 12,
  },
});

export default styles;
