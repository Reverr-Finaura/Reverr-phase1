import { StyleSheet } from "react-native";
import { AppColors } from "../../../../utils";
const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    heading: {
      fontFamily:'Poppins-Bold',
        color: AppColors.FontsColor,
        textAlign: 'center',
        fontSize: 26,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:'5%',
        marginTop:'2%',
        paddingVertical:'3%',
        borderRadius:10
      },
      buttonText:{
        color: AppColors.FontsColor,
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center',
        width: '70%',
      },
      signuplink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '6%',
        justifyContent: 'center',
      },
})

export {styles};