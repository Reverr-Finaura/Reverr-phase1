import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {IndividualHeaderLayout} from '../HeaderLayout';
import MultiSelect from 'react-native-multiple-select';
import {useState} from 'react';
import {CustomTextInput} from '../TextInput';
import {InputField} from '../InputField';
import {TextInput} from 'react-native-paper';
import {AppColors} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

const items = [
  {
    id: '92iijs7yta',
    name: 'Ondo',
  },
  {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  },
  {
    id: '16hbajsabsd',
    name: 'Calabar',
  },
  {
    id: 'nahs75a5sg',
    name: 'Lagos',
  },
  {
    id: '667atsas',
    name: 'Maiduguri',
  },
  {
    id: 'hsyasajs',
    name: 'Anambra',
  },
  {
    id: 'djsjudksjd',
    name: 'Benue',
  },
  {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  },
  {
    id: 'suudydjsjd',
    name: 'Abuja',
  },
];

const items2 = [
  {
    id: '92iijs7yta',
    name: 'Ondo',
  },
  {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  },
  {
    id: '16hbajsabsd',
    name: 'Calabar',
  },
  {
    id: 'nahs75a5sg',
    name: 'Lagos',
  },
  {
    id: '667atsas',
    name: 'Maiduguri',
  },
  {
    id: 'hsyasajs',
    name: 'Anambra',
  },
  {
    id: 'djsjudksjd',
    name: 'Benue',
  },
  {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  },
  {
    id: 'suudydjsjd',
    name: 'Abuja',
  },
];

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
  {id: '>5', name: '>5'},
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
  {id: 'At Coffee', name: 'At Coffee'},
  {id: 'Video Call', name: 'Video Call'},
  {id: 'Local Cafe', name: 'Local Cafe'},
];
const VibeBoarding = ({showboarding, setshowboarding}) => {
  const navigation = useNavigation();
  const {params} = useRoute();
  console.log('paraamss is', params);
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
    });
    setrefresh(true);
    const inntialrefresh=true
    setTimeout(() => {
      navigation.navigate(
        'Vibe',
        inntialrefresh
       
      );
    }, 10);
  };
  return (
    <IndividualHeaderLayout>
      <View
        style={{
          backgroundColor: 'white',
          width: Dimensions.get('window').width / 1.1,
          alignSelf: 'center',
          borderRadius: 15,
          flex: 1,
        }}
      >
        <ScrollView style={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  color: '#0077B7',
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
                color: '#0077B7',
                fontFamily: 'Poppins',
                fontSize: 18,
                fontWeight: '700',
                marginTop: 14,
              }}
            >
              Tell Us About Yourself
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: '#0077B7',
                  fontFamily: 'Poppins',
                  width: '60%',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: '700',
                }}
              >
                Years of Experience
              </Text>
              <View style={{width: 100}}>
                <MultiSelect
                  items={experience}
                  uniqueKey="id"
                  onSelectedItemsChange={data => onSelectedItemsChange(data)}
                  selectedItems={selected}
                  selectText="Choose"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{color: '#CCC'}}
                  single={true}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: '#0077B7',
                  fontFamily: 'Poppins',
                  fontSize: 16,
                  width: '60%',
                  textAlign: 'left',
                  fontWeight: '700',
                }}
              >
                Previous Organistation Duration
              </Text>
              <View style={{width: 100}}>
                <MultiSelect
                  items={prevduration}
                  uniqueKey="id"
                  onSelectedItemsChange={data => onSelectedItemsChange1(data)}
                  selectedItems={selected1}
                  selectText="Choose Duration"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{color: '#CCC'}}
                  single={true}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                />
              </View>
            </View>
            <View style={{alignItems: 'stretch'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 3,
                }}
              >
                <Text
                  style={{
                    color: '#0077B7',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    width: '40%',
                    textAlign: 'left',
                    fontWeight: '700',
                  }}
                >
                  Education{' '}
                </Text>
                <TextInput
                  style={{
                    height: 30,
                    width: '45%',
                    alignSelf: 'baseline',
                    borderWidth: 2,
                    borderRadius: 15,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                  onChangeText={text => onChangeText(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 3,
                }}
              >
                <Text
                  style={{
                    color: '#0077B7',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    width: '40%',
                    textAlign: 'justify',
                    fontWeight: '700',
                  }}
                >
                  Previous Designation
                </Text>
                <TextInput
                  style={{
                    height: 30,
                    width: '45%',
                    alignSelf: 'baseline',
                    borderWidth: 2,
                    borderRadius: 15,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                  onChangeText={text => setprevdesignation(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 3,
                }}
              >
                <Text
                  style={{
                    color: '#0077B7',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    width: '40%',
                    textAlign: 'left',
                    fontWeight: '700',
                  }}
                >
                  What Is My Industry
                </Text>
                <TextInput
                  style={{
                    height: 30,
                    width: '45%',
                    borderWidth: 2,
                    borderRadius: 15,
                    alignSelf: 'baseline',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                  onChangeText={text => setindustry(text)}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 3,
                }}
              >
                <Text
                  style={{
                    color: '#0077B7',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    fontWeight: '700',
                    width: '40%',
                    textAlign: 'left',
                  }}
                >
                  Previous Organistation
                </Text>
                <TextInput
                  style={{
                    height: 30,
                    width: '45%',
                    alignSelf: 'baseline',
                    borderWidth: 2,
                    borderRadius: 15,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                  onChangeText={text => setprevorg(text)}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: '#0077B7',
                  fontFamily: 'Poppins',
                  fontSize: 16,
                  width: '45%',
                  textAlign: 'left',
                  fontWeight: '700',
                }}
              >
                What I Am Here For
              </Text>
              <View style={{width: 150}}>
                <MultiSelect
                  items={herefor}
                  uniqueKey="id"
                  onSelectedItemsChange={data => onSelectedItemsChange2(data)}
                  selectedItems={selected2}
                  selectText="Choose"
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
                  searchInputStyle={{color: '#CCC'}}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: '#0077B7',
                  fontFamily: 'Poppins',
                  fontSize: 16,
                  width: '45%',
                  textAlign: 'left',
                  fontWeight: '700',
                }}
              >
                How Can We Meet
              </Text>
              <View style={{width: 150}}>
                <MultiSelect
                  items={meetdata}
                  uniqueKey="id"
                  onSelectedItemsChange={data => onSelectedItemsChange3(data)}
                  selectedItems={selected3}
                  selectText="Pick Locations"
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
                  searchInputStyle={{color: '#CCC'}}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                />
              </View>
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
                    color: 'black',
                    fontFamily: 'Poppins',
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: '700',
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
};

export {VibeBoarding};
