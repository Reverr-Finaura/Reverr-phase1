import { StyleSheet } from "react-native";
import { AppColors } from "../../../../utils";
const styles = StyleSheet.create({
    screen: {
      flex:1,
      backgroundColor: AppColors.primarycolor,
    },
    heading: {
      fontFamily:'Poppins-Bold',
      color: AppColors.FontsColor,
      textAlign: 'center',
      fontSize: 29,
    },
    
    activity:{
      height:"100%",
      width:"100%",
      backgroundColor:AppColors.primarycolor,
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center'
    },
    mainScreen:{
      flex: 1,
      backgroundColor: AppColors.primarycolor,
      justifyContent:'center',
      alignItems:'center',
    },
    pageInfo: {
      marginTop: 10,
      marginStart: 30,
    },
    Text: {
      fontFamily: 'Poppins-Regular',
    },
    inputstyle: {
      marginTop: '3%',
      color:'#fff'
    },
    signuplink: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '7%',
      justifyContent: 'center',
    },
  });

  export {styles};