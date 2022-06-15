import { StyleSheet,Dimensions } from "react-native";
import { AppColors } from "../../../utils";
const Height=Dimensions.get('window').height;
const Width=Dimensions.get('window').width;
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
      height: Height / 1.45,
      marginVertical: Height / 9.8,
      paddingHorizontal: '2%',
      marginHorizontal: '2.5%',
      borderRadius: 10,
    },
    dp: {
      height: Height / 7.5,
      width: Width / 5.2,
      overflow: 'hidden',
      borderRadius: 200,
      marginStart: '35%',
      marginTop: '12%',
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
      marginTop: Height / 82,
      fontFamily: 'Poppins-Regular',
      fontSize: 13,
    },
    CompanyDetails: {
      width: '100%',
      height: Height / 7,
      marginTop: '2%',
      borderBottomColor: AppColors.FontsColor,
      borderBottomWidth: 1,
    },
    title: {
      color: AppColors.FontsColor,
      fontFamily: 'Poppins-Regular',
      marginTop: '2%',
    },
    txt: {
      color: AppColors.infoFonts,
      fontFamily: 'Poppins-Regular',
      fontSize: 10,
    },
    about: {
      color: AppColors.infoFonts,
    },
  });

  export {styles};