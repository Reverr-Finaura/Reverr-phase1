import {StyleSheet, Dimensions} from 'react-native';
import {AppColors} from '../../utils';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  wlcmConatiner: {
    paddingTop: Height / 25,
    paddingStart: Width / 13,
  },
  welcmTxt: {
    textTransform: 'capitalize',
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
  },
  subText: {
    color: AppColors.infoFonts,
    fontFamily: 'Poppins-Regular',
    width: Width / 2,
  },
  vectorContainer: {
    position: 'absolute',
    zIndex: 2,
    width: 180,
    height: Height / 4.5,
    marginStart: Width / 1.6,
  },
  vector: {
    height: Height > 684 ? '100%' : 175,
    width: 160,
  },
  menu: {
    alignItems: 'center',
    marginTop: '4%',
  },
});
