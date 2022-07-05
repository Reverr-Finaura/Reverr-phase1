import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
    top: 92,

    // backgroundColor: 'blue',
  },
  mentorProfession: {
    color: 'gray',
    alignSelf: 'center',
    top: 94,
    // backgroundColor: 'green',
  },
  reviewContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    top: 95,
    marginHorizontal: 8,
    // backgroundColor: 'blue',
  },
  reviews: {
    color: '#2b67f6',
    fontSize: 8,
    lineHeight: 12,
  },
});

export default styles;
