import {StyleSheet} from 'react-native';
import { AppColors } from '../../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:16,
    backgroundColor: '#000c12',
  },
  backButton: {
    position: 'absolute',
    width: 28,
    height: 28,
    left: 8,
    top: 33,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily:'Poppins-Bold',
    textAlign:'center',
    width:'50%',
    alignSelf:'center',
    marginTop:'15%'
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:'20%'
  },
  textInput: {
    marginBottom: 8,
    paddingHorizontal: 100,
    marginTop: 30,
    fontSize: 15,
    color: 'white',
    width: 388,
    height: 165,
    left: 2,
  },
  inputContainer: {
    marginTop:'10%',
    paddingHorizontal:'5%'
  },
  input:{
    backgroundColor: 'rgba(145, 145, 145,0.5)',
    borderRadius: 7,
    fontSize: 17,
    paddingHorizontal:10,
    lineHeight: 23,
    textAlignVertical: 'top',
    color:AppColors.FontsColor,
    fontFamily:'Poppins-Regular',
  },
  text: {
    color: 'white',
    fontSize: 22,
    alignItems: 'center',
    fontFamily:'Poppins-Bold',
    textAlign:'center'
  },
  inputTitle: {
    fontFamily:'Poppins-Regular',
    fontSize:18,
    color:AppColors.FontsColor,
    marginVertical:'3%'
  },
});

export default styles;
