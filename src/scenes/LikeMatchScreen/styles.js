import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2A72DE80',
    },
    like: {
      color: '#fff',
      fontSize: 30,
      alignItems: 'center',
      textAlign: 'center',
      marginTop: 20,
      fontWeight: '700',
    },
    like1: {
      color: '#fff',
      fontSize: 20,
      alignItems: 'center',
      textAlign: 'center',
      marginTop: 30,
      fontWeight: '700',
      marginHorizontal: 30,
    },
    ImageBack: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    },
    image: {
      width: 130,
      height: 130,
      borderRadius: 100,
      resizeMode: 'cover',
      borderColor: '#000',
      borderWidth: 5,
    },
    button:{marginHorizontal: 30,marginBottom:20}
  });

export default styles;
