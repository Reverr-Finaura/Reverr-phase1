import { Dimensions, StyleSheet } from "react-native";
import { AppColors } from "../../utils";
const Height=Dimensions.get('window').height;
const Width=Dimensions.get('window').width;

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: AppColors.primarycolor,
    },
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
      borderRadius: 20,
      marginHorizontal: '2%',
      paddingHorizontal: '3%',
      paddingVertical: '3%',
    },
    postContainer: {
      marginTop: 10,
      paddingVertical: '5%',
      borderTopColor: AppColors.FontsColor,
      borderTopWidth: 2,
      borderBottomColor: AppColors.FontsColor,
      borderBottomWidth: 2,
    },
    creatorDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dp: {
      height: Height / 14,
      width: Width / 7,
      borderRadius: 56,
    },
    name: {
      color: AppColors.FontsColor,
      fontFamily: 'Poppins-Regular',
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
      marginTop: '3%',
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
      paddingVertical: '2%',
    },
  });

  export {styles};