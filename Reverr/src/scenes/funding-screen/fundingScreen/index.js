import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {CustomButton} from '../../../components';
import {AppColors} from '../../../utils';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const FundingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Image
        style={styles.img}
        source={require('../../../assets/images/applyfunding.png')}
      />
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: 0, y: 1.3}}
        end={{x: 0, y: 0.5}}
        style={styles.card}>
        <Text style={styles.title}>Funding</Text>
        <Text style={styles.subtext}>
          Market Research Mentor is the terminal where all industrial,
          commercial and profitmaking venture will get the best research reports
          of the market in all sectors like automotive, electronics,
          pharmaceuticals and healthcare, food and beverages etc.
        </Text>
      </LinearGradient>
      <CustomButton
        style={styles.button}
        Title="Apply For Funding"
        onPress={() => {
          navigation.navigate('FundingForm');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
    alignItems: 'center',
  },
  title: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  img: {
    width: Width / 1.2,
    height: Height / 2.1,
  },
  card: {
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    alignItems: 'center',
    marginHorizontal: '2%',
    borderRadius: 10,
  },
  subtext: {
    color: AppColors.infoFonts,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    paddingVertical: '3%',
    paddingHorizontal: '2%',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginTop: '8%',
    borderRadius: 10,
  },
});

export {FundingScreen};
