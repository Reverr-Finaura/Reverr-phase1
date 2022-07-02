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
import {BackButton, CustomButton, InputField} from '../../Components';
import { AppColors } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {OnBoardingData} from '../../dumy-Data/OnBoardingData';
//import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { add_user } from '../../Redux/actions';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const OnBoarding = (props) => {
  const [greeting, setGreeting] = useState(true);
  const [localstate,setLocalState]=useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousOrganisation, setPreviousOrganisation] = useState('');
  const [destination, setDestination] = useState('');
  const [role, setRole] = useState('');
  const [onBoardingData, setonBoardingData] = useState([]);
  const swipeRef = useRef(currentIndex);
  const navigation = useNavigation();
  const Email = props?.route?.params?.Email;
  const dispatch=useDispatch();
  const Skip = () => {
    setCurrentIndex(7);
    swipeRef.current.scrollToIndex({index: 8});
  };
  const chooseOption = index => {
    setCurrentIndex(index);
    swipeRef.current.scrollToIndex({index: index + 1});
  };
  //console.log(onBoardingData);
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
            <TouchableOpacity onPress={() => Skip()}>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: 0, y: 1.3}}
                end={{x: 0.3, y: 0.5}}
                style={styles.skipBtn}>
                <Text style={{color: AppColors.FontsColor}}>Skip</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            ref={swipeRef}
            pagingEnabled
            scrollEnabled={false}
            onMomentumScrollEnd={event => {
              const index = Math.floor(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width,
              );
              setCurrentIndex(index);
            }}
            data={OnBoardingData}
            renderItem={({item, index}) => (
              <View key={index} style={styles.swaiperContainer}>
                {index < 6 ? (
                  <View style={{alignItems: 'center'}}>
                    <Icon name={item.icon} color={AppColors.BtnClr} size={85} />
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.optionsContainer}>
                      {item.options.map((options, index2) => (
                        <TouchableOpacity
                          key={index2}
                          style={styles.option}
                          onPress={() => {
                            setonBoardingData(oldArray => [
                              ...oldArray,
                              options,
                            ]);
                            chooseOption(index);
                          }}>
                          <Text
                            style={{
                              color: AppColors.FontsColor,
                              textAlign: 'center',
                            }}>
                            {options}
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
                        <InputField
                          placeholder="Organisation’s Name"
                          onChangeText={e => {
                            setPreviousOrganisation(e);
                          }}
                        />
                        <CustomButton
                          onPress={() => {
                            chooseOption(index);
                          }}
                          style={{marginTop: '30%'}}
                          Title="Next"
                        />
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
                        <InputField
                          placeholder="Designation"
                          onChangeText={e => {
                            setDestination(e);
                          }}
                        />
                        <CustomButton
                          onPress={() => {
                            chooseOption(index);
                          }}
                          style={{marginTop: '30%'}}
                          Title="Next"
                        />
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
                        <InputField
                          placeholder="Role"
                          onChangeText={e => {
                            setLocalState(true);
                            setRole(e);
                          }}
                        />
                        <CustomButton
                          onPress={() => {
                            console.table(onBoardingData);
                            if(localstate==true){
                              dispatch(add_user(props.route.params.user_object));
                              navigation.replace('IndividualTab')
                            }
                          }}
                          style={{marginTop: '30%'}}
                          Title="Next"
                        />
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          />
        </View>
      )}
      <View style={styles.progressBar}>
        <View style={[styles.completed, {width: currentIndex * 52.9}]}></View>
      </View>
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
    paddingRight: '4%',
    alignItems: 'center',
    height: Height / 17,
  },
  skipBtn: {
    backgroundColor: AppColors.primarycolor,
    width: Width / 6,
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 20,
    justifyContent: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  swaiperContainer: {
    width: Width,
    alignItems: 'center',
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
  completed: {
    height: '100%',
    borderRadius: 12,
    backgroundColor: AppColors.ActiveColor,
  },
});
export {OnBoarding};
