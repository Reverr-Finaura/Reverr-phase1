import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../Components/Buttons/Backbutton';
import SkipButton from '../Components/Buttons/SkipButton';
import {OnBoardingData} from '../dumy-Data/OnBoardingData';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const OnBoarding = () => {
  const [greeting, setGreeting] = useState(true);
  return (
    <View style={styles.screen}>
      {greeting ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '90%',
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.headText}>
              Let’s get your profile done first !!
            </Text>
            <TouchableOpacity
              onPress={() => {
                setGreeting(false);
              }}>
              <Text style={{fontSize: 70}}>😆</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.start}>
          <View style={styles.header}>
            <BackButton
              IconSize={35}
              onPress={() => {
                setGreeting(true);
              }}
            />
            <SkipButton style={styles.skipBtn} />
          </View>
          <FlatList
            horizontal
            pagingEnabled
            data={OnBoardingData}
            renderItem={({item, index}) => (
              <View style={styles.swaiperContainer}>
                <Icon name={item.icon} color={AppColors.BtnClr} size={85} />
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.optionsContainer}>
                  {item.options.map((item, index) => (
                    <TouchableOpacity style={styles.option}>
                      <Text key={index} style={{color: AppColors.FontsColor}}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          />
        </View>
      )}
      <View style={styles.progressBar}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  headText: {
    fontSize: 35,
    color: AppColors.FontsColor,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  progressBar: {
    backgroundColor: AppColors.BtnClr,
    height: 6,
    width: '90%',
    borderRadius: 12,
    marginHorizontal: '6%',
  },
  start: {
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Height / 17,
  },
  skipBtn: {
    marginRight: '3%',
    marginTop: '5%',
  },
  swaiperContainer: {
    width: Width,
    alignItems: 'center',
    marginTop: '8%',
  },
  title: {
    color: AppColors.BtnClr,
    fontSize: 24,
    marginTop: '5%',
  },
  optionsContainer: {
    marginTop: '12%',
  },
  option: {
    paddingVertical: '5%',
    color: AppColors.FontsColor,
  },
});
export default OnBoarding;
