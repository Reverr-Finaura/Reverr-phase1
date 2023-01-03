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
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,

    paddingHorizontal: '3%',
    paddingVertical: '3%',
  },
  postContainer: {
    paddingVertical: '5%',
  },
  creatorDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: '3%',
    justifyContent: 'space-between',
  },
  dp: {
    resizeMode: 'contain',
    height: 44,
    width: 44,
    borderRadius: 44 / 2,
  },
  name: {
    color: AppColors.ActiveColor,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 19,
    marginLeft: '3%',
  },
  company: {
    color: AppColors.infoFonts,
    fontFamily: 'Poppins-Regular',
  },
  image: {
    width: '100%',
    height: Height / 4,
    borderRadius: 10,
  },
  details: {
    marginVertical: '5%',
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  createBtn: {
    bottom: 20,
    right: 12,
  },
  IconContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: '0%',
    borderTopColor: 'gray',
    borderTopWidth: 1,
    borderBottomColor: AppColors.FontsColor,
    borderBottomWidth: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
});

export {styles2};
