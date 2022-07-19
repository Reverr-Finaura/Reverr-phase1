import {StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../utils';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  mentors: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  backButton: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 32,
  },
});

export default styles;
