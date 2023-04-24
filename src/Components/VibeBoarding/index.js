import { View, Text, TouchableOpacity, Dimensions, TextInput, Image, Animated } from 'react-native';
import React, { useRef, useEffect, useState, } from 'react';
import { IndividualHeaderLayout } from '../HeaderLayout';
import MultiSelect from 'react-native-multiple-select';
import { CustomTextInput } from '../TextInput';
import { InputField } from '../InputField';
// import { TextInput } from 'react-native-paper';
import { AppColors } from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { opacity } from 'react-native-redash';

const experience = [
  {
    id: '< 1',
    name: '< 1',
  },
  {
    id: '1-2',
    name: '1-2',
  },
  {
    id: '2-5',
    name: '2-5',
  },
  {
    id: '5>',
    name: '5>',
  },
];
const prevduration = [
  {
    id: '<1',
    name: '<1',
  },
  {
    id: '1-2',
    name: '1-2',
  },
  {
    id: '2-5',
    name: '2-5',
  },
  { id: '>5', name: '>5' },
];
const herefor = [
  {
    id: 'Hire Employees',
    name: 'Hire Employees',
  },
  {
    id: 'Find Investors',
    name: 'Find Investors',
  },
  {
    id: 'Find Mentors',
    name: 'Find Mentors',
  },
  {
    id: 'For Networking',
    name: 'For Networking',
  },
  {
    id: 'Find Cofounder',
    name: 'Find Cofunder',
  },
];
const meetdata = [
  { id: 'At Coffee', name: 'At Coffee' },
  { id: 'Video Call', name: 'Video Call' },
  { id: 'Phone Call', name: 'Phone Call' },
];
const VibeBoarding = ({ showboarding, setshowboarding }) => {
  const navigation = useNavigation();
  // const { params } = useRoute();
  // console.log('paraamss is', params);
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const [selected, setselected] = useState([]);
  const [selected1, setselected1] = useState([]);
  const [selected2, setselected2] = useState([]);
  const [selected3, setselected3] = useState([]);
  const [text, onChangeText] = useState('');
  const [prevdesignation, setprevdesignation] = useState('');
  const [industry, setindustry] = useState('');
  const [prevorg, setprevorg] = useState('');
  const [refresh, setrefresh] = useState(true);
  const [loader, setLoader] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [fadeIn, setFadeIn] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      if (fadeIn) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100, // Set the duration of the fade in animation
          useNativeDriver: true // Add this line to improve performance
        }).start(() => {
          setFadeIn(false);
        });
      } else {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000, // Set the duration of the fade out animation
          useNativeDriver: true // Add this line to improve performance
        }).start(() => {
          setFadeIn(true);
        });
      }
    }, 500); // Set the interval duration to 2 seconds (1000ms = 1 second)

    return () => clearInterval(interval);
  }, [fadeAnim, fadeIn]);

  const onSelectedItemsChange = data => {
    console.log('here', data);
    setselected(data);

    console.warn(selected);
  };
  const onSelectedItemsChange1 = data => {
    console.log('here', data);
    setselected1(data);

    console.warn(selected1);
  };
  const onSelectedItemsChange2 = data => {
    console.log('here', data);
    setselected2(data);

    console.warn(selected2);
  };
  const onSelectedItemsChange3 = data => {
    console.log('here meet', data);
    setselected3(data);
    console.log(data);
    console.warn(selected3);
  };
  const HandleSubmit = async () => {
    setLoader(true)

    console.log('at submit');
    console.log('selected is', selected);
    console.log('selected1 is', selected1);
    console.log('selected2 is', selected2);
    console.log('selected3 is', selected3);
    console.log('edu', text);
    console.log('predesig', prevdesignation);
    console.log('industry', industry);
    console.log('preorg', prevorg);
    await firestore()
      .collection('Users')
      .doc(state.user.email)
      .update({
        Vibe_Data: {
          Years_Of_Experience: selected,
          Previous_org_Duration: selected1,
          Education: text,
          Previous_Designation: prevdesignation,
          Industry: industry,
          Previous_Org: prevorg,
          Here_for: selected2,
          How_To_Meet: selected3,
        },
      });
    await firestore().collection('Users').doc(state.user.email).update({
      Number_Of_Swips_Done: 0,
    }).then(() => {
      setLoader(false)
      setrefresh(true);
      const inntialrefresh = true
      navigation.navigate(
        'Vibe',
        inntialrefresh
      );
    }).catch((error) => {
      alert(error)
    })

    // setTimeout(() => {
    //   // navigation.navigate(
    //   //   'Vibe',
    //   //   inntialrefresh

    //   // );
    // }, 10);
  };


  if (loader) {
    return (
      <Animated.View style={{ flex: 1, backgroundColor: "#010C12", opacity: fadeAnim }}>
        <Image style={{ alignSelf: "center", justifyContent: "center", resizeMode: "contain", width: "100%", height: "100%" }}
          source={require('../../../src/assets/images/loader.png')}


        />
      </Animated.View >
    )
  }

  if (loader === false) {
    return (
      <IndividualHeaderLayout>
        <View
          style={{
            backgroundColor: 'black',
            width: Dimensions.get('window').width / 1.1,
            alignSelf: 'center',
            borderRadius: 15,
            flex: 1,
          }}
        >


          <ScrollView style={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
              <View style={{ alignSelf: 'center' }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Poppins',
                    fontSize: 18,
                    fontWeight: '700',
                    marginTop: 4,
                  }}
                >
                  Create your Vibe Profile!
                </Text>
              </View>

              <Text
                style={{
                  color: '#848599',
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  fontWeight: '700',
                  marginTop: 14,
                }}
              >
                Tell Us About Yourself
              </Text>

              <View
                style={{


                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Poppins',
                    width: '60%',
                    textAlign: 'left',
                    fontSize: 16,
                    fontWeight: '700',
                    marginBottom: 10,
                  }}
                >
                  Years of Experience
                </Text>

                <MultiSelect
                  items={experience}
                  uniqueKey="id"
                  onSelectedItemsChange={data => onSelectedItemsChange(data)}
                  selectedItems={selected}
                  selectText="  Enter Duration"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: '#CCC', borderRadius: 20 }}
                  single={true}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    textAlign: 'left',
                    fontWeight: '700',
                    marginBottom: 10
                  }}
                >
                  Experience
                </Text>

                <MultiSelect

                  items={prevduration}
                  uniqueKey="id"
                  onSelectedItemsChange={data => onSelectedItemsChange1(data)}
                  selectedItems={selected1}
                  selectText="Experience in Year..."
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: '#CCC' }}
                  single={true}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                />

              </View>
              <View style={{ alignItems: 'stretch' }}>
                <View
                  style={{

                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Poppins',
                      fontSize: 16,
                      textAlign: 'left',
                      fontWeight: '700',
                      marginBottom: 10
                    }}
                  >
                    Education{' '}
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      backgroundColor: "#FFFFFF",
                      color: '#000000',
                      paddingLeft: 8

                    }}
                    placeholder={"Enter qualification"}
                    placeholderTextColor={"#6B6A71"}
                    selectionColor={"#ccc"}
                    onChangeText={text => onChangeText(text)}
                  />
                </View>
                <View
                  style={{

                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Poppins',
                      fontSize: 16,
                      textAlign: 'justify',
                      fontWeight: '700',
                      marginBottom: 10
                    }}
                  >
                    Designation
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      backgroundColor: "#FFFFFF",
                      color: '#000000',
                      paddingLeft: 8
                    }}
                    placeholder={"Enter Designation"}
                    placeholderTextColor={"#6B6A71"}
                    selectionColor={"#ccc"}
                    onChangeText={text => setprevdesignation(text)}
                  />
                </View>
                <View
                  style={{

                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Poppins',
                      fontSize: 16,
                      textAlign: 'left',
                      fontWeight: '700',
                      marginBottom: 10,
                    }}
                  >
                    What Is My Industry
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      paddingLeft: 8
                    }}
                    onChangeText={text => setindustry(text)}
                    placeholder={"Enter Industry"}

                    placeholderTextColor={"#6B6A71"}
                    selectionColor={"#ccc"}
                  />
                </View>

                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Poppins',
                      fontSize: 16,
                      fontWeight: '700',
                      textAlign: 'left',
                      marginBottom: 10,
                    }}
                  >
                    Organistation / Company
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      backgroundColor: '#ffffff',
                      color: "#000000",
                      paddingLeft: 8
                    }}
                    onChangeText={text => setprevorg(text)}
                    placeholder={"Enter Organization / Company"}
                    placeholderTextColor={"#6B6A71"}
                    selectionColor={"#ccc"}
                  />
                </View>
              </View>
              <View
                style={{

                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    textAlign: 'left',
                    fontWeight: '700',
                    marginBottom: 10,
                  }}
                >
                  What I Am Here For
                </Text>

                <MultiSelect
                  items={herefor}
                  uniqueKey="id"
                  onSelectedItemsChange={data => onSelectedItemsChange2(data)}
                  selectedItems={selected2}
                  selectText="  Enter here for"
                  tagContainerStyle={{
                    backgroundColor: '#0077B7',
                    width: Dimensions.get('window').width / 2.7,
                  }}
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                />

              </View>
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    textAlign: 'left',
                    fontWeight: '700',
                    marginBottom: 10
                  }}
                >
                  How Can We Meet
                </Text>
                <MultiSelect
                  items={meetdata}
                  uniqueKey="id"
                  onSelectedItemsChange={data => onSelectedItemsChange3(data)}
                  selectedItems={selected3}
                  selectText="  Enter how to connect"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  tagContainerStyle={{
                    backgroundColor: '#0077B7',
                    width: Dimensions.get('window').width / 2.7,
                  }}
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                />
              </View>
              <View
                style={{
                  marginTop: 25,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    HandleSubmit();
                  }}
                >
                  <Text
                    style={{
                      color: '#ffffff',
                      fontFamily: 'Poppins',
                      fontSize: 20,
                      textAlign: 'center',
                      fontWeight: '700',
                      height: 50,
                      marginBottom: 20,
                      textAlign: "center",
                      paddingTop: 12,
                      borderRadius: 20,
                      backgroundColor: "#0A73FF"

                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </IndividualHeaderLayout>
    );
  }
};

export { VibeBoarding };
