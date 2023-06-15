import {StyleSheet,Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    viewicons:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
      },
    box: {
      alignSelf: 'center',
      width: Dimensions.get('window').width / 1.12,
      height: Dimensions.get('window').height / 3.99,
      marginVertical: 20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      marginHorizontal: 0,
      borderBottomLeftRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomRightRadius: 20,
      padding: 2,
      backgroundColor: '#0D0E11',
      borderWidth: 2,
      borderColor: 'dodgerblue',
    },
    ImageBack: {
      flexDirection: 'column',
      margin: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 100,
      resizeMode: 'cover',
      borderColor: '#06FF79',
      borderWidth: 2,
    },
  
    like1: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '700',
      marginHorizontal: 10,
    },
    ceo: {
      color: '#8CB2F4',
      fontSize: 16,
      fontWeight: '500',
      marginHorizontal: 10,
    },
    laction: {
      color: '#999999',
      fontSize: 12,
      fontWeight: '400',
      marginTop: 5,
      marginHorizontal: 10,
    },
    tick: {
      width: 18,
      height: 18,
      marginTop: 3,
    },
    tick1: {
      width: 25,
      height: 25,
      marginTop: 3,
    },
    hand: {
      width: 70,
      height: 60,
      marginTop: 40,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    buttonFlex:{flex:1},
    viewbutton:{marginHorizontal: 30,marginBottom:20},
    back:{textAlign:"center",marginTop:10,color:"#A6A6A6",fontSize:16,fontWeight:"500"}
  });

export default styles;
