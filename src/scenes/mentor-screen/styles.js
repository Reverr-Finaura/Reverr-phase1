import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
const width=Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000c12',
    paddingHorizontal: 8,
  },
  image: {
    width:"100%",
    height: width>400?"24%":"20%",
    marginTop: 16,
    borderRadius: 10,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  text: {
    color: 'white',
    bottom: '14%',
    marginHorizontal: '27%',
    fontSize:width>400?20:16,
    fontWeight: '700',
  },
});

export default styles;
