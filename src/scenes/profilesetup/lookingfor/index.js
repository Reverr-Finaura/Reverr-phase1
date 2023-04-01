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
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {BackButton, NextButton} from '../../../Components';
import {AppColors} from '../../../utils';
import { useNavigation } from '@react-navigation/native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const LookingFor = (props) => {
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
  } = props?.route?.params?.userDetailsObj;
  const [start, setStart] = useState(false);
  const [clmn, setClmn] = useState(3);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigation = useNavigation()

  const lookingForData = [
    {
      title: 'New Job',
      image: require('../../../assets/images/illustration/job.png'),
    },
    {
      title: 'Networking ',
      image: require('../../../assets/images/illustration/networking.png'),
    },
    {
      title: 'Mentorship',
      image: require('../../../assets/images/illustration/mentorship.png'),
    },
    {
      title: 'Find CO-Founder',
      image: require('../../../assets/images/illustration/founder.png'),
    },
    {
      title: 'Career Change',
      image: require('../../../assets/images/illustration/carrier.png'),
    },
    {
      title: 'Mentor Others',
      image: require('../../../assets/images/illustration/othermentor.png'),
    },
    {
      title: 'Grow Business',
      image: require('../../../assets/images/illustration/business.png'),
    },
    {
      title: 'Get Inspired',
      image: require('../../../assets/images/illustration/inspired.png'),
    },
  ];

  const selectItems = title => {
    if (selectedItems.includes(title)) {
      setSelectedItems(selectedItems.filter(r => r != title));
    } else {
      setSelectedItems([...selectedItems, title]);
    }
  };

  //console.log(selectedItems);
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
    designation:designation,
    lookingFor:selectedItems
  }
  const getPersonalInfo = () => {
    navigation.navigate('intrest',{
      userDetailsObj:personalInfo
    })
  };

  return (
    <View>
      <ImageBackground
        style={{width: Width, height: Height, paddingTop: '4%'}}
        source={require('../../../assets/images/illustration/backgroud1.png')}>
        <StatusBar backgroundColor={'#020E2C'} />
        <BackButton/>
        {start ? (
          <View style={{paddingHorizontal: '3%'}}>
            <Text style={styles.text}>What are you looking for? </Text>
            <View style={{marginTop: '15%'}}>
              <FlatList
                data={lookingForData}
                numColumns={clmn}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                  onPress={()=>selectItems(item.title)}
                    activeOpacity={0.6}
                    style={[
                      styles.card,
                      {
                        width: Width / 3.6,
                        backgroundColor: selectedItems.includes(item.title)
                          ? AppColors.buttonColor
                          : AppColors.FontsColor,
                      },
                    ]}>
                    <Image source={item.image} />
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'center',
                        marginTop: '8%',
                        color: selectedItems.includes(item.title)
                          ? AppColors.FontsColor
                          : AppColors.primarycolor,
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <NextButton
                title="Next"
                style={{
                  width: Width / 3.4,
                  marginTop: '20%',
                  alignSelf: 'center',
                }}
                onPress={() => {getPersonalInfo()}}
              />
              <Text
                style={{
                  color: AppColors.FontsColor,
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'center',
                  marginTop: '8%',
                  fontSize: 18,
                }}>
                3 of 5
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.titleText}>What are you looking for?</Text>
            <View style={{alignItems: 'center', marginTop: '15%'}}>
              <Image
                style={{width: Width / 1.6, height: Height / 3.05}}
                source={require('../../../assets/images/illustration/look.png')}
              />
            </View>
            <View style={styles.buttonContainer}>
              <NextButton
                title="Skip"
                textStyle={{color: AppColors.primarycolor}}
                style={{backgroundColor: AppColors.FontsColor}}
                onPress={() => getPersonalInfo()}
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
              3 of 5
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default LookingFor;
