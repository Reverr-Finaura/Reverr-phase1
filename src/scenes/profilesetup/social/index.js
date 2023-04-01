import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {BackButton, InputField, NextButton} from '../../../Components';
import {AppColors} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { add_user } from '../../../Redux/actions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Social = (props) => {
  const {
    name,
    mobile,
    email,
    password,
    dob,
    image,
    bio,
    degree,
    industry,
    institution,
    organization,
    designation,
    lookingFor,
    intrest
  } = props?.route?.params?.userDetailsObj;
  const [start, setStart] = useState(false);
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const onboardingData= {
    profileImg:image,
    about:bio,
    education:[{degree:degree,schoolOrCollege:"",startingDate:"",lastDate:""}],
    experience:[{designation:designation,previousOrCurrentOrganisation:"",yourRole:"",durationOfYears:"",id:new Date().getTime()}],
    whatULookingFor:lookingFor,
    industry:industry,
    linkedinLink:linkedin,
    twitterLink:twitter,
    instagramLink:"",
    designation:designation,
    userType:"Individual",
    phone:mobile,
    password:password
  }

    const SignUpUser = async () => {
      const newData={...onboardingData,
        name:name,
        email:email,
        image:image,
        Appointement_request: [],
        saved: [],
        rating: 0,
        gender: "",
        dob: dob,
        state: "",
        country: "",
        totalRating: 0,
        notification: [],
        network: [],
        receivedRequests: [],
        sendRequests: [],
        facebookLink: "",
        orders: [],
        reviews: [],
        mentors: [],
        events: [],
        hasGeneralProfile: true,
        hasFundingProfile: "No",
        applyForFundingId: null,
        meeting: {},
      }
      setLoading(true)
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        console.log('User account created & signed in!');
        await firestore()
          .collection('Users')
          .doc(email)
          .set(newData)
          .then(() => {
            dispatch(add_user(newData));
            setLoading(false);
            navigation.replace('IndividualTab')
          })
          .catch(e => {
            setLoading(false)
            alert(e);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('That email address is invalid!');
        }
       setLoading(false)
        console.error(error);
      });
  };
  
  return (
    <View>
      <ImageBackground
        style={{width: Width, height: Height, paddingTop: '4%'}}
        source={require('../../../assets/images/illustration/backgroud1.png')}>
        <StatusBar backgroundColor={'#020E2C'} />
        <Modal
            visible={loading}
            onRequestClose={() => {
              setLoading(false);
            }}
            transparent={true}>
            <View
              style={{
                backgroundColor: 'rgba(1, 1, 1, 0.6)',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '35%',
                  height: '17%',
                  borderRadius: 20,
                }}>
                <ActivityIndicator size="large" color={AppColors.buttonColor} />
              </View>
            </View>
          </Modal>
        <BackButton/>
        {start ? (
          <View style={{paddingHorizontal: '3%'}}>
            <Text style={styles.text}>Social Handles</Text>
            <View style={{marginTop: '15%'}}>
              
              <View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image source={require("../../../assets/images/illustration/linkdin.png")}/>
                  <Text style={{color:AppColors.FontsColor,marginHorizontal:'3%',fontFamily:'Poppins-SemiBold',marginTop:'3%',fontSize:19}}>Linkedin</Text>
                </View>
              <InputField
              placeholder="www.linkedin.in/username"
              style={{marginTop: '-9%'}}
              value={linkedin}
              onChangeText={e => {
                setLinkedin(e);
               
              }}/>
            
              </View>
              <View style={{marginTop:'10%'}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image source={require("../../../assets/images/illustration/twitter.png")}/>
                  <Text style={{color:AppColors.FontsColor,marginHorizontal:'3%',fontFamily:'Poppins-SemiBold',marginTop:'3%',fontSize:19}}>Twitter</Text>
                </View>
              <InputField
              placeholder="www.twitter.com/username"
              style={{marginTop: '-9%'}}
              value={twitter}
              onChangeText={e => {
                setTwitter(e);
                
              }}
            />
              </View>
              <NextButton
                title="Submit"
                style={{
                  width: Width / 2.8,
                  marginTop: '60%',
                  alignSelf: 'center',
                }}
                onPress={() =>SignUpUser()}
              />
              <Text
                style={{
                  color: AppColors.FontsColor,
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'center',
                  marginTop: '8%',
                  fontSize: 18,
                }}>
                5 of 5
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.titleText}>Drop in your Social Handles!</Text>
            <View style={{alignItems: 'center', marginTop: '15%'}}>
              <Image
                style={{width: Width / 1.6, height: Height / 3.05}}
                source={require('../../../assets/images/illustration/social.png')}
              />
            </View>
            <View style={styles.buttonContainer}>
              <NextButton
                title="Skip"
                textStyle={{color: AppColors.primarycolor}}
                style={{backgroundColor: AppColors.FontsColor}}
                onPress={() => setStart(true)}
              />
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
              5 of 5
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Social;
