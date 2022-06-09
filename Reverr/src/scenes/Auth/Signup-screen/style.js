import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils";
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: AppColors.primarycolor,
    },
    pageInfo: {
      marginTop: 10,
      marginStart: 30,
    },
    Text: {
      fontFamily: 'Poppins-Regular',
    },
    inputstyle: {
      marginTop: 0,
      marginBottom: -10,
    },
    signuplink: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '7%',
      justifyContent: 'center',
    },
  });

  export {styles};