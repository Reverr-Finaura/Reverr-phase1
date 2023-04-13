import { StyleSheet, Dimensions } from 'react-native';
import Theme from '../../utils/Theme';
import { AppColors } from '../../utils';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 3,
  },
  img: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  imgborder: {
    height: 158,
    width: 158,
    resizeMode: 'contain',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingTop: 25,
    alignItems: 'center',
  },
  titleWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  usertitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  verify: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  tag: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },
  location: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 8,
    opacity: 0.3,
  },
  cardWrapper: {
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 25},
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  likewrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 5,
    color: '#FFF',
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  floatingBanner: {
    // top: Dimensions.get('window').height / 1.7,
    resizeMode: 'contain',
    borderRadius: 8,
    bottom: 10,
    height:"6%",
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121416',
    alignSelf: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 25,
    zIndex: 3,
  },
  btn: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  btntext: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
  },
  align: {
    alignItems: 'center',
  },
  modelViewOne: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    alignSelf: 'center',
    flex: 1,
    marginVertical: 20,
    borderColor: '#0C0C0D',
    borderWidth: 1,
  },
  modelViewTwo: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    alignSelf: 'center',
  },
  modelText: {
    color: '#000',
    fontSize: 16,
    marginEnd: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  ModelBack: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

});

