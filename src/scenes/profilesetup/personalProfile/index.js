import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  StatusBar,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {BackButton, NextButton} from '../../../Components';
import {AppColors} from '../../../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  AddCameraImage,
  AddGalleryImage,
} from '../../../utils/FirebaseFunctionality';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export const PersonalProfile = props => {
  const {name, mobile, email, password, dob} =
    props?.route?.params?.userDetailsObj;
  const [start, setStart] = useState(false);
  const [bio, setBio] = useState('');
  const [profilePicLink, setProfilePicLink] = useState('');
  const [picker, setPicker] = useState(false);
  const [profilepicError, setProfilepicError] = useState(false);
  const [bioError, setBioError] = useState(false);
  const [dpLoader, setDpLoader] = useState(false);
  const navigation = useNavigation();

  console.log(profilePicLink, 'link');

  const getPersonalInfo = () => {
    if (profilePicLink === '') {
      setProfilepicError(true);
      return;
    }
    if (bio === '') {
      setBioError(true);
      return;
    }
    const personalInfo = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      dob: dob,
      image: profilePicLink,
      bio: bio,
    };
    navigation.navigate('eduAndexp', {
      userDetailsObj: personalInfo,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={{width: Width, height: Height, paddingTop: '4%'}}
        source={require('../../../assets/images/illustration/backgroud1.png')}>
        <StatusBar backgroundColor={'#020E2C'} />
        <BackButton />
        <Modal
          visible={picker}
          onRequestClose={() => {
            setPicker(false);
          }}
          transparent={true}
          animationType="slide">
          <TouchableOpacity
            onPress={() => setPicker(false)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                paddingLeft: '7%',
                position: 'absolute',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                bottom: 0,
                left: 0,
                right: 0,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setPicker(false);
                  AddGalleryImage(setProfilePicLink, setDpLoader);
                }}
                style={{
                  paddingVertical: '6%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name="images" size={28} color={AppColors.primarycolor} />
                <Text
                  style={{
                    marginHorizontal: '3%',
                    fontFamily: 'Poppins-SemiBold',
                    color: AppColors.primarycolor,
                  }}>
                  Add From Gallary
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPicker(false);
                  AddCameraImage(setProfilePicLink, setDpLoader);
                }}
                style={{
                  paddingBottom: '6%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name="camera" size={28} color={AppColors.primarycolor} />
                <Text
                  style={{
                    marginHorizontal: '3%',
                    fontFamily: 'Poppins-SemiBold',
                    color: AppColors.primarycolor,
                  }}>
                  Open Camera
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        {start ? (
          <View>
            <Text style={styles.text}>Personal Profile</Text>
            <TouchableOpacity
              onPress={() => {
                setProfilepicError(false);
                setPicker(true);
              }}
              style={{
                width: Width / 3,
                height: Height / 5.42,
                borderRadius: 100,
                alignSelf: 'center',
              }}
              activeOpacity={0.5}>
              {profilePicLink === '' ? (
                <View>
                  {dpLoader ? (
                    <View
                      style={{
                        backgroundColor: AppColors.BtnClr,
                        paddingVertical: '40%',
                        borderRadius: 80,
                      }}>
                      <ActivityIndicator
                        size={30}
                        color={AppColors.FontsColor}
                      />
                    </View>
                  ) : (
                    <ImageBackground
                      style={{
                        width: Width / 3,
                        height: Height / 5.42,
                        alignSelf: 'center',

                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      source={require('../../../assets/images/illustration/dp.png')}>
                      <Text
                        style={{
                          color: AppColors.BtnClr,
                          fontSize: 17,
                          textAlign: 'center',
                          marginTop: '10%',
                        }}>
                        Upload your photo
                      </Text>
                      <Icon name="plus" size={25} color={AppColors.BtnClr} />
                    </ImageBackground>
                  )}
                </View>
              ) : (
                <View
                  style={{
                    width: Width / 3,
                    height: Height / 5.42,
                    borderRadius: 100,
                    overflow: 'hidden',
                  }}>
                  <ImageBackground
                    style={{
                      width: Width / 3,
                      height: Height / 5.42,
                      borderRadius: 100,
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    source={{uri: profilePicLink}}>
                    <Text
                      style={{
                        color: AppColors.FontsColor,
                        fontSize: 17,
                        textAlign: 'center',
                        marginTop: '10%',
                      }}>
                      Change your photo
                    </Text>
                    <Icon name="plus" size={25} color={AppColors.BtnClr} />
                  </ImageBackground>
                </View>
              )}
            </TouchableOpacity>
            {profilepicError && (
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'red',
                  textAlign: 'center',
                  marginTop: '5%',
                }}>
                Please add Profile pic
              </Text>
            )}
            <View
              style={{
                height: 3,
                backgroundColor: AppColors.CardColor,
                marginHorizontal: '4%',
                marginTop: '6%',
              }}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Tell us about yourself!</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    height: Height / 3.8,
                    borderWidth: bioError ? 2 : 0,
                    borderColor: bioError ? 'red' : 'rgba(145, 145, 145,0.5)',
                  },
                ]}
                placeholder="Type your Bio"
                placeholderTextColor={AppColors.CardColor}
                multiline={true}
                numberOfLines={8}
                maxLength={450}
                value={bio}
                onChangeText={e => {
                  setBio(e);
                  if (e != '') {
                    setBioError(false);
                  }
                }}
              />
            </View>
            <NextButton
              title="Next"
              style={{
                width: Width / 3.4,
                marginTop: '10%',
                alignSelf: 'center',
              }}
              onPress={() => {
                getPersonalInfo();
              }}
            />
            <Text
              style={{
                color: AppColors.FontsColor,
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
                marginTop: '8%',
                fontSize: 18,
              }}>
              1 of 5
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.titleText}>Let us get to know you!</Text>
            <View style={{alignItems: 'center', marginTop: '15%'}}>
              <Image
                style={{width: Width / 1.3, height: Height / 2.6}}
                source={require('../../../assets/images/illustration/lets.png')}
              />
            </View>
            <View style={styles.buttonContainer}>
              {/* <NextButton
                title="Skip"
                textStyle={{color: AppColors.primarycolor}}
                style={{backgroundColor: AppColors.FontsColor}}
              /> */}
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
              1 of 5
            </Text>
          </View>
        )}
      </ImageBackground>
    </ScrollView>
  );
};
