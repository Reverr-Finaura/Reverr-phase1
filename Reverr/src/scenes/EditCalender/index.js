import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Switch,
    ToastAndroid
  } from 'react-native';
  import React, {useState,useEffect,useContext} from 'react';
  import { AppColors } from '../../utils';
  import { BackButton } from '../../Components';
  import LinearGradient from 'react-native-linear-gradient';
  import { CustomButton } from '../../Components';
  import {useNavigation} from '@react-navigation/native';
  import { Button } from 'react-native-paper';
  import firestore from '@react-native-firebase/firestore';
  import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
  //import { UserContext } from '../../App';
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;
  
  const EditCalender = () => {
    //const {state, dispatch} = useContext(UserContext);
    const state=useSelector(state=>state.UserReducer);
    const [workingHour, setworkingHour] = useState(true);
    const [calendar, setCalendar] = useState(false);
    const [sunday, setSunday] = useState(false);
    const [monday, setMonday] = useState(true);
    const [tuesday, setTuesday] = useState(true);
    const [wednesday, setWednesday] = useState(true);
    const [thrusday, setThrusday] = useState(true);
    const [friday, setFriday] = useState(true);
    const [satuarday, setSatuarday] = useState(false);
    const [availability,setAvailability]=useState([0,1,1,1,1,1,1]);
    const [change,setChange]=useState(1);
    const navigation = useNavigation();
  
  
    const showToast = (msg) => {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    };
  
    useEffect(() => {
      var switchChangeRecorder=[];
      switchChangeRecorder[0]=sunday?1:0;
      switchChangeRecorder[1]=monday?1:0;
      switchChangeRecorder[2]=tuesday?1:0;
      switchChangeRecorder[3]=wednesday?1:0;
      switchChangeRecorder[4]=thrusday?1:0;
      switchChangeRecorder[5]=friday?1:0;
      switchChangeRecorder[6]=satuarday?1:0;
      setAvailability(switchChangeRecorder);
    }, [change]);
    const handleSaveState=()=>{
        console.log('I am clicked')
        firestore().collection("Users").doc(state.user.email).update({
          availability:availability
        }).then(()=>{
          console.log("success");
          showToast("Availability saved succerssfully!");
        }).catch(e=>{
          showToast("Error in updating availability!");
        })
        //console.log(state.email)
    }
    return (
      <View style={styles.screen}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BackButton
            IconSize={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headerTitle}>Availability</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '2%',
            paddingVertical: '3%',
            marginTop: '4%',
            marginHorizontal: '2%',
            borderBottomColor: AppColors.CardColor,
            borderBottomWidth: 3,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomButton
            Title="Working hours"
            style={styles.btn}
            TextStyle={{
              color: workingHour ? 'red' : AppColors.FontsColor,
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
            }}
            onPress={() => {
              setworkingHour(true);
              setCalendar(false);
            }}
          />
          <CustomButton
            Title="Calendar"
            style={styles.btn}
            TextStyle={{
              color: calendar ? 'red' : AppColors.FontsColor,
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
            }}
            onPress={() => {
              setworkingHour(false);
              setCalendar(true);
            }}
          />
        </View>
        <ScrollView>
       
        {workingHour ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '8%',
                justifyContent: 'space-evenly',
              }}>
              <Switch
                trackColor={{false: '#767577', true: AppColors.ActiveColor}}
                thumbColor={sunday ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setSunday(previousState => !previousState);
                  setChange(!change);
                }}
                value={sunday}
              />
              <Text style={{color: AppColors.FontsColor}}>Sunday</Text>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: -0.7, y: 1.3}}
                end={{x: 1, y: 0.5}}
                style={styles.Container}>
                {sunday ? (
                  <Text style={{color: AppColors.ActiveColor}}>
                    9:00am-5:00pm
                  </Text>
                ) : (
                  <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
                )}
              </LinearGradient>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '8%',
                justifyContent: 'space-evenly',
              }}>
              <Switch
                trackColor={{false: '#767577', true: AppColors.ActiveColor}}
                thumbColor={monday ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setMonday(previousState => !previousState);
                  setChange(!change);
                }}
                value={monday}
              />
              <Text style={{color: AppColors.FontsColor}}>Monday</Text>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: -0.7, y: 1.3}}
                end={{x: 1, y: 0.5}}
                style={styles.Container}>
                {monday ? (
                  <Text style={{color: AppColors.ActiveColor}}>
                    9:00am-5:00pm
                  </Text>
                ) : (
                  <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
                )}
              </LinearGradient>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '8%',
                justifyContent: 'space-evenly',
              }}>
              <Switch
                trackColor={{false: '#767577', true: AppColors.ActiveColor}}
                thumbColor={tuesday ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setTuesday(previousState => !previousState);
                  setChange(!change);
                }}
                value={tuesday}
              />
              <Text style={{color: AppColors.FontsColor}}>Tuesday</Text>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: -0.7, y: 1.3}}
                end={{x: 1, y: 0.5}}
                style={styles.Container}>
                {tuesday ? (
                  <Text style={{color: AppColors.ActiveColor}}>
                    9:00am-5:00pm
                  </Text>
                ) : (
                  <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
                )}
              </LinearGradient>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '8%',
                justifyContent: 'space-evenly',
              }}>
              <Switch
                trackColor={{false: '#767577', true: AppColors.ActiveColor}}
                thumbColor={wednesday ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setWednesday(previousState => !previousState);
                  setChange(!change);
                }}
                value={wednesday}
              />
              <Text style={{color: AppColors.FontsColor}}>Wednesday</Text>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: -0.7, y: 1.3}}
                end={{x: 1, y: 0.5}}
                style={styles.Container}>
                {wednesday ? (
                  <Text style={{color: AppColors.ActiveColor}}>
                    9:00am-5:00pm
                  </Text>
                ) : (
                  <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
                )}
              </LinearGradient>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '8%',
                justifyContent: 'space-evenly',
              }}>
              <Switch
                trackColor={{false: '#767577', true: AppColors.ActiveColor}}
                thumbColor={thrusday ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setThrusday(previousState => !previousState);
                  setChange(!change);
                }}
                value={thrusday}
              />
              <Text style={{color: AppColors.FontsColor}}>Thrusday</Text>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: -0.7, y: 1.3}}
                end={{x: 1, y: 0.5}}
                style={styles.Container}>
                {thrusday ? (
                  <Text style={{color: AppColors.ActiveColor}}>
                    9:00am-5:00pm
                  </Text>
                ) : (
                  <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
                )}
              </LinearGradient>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '8%',
                justifyContent: 'space-evenly',
              }}>
              <Switch
                trackColor={{false: '#767577', true: AppColors.ActiveColor}}
                thumbColor={friday ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setFriday(previousState => !previousState);
                  setChange(!change);
                }}
                value={friday}
              />
              <Text style={{color: AppColors.FontsColor}}>Friday</Text>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: -0.7, y: 1.3}}
                end={{x: 1, y: 0.5}}
                style={styles.Container}>
                {friday ? (
                  <Text style={{color: AppColors.ActiveColor}}>
                    9:00am-5:00pm
                  </Text>
                ) : (
                  <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
                )}
              </LinearGradient>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '8%',
                justifyContent: 'space-evenly',
              }}>
              <Switch
                trackColor={{false: '#767577', true: AppColors.ActiveColor}}
                thumbColor={satuarday ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setSatuarday(previousState => !previousState);
                  setChange(!change);
                }}
                value={satuarday}
              />
              <Text style={{color: AppColors.FontsColor}}>Satuarday</Text>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: -0.7, y: 1.3}}
                end={{x: 1, y: 0.5}}
                style={styles.Container}>
                {satuarday ? (
                  <Text style={{color: AppColors.ActiveColor}}>
                    9:00am-5:00pm
                  </Text>
                ) : (
                  <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
                )}
              </LinearGradient>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.headerTitle}>Here Write code For Calendar</Text>
          </View>
        )}
         <View>
          <Button onPress={handleSaveState}>Save</Button>
        </View>
        </ScrollView>
        
      </View>
    );
  };
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: AppColors.primarycolor,
    },
    headerTitle: {
      color: AppColors.FontsColor,
      marginStart: '5%',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18,
    },
    Container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '6%',
      width: Width / 2,
      paddingVertical: '3%',
      borderRadius: 20,
    },
    btn: {
      width: Width / 2.3,
      paddingVertical: 7,
    },
    btntext: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
    },
  });
  export {EditCalender};
  