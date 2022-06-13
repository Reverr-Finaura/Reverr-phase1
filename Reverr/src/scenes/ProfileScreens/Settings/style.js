import { AppColors } from "../../../utils";
import { Dimensions, StyleSheet } from "react-native";

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
      height: Height / 1.65,
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
    camera: {
      position: 'absolute',
      backgroundColor: AppColors.infoFonts,
      padding: 5,
      marginTop: Height / 5.4,
      marginStart: Width / 1.7,
      borderRadius: 20,
    },
  });

  export {styles};