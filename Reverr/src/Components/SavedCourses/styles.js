import {StyleSheet} from 'react-native';
import {AppColors} from '../../utils';

const styles = StyleSheet.create({
  Container: {
    // width: '100%',
    // borderRadius: 10,
    // marginBottom: 10,
    // backgroundColor: AppColors.BtnClr,
    elevation: 5,
  },
  heading: {
    paddingTop: 16,
    paddingBottom: 16,
    marginHorizontal: 16,
  },
  text: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  Card: {
    backgroundColor: AppColors.CardColor,
    padding: 8,
    marginHorizontal: 8,
    marginVertical: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
  },
  dp: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
  },
  Name: {
    color: AppColors.FontsColor,
    // width: '50%',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    paddingTop: 7,
  },
  skills: {
    color: 'gray',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
  },
});

export default styles;
