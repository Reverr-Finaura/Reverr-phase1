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
  titleText: {
    marginBottom: 10,
    color: 'white',
    fontSize: 20,
    left: 8,
    fontWeight: '700',
  },
  textInput: {
    marginBottom: 8,
    paddingHorizontal: 100,
    marginTop: 30,
    fontSize: 15,
    color: 'white',
    width: 388,
    height: 165,
    left: 2,
  },
  textContainer: {
    width: 272,
    height: 33,
    left: 8,
    marginTop: 48,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '800',
    fontSize: 22,
    alignItems: 'center',
    lineHeight: 33,
  },
  verification: {
    position: 'absolute',
    height: 40,
    left: 300,
  },
});

export default styles;
