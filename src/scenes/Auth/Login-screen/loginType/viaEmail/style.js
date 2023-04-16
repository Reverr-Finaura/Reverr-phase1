import {Dimensions, StyleSheet} from 'react-native';
import {AppColors} from '../../../../../utils';
const Height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    color: AppColors.FontsColor,
    textAlign: 'center',
    fontSize: 29,
    marginTop: '1%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginTop: '5%',
    paddingVertical: '3%',
    borderRadius: 10,
  },
  buttonText: {
    color: AppColors.FontsColor,
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    width: '70%',
  },
  pageInfo: {
    marginTop: '2%',
  },
  Text: {
    marginEnd: '40%',
  },
  forgetpass: {
    marginTop: '10%',
    alignItems: 'center',
  },
  fg: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  signuplink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    justifyContent: 'center',
  },
});

export {styles};
