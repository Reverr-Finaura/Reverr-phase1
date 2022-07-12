import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Switch,
    ToastAndroid,
    Platform
  } from 'react-native';
  import React, {useState,useEffect,useRef} from 'react';
  import { AppColors } from '../../utils';
  import { BackButton } from '../../Components';
  // import TimePicker from 'react-native-simple-time-picker';
  import LinearGradient from 'react-native-linear-gradient';
  import { CustomButton } from '../../Components';
  import {useNavigation} from '@react-navigation/native';
  import { Button } from 'react-native-paper';
  import firestore from '@react-native-firebase/firestore';
  import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { CalanderScreen } from '..';
import auth from '@react-native-firebase/auth';
//import RBSheet from "react-native-raw-bottom-sheet";
import DateTimePicker from '@react-native-community/datetimepicker';
//import RNDateTimePicker from '@react-native-community/datetimepicker';
  //import { UserContext } from '../../App';
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;
  
  const EditCalender = () => {
    const [selectedHours, setSelectedHours] = useState(0);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
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
    const [day,setDay]=useState('');
    const [From, setFrom] = useState(new Date());
  const [To, setTo] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [currentSetting, setcurrentSetting] = useState('from');
    const [time,setTime]=useState('00:00am');
  const dayarr=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  const [timearr,setTimeArray]=useState(['9:00am','9:00am','9:00am','9:00am','9:00am','9:00am','9:00am']);
    const showToast = (msg) => {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    };


    const showMode=(currentMode)=>{
      setShow(true);
      setMode(currentMode);
    }
    
  const onChange = (event, selectedDate) => {
    if (currentSetting === 'from') {
      const currentDate = selectedDate || From;
      setShow(Platform.OS === 'ios');
      setFrom(currentDate);
      var time_selected=currentDate.toLocaleTimeString().toString().split(":");
      var abriviation=time_selected[0]>12 && time_selected[1]>0?"pm":"am";
      const t=time_selected[0]%12 +":"+ time_selected[1]+abriviation;
      console.log(t);
      var time_basket=[];
      for(let i=0;i<7;i++){
        if(dayarr.indexOf(day)==i){
            time_basket.push(t);
        }else{
          time_basket.push(timearr[i]);
        }
      }
      setTimeArray(time_basket);
      console.log(time_basket);
      console.log(timearr)
    } else {
      const currentDate = selectedDate || To;
      setShow(Platform.OS === 'ios');
      setTo(currentDate);
    }
  };

  const showTimePicker = (current) => {
    setShow(true);
    setcurrentSetting(current);
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
        //console.log(state.user.email);
        firestore().collection("Users").doc(state.user.email).update({
          availability:availability
        }).then(()=>{
          console.log("success");
          showToast("Availability saved succerssfully!");
        }).catch(e=>{
          console.log(e.message);
          showToast("Error in updating availability!");
          //auth().signOut()
        })
        //console.log(state.email)
    }
    // takeTime=(event,time)=>{
    //   setTime(time);
    //   console.log(time);
    // }
    //const refRBSheet = useRef();
    return (
      <View style={styles.screen}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BackButton
            IconSize={30}
            onPress={() => {
              navigation.goBack();
              // auth().signOut()
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
                  <TouchableOpacity onPress={()=>{
                    setDay('sunday');
                    showTimePicker('from')}}>
                  <Text style={{color: AppColors.ActiveColor}}>
                    {timearr[0]}-5:00pm
                  </Text>
                  </TouchableOpacity>
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
                    <TouchableOpacity onPress={()=>{
                      setDay('monday');
                      showTimePicker('from')}}>
                  <Text style={{color: AppColors.ActiveColor}}>
                    {timearr[1]}-5:00pm
                  </Text></TouchableOpacity>
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
                  <TouchableOpacity onPress={()=>{
                    setDay('tuesday');
                    showTimePicker('from')}}>
                  <Text style={{color: AppColors.ActiveColor}}>
                    {timearr[2]}-5:00pm
                  </Text></TouchableOpacity>
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
                  <TouchableOpacity onPress={()=>{
                    setDay('wednesday');
                    showTimePicker('from')}}>
                  <Text style={{color: AppColors.ActiveColor}}>
                    {timearr[3]}-5:00pm
                  </Text></TouchableOpacity>
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
                  <TouchableOpacity onPress={()=>{
                    setDay('thursday');
                    showTimePicker('from')}}>
                  <Text style={{color: AppColors.ActiveColor}}>
                    {timearr[4]}-5:00pm
                  </Text>
                  </TouchableOpacity>
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
                  <TouchableOpacity onPress={()=>{
                    setDay('friday');
                    showTimePicker('from')}}>
                  <Text style={{color: AppColors.ActiveColor}}>
                    {timearr[5]}-5:00pm
                  </Text>
                  </TouchableOpacity>
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
                  <TouchableOpacity onPress={()=>{
                    setDay('saturday');
                    showTimePicker('from')}}>
                  <Text style={{color: AppColors.ActiveColor}}>
                    {timearr[6]}-5:00pm
                  </Text></TouchableOpacity>
                ) : (
                  <Text style={{color: AppColors.FontsColor}}>Unavailable</Text>
                )}
                
              </LinearGradient>
            </View>
          </View>
        ) : (
          <View>
            <CalanderScreen iseditCalender={true}/>
          </View>
        )}
         {workingHour && <View>
          <Button onPress={handleSaveState}>Save</Button>
        </View>}
        </ScrollView>
        {/* <RNDateTimePicker mode='time' display='spinner' onChange={(t)=>setTime(t)} value={time} open={show}/> */}
      {show && <DateTimePicker
        testID='dateTimePicker'
        value={From}
        mode={mode}
        display="default"
        onChange={onChange}
      />}
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
  