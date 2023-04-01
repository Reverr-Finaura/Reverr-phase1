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
import {useNavigation} from '@react-navigation/native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Intrest = (props) => {

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
    lookingFor
  } = props?.route?.params?.userDetailsObj;
  const [start, setStart] = useState(false);
  const [clmn, setClmn] = useState(2);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigation = useNavigation();

  const intrestData = [
    'Fintech',
    'Sales',
    'Product Development',
    'Legal',
    'Research',
    'Fundraising',
    'Marketing',
    'Edtech',
    'Medtech',
    'Realtech',
  ];

  const selectItems = title => {
    if (selectedItems.includes(title)) {
      setSelectedItems(selectedItems.filter(r => r != title));
    } else {
      setSelectedItems([...selectedItems, title]);
    }
  };

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
    lookingFor:selectedItems,
    intrest:selectedItems
  }
  const getPersonalInfo = () => {
    navigation.navigate('social',{
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
            <Text style={styles.text}>What is your Interest Areas? </Text>
            <View style={{marginTop: '15%'}}>
              <FlatList
                data={intrestData}
                numColumns={clmn}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => selectItems(item)}
                    activeOpacity={0.6}
                    style={[
                      styles.card,
                      {
                        backgroundColor: selectedItems.includes(item)
                          ? AppColors.buttonColor
                          : AppColors.FontsColor,
                      },
                    ]}>
                    
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'center',
                        color: selectedItems.includes(item)
                          ? AppColors.FontsColor
                          : AppColors.primarycolor,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <NextButton
                title="Next"
                style={{
                  width: Width / 3.4,
                  marginTop: '60%',
                  alignSelf: 'center',
                }}
                onPress={() => getPersonalInfo()}
              />
              <Text
                style={{
                  color: AppColors.FontsColor,
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'center',
                  marginTop: '8%',
                  fontSize: 18,
                }}>
                4 of 5
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.titleText}>What is your Interest Areas?</Text>
            <View style={{alignItems: 'center', marginTop: '15%'}}>
              <Image
                style={{width: Width / 1.6, height: Height / 3.05}}
                source={require('../../../assets/images/illustration/intrest.png')}
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
              4 of 5
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Intrest;
