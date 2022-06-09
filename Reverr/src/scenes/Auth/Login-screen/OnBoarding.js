import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BackButton, InputField} from '../../../Components';
import {AppColors} from '../../../utils';
import {OnBoardingData} from '../../../dumy-Data/OnBoardingData';
import LinearGradient from 'react-native-linear-gradient';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const OnBoarding = () => {
  const [greeting, setGreeting] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const swipeRef = useRef(currentIndex);

  const Skip = index => {
    swipeRef.current.scrollToIndex({index: index + 1});
  };
  const chooseOption = index => {
    setCurrentIndex(index);
    swipeRef.current.scrollToIndex({index: index + 1});
  };
  console.log(currentIndex);
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
              IconSize={30}
              onPress={() => {
                setGreeting(true);
              }}
            />
            <TouchableOpacity onPress={() => Skip(currentIndex)}>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: 0, y: 1.3}}
                end={{x: 0.3, y: 0.5}}
                style={styles.container}>
                <Text style={{color: AppColors.FontsColor}}>Skip</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            ref={swipeRef}
            pagingEnabled
            data={OnBoardingData}
            renderItem={({item, index}) => (
              <View key={index} style={styles.swaiperContainer}>
                {index < 6 ? (
                  <View style={{alignItems: 'center'}}>
                    <Icon name={item.icon} color={AppColors.BtnClr} size={85} />
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.optionsContainer}>
                      {item.options.map((item, index2) => (
                        <TouchableOpacity
                          key={index2}
                          style={styles.option}
                          onPress={() => {
                            chooseOption(index);
                          }}>
                          <Text
                            style={{
                              color: AppColors.FontsColor,
                              textAlign: 'center',
                            }}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ) : (
                  <View>
                    {index == 6 && (
                      <View style={{alignItems: 'center'}}>
                        <Icon
                          name={item.icon}
                          color={AppColors.BtnClr}
                          size={85}
                        />
                        <Text
                          style={[
                            styles.title,
                            {marginHorizontal: '10%', textAlign: 'center'},
                          ]}>
                          {item.title}
                        </Text>
                        <InputField placeholder="Organisation’s Name" />
                      </View>
                    )}
                    {index == 7 && (
                      <View style={{alignItems: 'center'}}>
                        <Icon
                          name={item.icon}
                          color={AppColors.BtnClr}
                          size={85}
                        />
                        <Text
                          style={[
                            styles.title,
                            {marginHorizontal: '10%', textAlign: 'center'},
                          ]}>
                          {item.title}
                        </Text>
                        <InputField placeholder="Designation" />
                      </View>
                    )}
                    {index == 8 && (
                      <View style={{alignItems: 'center'}}>
                        <Icon
                          name={item.icon}
                          color={AppColors.BtnClr}
                          size={85}
                        />
                        <Text
                          style={[
                            styles.title,
                            {marginHorizontal: '10%', textAlign: 'center'},
                          ]}>
                          {item.title}
                        </Text>
                        <InputField placeholder="Role" />
                      </View>
                    )}
                  </View>
                )}
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
  container: {
    backgroundColor: AppColors.primarycolor,
    width: Width / 6,

    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
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
    paddingRight: '4%',
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
