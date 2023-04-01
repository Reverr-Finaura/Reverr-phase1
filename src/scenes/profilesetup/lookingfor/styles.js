import {StyleSheet} from 'react-native';
import { AppColors } from '../../../utils';

const styles = StyleSheet.create({
    titleText: {
        color: 'white',
        fontSize: 30,
        fontFamily:'Poppins-Bold',
        textAlign:'center',
        width:'90%',
        alignSelf:'center',
        marginTop:'15%'
      },
      buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:'30%'
      },
      text: {
        color: 'white',
        fontSize: 22,
        alignItems: 'center',
        fontFamily:'Poppins-Bold',
        textAlign:'center'
      },
      card:{
        backgroundColor:AppColors.FontsColor,
        marginHorizontal:'2%',
        marginVertical:'2%',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:'5%',
        paddingBottom:'2%',        paddingHorizontal:'3%',
        borderRadius:6
      }
})
export {styles}