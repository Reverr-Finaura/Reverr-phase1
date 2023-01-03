import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import {CustomTextCard} from '../CustomTextCard';
import {Details} from '../Details';
import {useSelector} from 'react-redux';
import {Rating} from '../Ratings';
import {CustomButton} from '../CustomButton';
import App from '../../App';
import {AppColors, smallString} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';

export const MentorDetails = props => {
  const navigaton = useNavigation();
  const [optionIndex, setIndex] = useState(0);
  const [pressed, setPressed] = useState(false);
  const state = useSelector(state => state.UserReducer);
  const selectedmentor = props.route.params.mentorDetails;
  const [selectedmentorPrice, setSelectedmentorPrice] = useState();

  const Ratings = () => {
    return <Rating />;
  };
  //console.log(selectedmentor, 'selectedmentordat');

  useEffect(() => {
    setSelectedmentorPrice(
      selectedmentor?.plans[0] / 2 <= 500
        ? 500
        : selectedmentor?.plans[0] / 2 > 500 &&
          selectedmentor?.plans[0] / 2 <= 750
        ? 750
        : selectedmentor?.plans[0] / 2 > 750 &&
          selectedmentor?.plans[0] / 2 <= 1000
        ? 1000
        : selectedmentor?.plans[0] / 2 > 1000 &&
          selectedmentor?.plans[0] / 2 <= 1500
        ? 1500
        : selectedmentor?.plans[0] / 2 + 50,
    );
  }, []);
  // console.log(selectedmentor?.image);
  const renderOptions = index => {
    switch (index) {
      case 0:
        return (
          <View style={{display: 'flex'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '400',
                bottom: '6%',
                marginHorizontal: 16,
              }}>
              {smallString(selectedmentor?.about, 520)}
            </Text>
          </View>
        );
      case 1:
        return (
          <View style={{display: 'flex'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '400',
                marginHorizontal: 16,
              }}>
              {selectedmentor?.experience}
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={{display: 'flex'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '400',
                marginHorizontal: 16,
              }}>
              {selectedmentor?.domain}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    selectedmentor && (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigaton.goBack()}>
            <Image
              source={require('../../assets/images/Back.png')}
              style={styles.button}
            />
          </TouchableOpacity>
        </View>

        <Image source={{uri: selectedmentor?.image}} style={styles.mentor} />
        <LinearGradient
          colors={[AppColors.primarycolor, '#012437']}
          start={{x: 0, y: 1.3}}
          end={{x: 0.3, y: 0.5}}
          style={{
            marginHorizontal: '5%',
            borderRadius: 10,
            paddingVertical: '2%',
          }}>
          <Text style={styles.mentorName}>{selectedmentor?.name}</Text>
          <Text style={styles.mentorProfession}>
            {selectedmentor?.industry}
          </Text>
        </LinearGradient>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '12%',
            paddingStart: '2%',
          }}>
          <CustomTextCard
            title="Industry"
            subTitle={selectedmentor?.industry}
          />

          <CustomTextCard
            title="Appoinment"
            subTitle={'₹ ' + selectedmentorPrice + '/30 Min'}
          />
          <TouchableOpacity
            style={{
              marginTop: '-7.6%',
              width: '30%',
              height: '100%',
              overflow: 'hidden',
              borderRadius: 12,
              marginRight: '2%',
            }}>
            <ImageBackground
              style={{
                paddingHorizontal: '5%',
                paddingVertical: '5%',
                borderRadius: 12,
              }}
              source={require('../../assets/images/Rectangle2.png')}>
              <Text style={{color: AppColors.FontsColor, marginBottom: '4%'}}>
                Rating
              </Text>
              <Rating />
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          <Details
            buttons={['About', 'Experience', 'Domain']}
            afterClickEvent={setIndex}
          />
          {renderOptions(optionIndex)}
        </View>
        <View style={{paddingBottom: 90}}>
          {selectedmentor?.mentorUniqueID ? (
            <CustomButton
              onPress={() => {
                navigaton.navigate('scheduleappointment', {
                  mentor: selectedmentor,
                });
              }}
              title="Schedule"
            />
          ) : null}
        </View>
      </ScrollView>
    )
  );
};
