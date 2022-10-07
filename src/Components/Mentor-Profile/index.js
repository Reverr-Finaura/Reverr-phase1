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
import {AppColors} from '../../utils';

export const MentorDetails = props => {
  const navigaton = useNavigation();
  const [optionIndex, setIndex] = useState(0);
  const [pressed, setPressed] = useState(false);
  const state = useSelector(state => state.UserReducer);
  const selectedmentor = props.route.params.mentorDetails;
  // console.log(selectedmentor, 'selected');

  const Ratings = () => {
    return <Rating />;
  };

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
              {selectedmentor?.about}
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

        <Image
          source={require('../../assets/images/MentorBig.png')}
          style={styles.mentor}
        />

        <Image
          style={styles.image}
          source={require('../../assets/images/Rectangle2.png')}
        />
        <Text style={styles.mentorName}>{selectedmentor?.name}</Text>
        <Text style={styles.mentorProfession}>{selectedmentor?.industry}</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '-14%',
          }}>
          <CustomTextCard
            title="Industry"
            subTitle={selectedmentor?.industry}
          />
          <CustomTextCard
            title="Appoinment"
            subTitle={'₹ ' + selectedmentor?.plans[0] + '/Hr'}
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
          <CustomButton
            onPress={() => {
              navigaton.navigate('CalanderAppointments', {
                mentor: selectedmentor,
              });
            }}
            title="Schedule"
          />
        </View>
      </ScrollView>
    )
  );
};
