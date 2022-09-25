import {AppColors} from '../../../utils';
import {StyleSheet, Dimensions} from 'react-native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
  },
  text: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    marginStart: '26%',
    fontSize: 25,
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: '4%',
    marginTop: '25%',
  },
  dp: {
    height: 100,
    width: 40,
    overflow: 'hidden',
    borderRadius: 200,
    marginStart: '35%',
    marginTop: '10%',
    position: 'absolute',
    backgroundColor: AppColors.CardColor,
  },
  camera: {
    position: 'absolute',
    backgroundColor: AppColors.infoFonts,
    padding: 5,
    top: '15%',
    left: '56%',
    borderRadius: 20,
  },
  loader: {
    position: 'absolute',
    marginTop: Height / 8.2,
    marginStart: Width / 2.15,
  },
  name: {
    marginTop: Height / 13,
  },
});

export {styles};
