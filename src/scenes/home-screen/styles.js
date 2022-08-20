import {StyleSheet, Dimensions} from 'react-native';
import {AppColors} from '../../utils';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  wlcmConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '5%',
    paddingStart: '5%',
  },
  welcmTxt: {
    textTransform: 'capitalize',
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
  },
  dp: {
    width: '40%',
    height: '30%',
  },
});
