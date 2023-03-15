import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../../Components';
import {AppColors} from '../../../utils';

const ReadingInstruction = props => {
  const bookData = props.route.params.BookData;
  const moduleNumber = props.route.params.moduleNumber;
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.replace('OpenBook', {
      BookData: bookData.slides,
      moduleNumber:moduleNumber
    });
  }, 1000);
 // console.log(bookData,"sjdjshdj");
  return (
    <View style={styles.screen}>
      <BackButton IconSize={30} style={{marginVertical: '5%'}} />
      <View style={{flex: 1, paddingHorizontal: '4%', paddingVertical: '2%'}}>
        <View style={styles.container}>
          <View style={styles.p}>
            <Text style={styles.text}>Tap to go back</Text>
          </View>
          <View style={styles.n}>
            <Text style={styles.text}>Tap to go forward</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  container: {
    backgroundColor: AppColors.BtnClr,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 30,
  },
  p: {
    width: '40%',
    marginVertical: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '20%',
    borderRightColor: 'gray',
    borderRightWidth: 4,
  },
  n: {
    width: '50%',
    marginVertical: '20%',
    paddingTop: '20%',
    paddingStart: '12%',
  },
  text: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
  },
});
export {ReadingInstruction};
