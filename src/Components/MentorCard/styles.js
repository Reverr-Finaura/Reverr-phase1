import {StyleSheet, Dimensions} from 'react-native';
const With = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  card: {
    width: With / 2.25,
    height: Height / 4.3,
    borderRadius: 12,
    marginHorizontal: 10,
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: '5%',
    paddingHorizontal: '3%',
  },
  buttonContainer: {
    maxHeight: 175,
    maxWidth: 175,
    alignItems: 'center',
  },
  mentorName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    alignSelf: 'center',
    marginVertical: '3%',
  },
  mentorProfession: {
    color: 'gray',
    alignSelf: 'center',
  },
  reviewContainer: {
    marginTop: '5%',
  },
  reviews: {
    color: '#2b67f6',
    fontSize: 8,
    lineHeight: 12,
  },
});

export default styles;
