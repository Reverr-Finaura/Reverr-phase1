import {Dimensions, StyleSheet} from 'react-native';
import {AppColors} from '../../../utils';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  mainscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: Height / 1.45,
    marginVertical: Height / 9.8,
    paddingHorizontal: '2%',
    marginHorizontal: '2.5%',
    borderRadius: 10,
  },
  dp: {
    height: 130,
    width: 130,
    overflow: 'hidden',
    borderRadius: 200,
    left: '10%',
    position: 'absolute',
    backgroundColor: AppColors.CardColor,
  },
  topIcons: {
    flexDirection: 'row',
    paddingTop: '2%',
    marginHorizontal: '1%',
  },
  text: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  CompanyDetails: {
    width: '100%',
    marginTop: '2%',
    borderBottomColor: AppColors.FontsColor,
    borderBottomWidth: 1,
  },
  title: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
  },
  txt: {
    color: AppColors.infoFonts,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    paddingBottom: '3%',
  },
  about: {
    color: AppColors.infoFonts,
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: '7%',
    paddingVertical: '3%',
    borderRadius: 5,
  },
});

export {styles};
