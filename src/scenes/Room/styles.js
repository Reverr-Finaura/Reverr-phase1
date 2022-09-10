import {Dimensions, StyleSheet} from 'react-native';
import {AppColors} from '../../utils';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const styles2 = StyleSheet.create({
  screen: {},
  header: {
    flexDirection: 'row',
  },
  btnContainer: {
    marginTop: '2.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  btn: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    borderRadius: 10,
  },
  postCard: {
    marginTop: '4%',
    alignSelf:'center',
    width:325,
    borderRadius: 10,
    marginHorizontal: '2%',
    paddingHorizontal: '3%',
    paddingVertical: '3%',
  },
  postContainer: {
    paddingVertical: '5%',
  },
  creatorDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dp: {
    height: Height / 16,
    width: Width / 10,
    borderRadius: 56,
  },
  name: {
    color: AppColors.ActiveColor,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 19,
    marginLeft:12,
  },
  company: {
    marginLeft:12,
        color: AppColors.infoFonts,
    fontFamily: 'Poppins-Regular',
  },
  image: {
    width: '100%',
    height: Height / 4,
    borderRadius: 10,
  },
  details: {
    marginTop: '3%',
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginLeft:60,
  },
  createBtn: {
    bottom: 20,
    right: 12,
  },
  IconContainer: {
    flexDirection: 'row',
    alignSelf:'center',
    paddingVertical: '2%',
    justifyContent: 'space-between',
  },
});

export {styles2};
