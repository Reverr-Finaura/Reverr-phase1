import {Dimensions, StyleSheet} from 'react-native';
import {AppColors} from '../../../utils';
const Height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    backgroundColor: AppColors.primarycolor,
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
    marginTop: '20%',
    justifyContent: 'center',
  },
});

export {styles};
