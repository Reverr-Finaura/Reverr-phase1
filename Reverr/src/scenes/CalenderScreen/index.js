import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import { AppColors } from '../../utils';
  import Icon2 from 'react-native-vector-icons/Ionicons';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import {DataTable} from 'react-native-paper';
  import {useNavigation} from '@react-navigation/native';
  import {UserContext} from '../../App';
import { useSelector } from 'react-redux';
  const Height = Dimensions.get('screen').height;
  const Width = Dimensions.get('screen').width;
  
  const dates = [];
  
  function getCalender(month, year) {
    var montharr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    var fulldayarr = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    var dayarr = ['   S', '   M', '   T', '   W', '  Th', '   F', '  Sa'];
    var Tdays = new Date(year, month + 1, 0).getDate(); //total days in the current month
    var prevdays = new Date(year, month, 0).getDate(); //total days in the prev month
    var dt = new Date(year, month, 1);
    var startDay = dt.getDay(); //starting index of the month
    var outputD = [];
    var calender = [];
  
    // calender indent gap
    var p = prevdays - startDay + 1;
    for (var k = 0; k < startDay; k++) {
      outputD.push(p);
      p++;
    }
  
    for (var i = 1; i < Tdays + 1; i++) {
      for (var j = outputD.length; j < 7; j++) {
        if (i < Tdays + 1) {
          i < 10 ? outputD.push('  ' + i) : outputD.push(i);
          dates.push(i);
          i++;
        }
      }
      i--;
      //    console.log(outputD.join(' ')); // printing row by row
      calender.push(outputD);
      outputD = [];
    }
    console.log(fulldayarr[startDay], 'Total days: ' + Tdays, montharr[month]);
    return calender;
  }
  
  const CalanderScreen = props => {
    //const {state, dispatch} = useContext(UserContext);
    const state=useSelector(state=>state.UserReducer);
    var montharr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    var fulldayarr = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    var dayarr = [' S', ' M', ' T', ' W', ' Th', ' F', ' Sa'];
  
    var date = new Date();
    const [month, setmonth] = useState(date.getMonth());
    var year = date.getFullYear();
  
    const [calender, setCalender] = useState([]);
    const navigation = useNavigation();
    var today = date.getDate();
    function Prev() {
      setCalender(getCalender(month - 1, year));
      setmonth(month - 1);
    }
  
    function Next() {
      setCalender(getCalender(month + 1, year));
      setmonth(month + 1);
    }
  
    var edays = [];
    state?.user?.events?.map(e => {
      if (month == e.month - 1) {
        edays.push(e.date);
      }
    });
    // console.log(edays)
  
    useEffect(() => {
      setCalender(getCalender(month, year));
    }, []);
  
    return (
      <View
        style={{
          width: '100%',
          height: Height / 2,
          borderBottomEndRadius: 50,
          borderBottomStartRadius: 50,
          backgroundColor: AppColors.poupopbg,
        }}>
        <TouchableOpacity onPress={props.onClose} style={styles.close}>
          <Icon name="times" size={25} color="black" />
        </TouchableOpacity>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => Prev()}>
            <Icon2 name="arrow-back-circle-outline" size={28} color="black" />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txt}>{montharr[month]}</Text>
            <Text style={styles.txt}>{year}</Text>
          </View>
          <TouchableOpacity onPress={() => Next()}>
            <Icon2 name="arrow-forward-circle-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', marginStart: '9%', marginTop: '3%'}}>
          <DataTable style={{overflow: 'hidden'}}>
            <DataTable.Row>
              <FlatList
                data={dayarr}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity key={item} style={styles.daysName}>
                    <DataTable.Cell>
                      <Text style={{color: AppColors.BtnClr}}>{item}</Text>
                    </DataTable.Cell>
                  </TouchableOpacity>
                )}
              />
            </DataTable.Row>
            <DataTable.Row>
              <FlatList
                data={calender[0]}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity
                    key={item}
                    style={
                      edays.includes(item)
                        ? styles.meeting
                        : item == today
                        ? styles.currday
                        : styles.daysName
                    }>
                    <DataTable.Cell>
                      <Text style={{color: AppColors.BtnClr}}>{item}</Text>
                    </DataTable.Cell>
                  </TouchableOpacity>
                )}
              />
            </DataTable.Row>
            <DataTable.Row>
              <FlatList
                data={calender[1]}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity
                    key={item}
                    style={
                      edays.includes(item)
                        ? styles.meeting
                        : item == today
                        ? styles.currday
                        : styles.daysName
                    }>
                    <DataTable.Cell>
                      <Text style={{color: AppColors.BtnClr}}>{item}</Text>
                    </DataTable.Cell>
                  </TouchableOpacity>
                )}
              />
            </DataTable.Row>
            <DataTable.Row>
              <FlatList
                data={calender[2]}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity
                    key={item}
                    style={
                      edays.includes(item)
                        ? styles.meeting
                        : item == today
                        ? styles.currday
                        : styles.daysName
                    }>
                    <DataTable.Cell>
                      <Text style={{color: AppColors.BtnClr}}>{item}</Text>
                    </DataTable.Cell>
                  </TouchableOpacity>
                )}
              />
            </DataTable.Row>
            <DataTable.Row>
              <FlatList
                data={calender[3]}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity
                    key={item}
                    style={
                      edays.includes(item)
                        ? styles.meeting
                        : item == today
                        ? styles.currday
                        : styles.daysName
                    }>
                    <DataTable.Cell>
                      <Text style={{color: AppColors.BtnClr}}>{item}</Text>
                    </DataTable.Cell>
                  </TouchableOpacity>
                )}
              />
            </DataTable.Row>
            <DataTable.Row>
              <FlatList
                data={calender[4] && calender[4]}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity
                    key={item}
                    style={
                      edays.includes(item)
                        ? styles.meeting
                        : item == today
                        ? styles.currday
                        : styles.daysName
                    }>
                    <DataTable.Cell>
                      <Text style={{color: AppColors.BtnClr}}>{item}</Text>
                    </DataTable.Cell>
                  </TouchableOpacity>
                )}
              />
            </DataTable.Row>
            <DataTable.Row>
              <FlatList
                data={calender[5] && calender[5]}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity
                    key={item}
                    style={
                      edays.includes(item)
                        ? styles.meeting
                        : item == today
                        ? styles.currday
                        : styles.daysName
                    }>
                    <DataTable.Cell>
                      <Text style={{color: AppColors.BtnClr}}>{item}</Text>
                    </DataTable.Cell>
                  </TouchableOpacity>
                )}
              />
            </DataTable.Row>
          </DataTable>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.7}
            onPress={() => {
              console.log("hello")
              navigation.navigate('AddedMentors', {dates});
              props.setModel(false);
            }}>
            <Text style={styles.text}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: AppColors.primarycolor,
    },
    close: {
      left: Width / 1.07,
      top: 2,
    },
    header: {
      flexDirection: 'row',
      width: Width,
      justifyContent: 'space-evenly',
    },
    arrow: {
      borderWidth: 2,
      borderColor: 'black',
      paddingHorizontal: 5,
      paddingVertical: 3,
      borderRadius: 50,
    },
    txt: {
      color: 'black',
      marginEnd: 10,
      fontSize: 18,
      fontFamily: 'Poppins-semibold',
    },
    daysName: {
      flexDirection: 'row',
      marginStart: Width / 28,
      marginEnd: Width / 28,
    },
    currday: {
      flexDirection: 'row',
      marginStart: Width / 30,
      marginEnd: Width / 300,
      backgroundColor: 'white',
      height: 22,
      padding: '2.5%',
      marginTop: '25%',
      borderRadius: 100,
    },
    meeting: {
      flexDirection: 'row',
      marginStart: Width / 28,
      marginEnd: Width / 28,
      backgroundColor: 'green',
    },
    text: {
      fontFamily: 'Poppins-SemiBold',
      color: 'white',
    },
    btn: {
      backgroundColor: 'black',
      marginTop: '-9%',
      width: '70%',
      marginStart: '7%',
      borderRadius: 12,
      alignItems: 'center',
      paddingVertical: '3%',
    },
  });
  export {CalanderScreen};
  