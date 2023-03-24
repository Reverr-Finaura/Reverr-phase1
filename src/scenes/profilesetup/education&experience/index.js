import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {BackButton, DropDown, InputField, NextButton} from '../../../Components';
import {AppColors} from '../../../utils';
import { useNavigation } from '@react-navigation/native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const EduAndExp = (props) => {

  const {
    name,
    email,
    mobile,
    password,
    dob,
    image,
    bio
  } = props?.route?.params?.userDetailsObj;

  const [start, setStart] = useState(false);
  const [degree, setDegree] = useState('');
  const [degreeError, setDegreeError] = useState(false)
  const [industry, setIndustry] = useState('');
  const [industryError, setIndustryError] = useState(false)
  const [institution, setInstitution] = useState('')
  const [institutionError, setInstitutionError] = useState(false)
  const [organization, setOrganization] = useState('')
  const [organizationError, setOrganizationError] = useState(false)
  const [designation, setDesignation] = useState('')
  const [designationError, setDesignationError] = useState(false)
  const navigation = useNavigation()
  const degreeData = [
    'MBA',
    'PhD',
    'M.Tech',
    'M.Sc.',
    'M.A.',
    'BBA',
    'B.Tech',
    'BCA',
    'B.Sc.',
    'B.A.',
    'Other',
  ];
 /// console.log(props?.route?.params?.userDetailsObj,"pppp");
  const industryData = [
    'FinTech',
    'Sales',
    'Product Development',
    'Legal',
    'Research',
    'Fundraising',
    'Marketing',
    'EdTech',
    'MedTech',
    'RealTech',
  ];
  const getPersonalInfo = () => {
    if (degree === '') {
      setDegreeError(true);
      return;
    }
    if (institution === '') {
      setInstitutionError(true);
      return;
    }
    if (industry === '') {
      setIndustryError(true);
      return;
    }
    if (organization === '') {
      setOrganizationError(true);
      return;
    }
    if (designation === '') {
      setDesignationError(true);
      return;
    }
    const personalInfo = {
      name:name,
      mobile:mobile,
      email:email,
      password:password,
      dob:dob,
      image:image,
      bio:bio,
      degree:degree,
      industry:industry,
      institution:institution,
      organization:organization,
      designation:designation
    }
    navigation.navigate('lookingfor',{
      userDetailsObj:personalInfo
    })
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={{width: Width, height: Height, paddingTop: '4%'}}
        source={require('../../../assets/images/illustration/backgroud1.png')}>
        <StatusBar backgroundColor={'#020E2C'} />
        <BackButton/>
        {start ? (
          <View style={{paddingHorizontal: '3%'}}>
            <Text style={styles.text}>Education and Experience</Text>
            <DropDown
              title="What is your highest educational qualification?"
              placeholder="Choose your highest degree"
              selected={degree}
              setSelected={setDegree}
              array={degreeData}
              error={degreeError}
              setError={setDegreeError}
            />
            <InputField
              placeholder="Enter Your institution"
              style={{marginTop: '3%'}}
              value={institution}
              error={institutionError}
              onChangeText={e => {
                setInstitution(e);
                if (e != '') {
                  setInstitutionError(false);
                }
              }}
             
              Title="What was the name of your institution?"
            />
            <DropDown
              title="What is your current industry?"
              placeholder="Choose your industry"
              selected={industry}
              setSelected={setIndustry}
              array={industryData}
              error={industryError}
              setError={setIndustryError}
            />
            <InputField
              placeholder="Enter organization name
              "
              style={{marginTop: '3%'}}
              value={organization}
              error={organizationError}
              onChangeText={e => {
                setOrganization(e);
                if (e != '') {
                  setOrganizationError(false);
                }
              }}

              Title="What’s your organization called?"
            />
            <InputField
              placeholder="Enter designation"
              style={{marginTop: '3%'}}
              value={designation}
              error={designationError}
              onChangeText={e => {
                setDesignation(e);
                if (e != '') {
                  setDesignationError(false);
                }
              }}

              Title="What’s your designation?"
            />
             <NextButton
              title="Next"
              style={{
                width: Width / 3.4,
                marginTop: '8%',
                alignSelf: 'center',
              }}
              onPress={() => {
                getPersonalInfo()
              }}
            />
            <Text
              style={{
                color: AppColors.FontsColor,
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
                marginTop:'5%',
                fontSize: 18,
              }}>
              2 of 5
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.titleText}>
              Let’s get to know about your Education and Experience!
            </Text>
            <View style={{alignItems: 'center', marginTop: '15%'}}>
              <Image
                style={{width: Width / 1.3, height: Height / 3.4}}
                source={require('../../../assets/images/illustration/resp.png')}
              />
            </View>
            <View style={styles.buttonContainer}>
              <NextButton title="Next" onPress={() => setStart(true)} />
            </View>
            <Text
              style={{
                color: AppColors.FontsColor,
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
                marginTop: '8%',
                fontSize: 18,
              }}>
              2 of 5
            </Text>
          </View>
        )}
      </ImageBackground>
    </ScrollView>
  );
};

export default EduAndExp;
