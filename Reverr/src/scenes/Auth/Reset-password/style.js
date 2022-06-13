import { AppColors } from "../../../utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: AppColors.primarycolor,
    },
    pageInfo: {
      marginTop: 60,
      marginStart: 30,
    },
    Text: {
      fontFamily: 'Poppins-Regular',
    },
    inputHeader: {
      color: AppColors.FontsColor,
      fontFamily: 'Poppins-Regular',
      marginStart: 22,
      fontSize: 16,
    },
    container: {
      marginTop: 50,
    },
    input: {
      fontSize: 14,
      marginStart: 20,
      paddingStart: 10,
      color: AppColors.FontsColor,
      paddingTop: 0,
      marginBottom: 10,
      fontFamily: 'Poppins-Regular',
      backgroundColor: AppColors.inputFieldColor,
      marginTop: 5,
      borderRadius: 10,
      paddingBottom: 0,
      height: 50,
      width: '90%',
    },
  });

  export {styles};