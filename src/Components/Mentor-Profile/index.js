import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';

import styles from './styles';

import {CustomTextCard} from '../CustomTextCard';
import {Details} from '../Details';
import {Header} from '../Header';
import {Rating} from '../Ratings';
import {CustomButton} from '../CustomButton';

export const MentorDetails = props => {
  const navigaton = useNavigation();
  const [optionIndex, setIndex] = useState(0);
  const [pressed, setPressed] = useState(false);
  // const {selectedmentor} = useSelector(state => state.UserReducer);
  const selectedmentor = props.route.params.mentorDetails;

  const Ratings = () => {
    return <Rating />;
  };

  const renderOptions = index => {
    switch (index) {
      case 0:
        return (
          <View style={{height: 90}}>
            <Text
              style={{
                color: '#838282',
                fontSize: 10,
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
          <View style={{height: 90}}>
            <Text
              style={{
                color: '#838282',
                fontSize: 10,
                fontWeight: '400',
                marginHorizontal: 16,
              }}>
              {selectedmentor?.experience}
            </Text>
          </View>
        );
      case 2:
        navigaton.navigate('Plans', {
          plans: selectedmentor.plans,
          mentor: selectedmentor.email,
          orders: selectedmentor.orders,
          clients: selectedmentor.clients,
        });
      // break;
      case 3:
        return (
          <View style={{height: 90}}>
            <Text
              style={{
                color: '#838282',
                fontSize: 10,
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
      <ScrollView style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigaton.goBack()}>
            <Image
              source={require('../../assets/images/Back.png')}
              style={styles.button}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (!state.user.savedMentors.includes(selectedmentor.email)) {
                add_mentor_to_favourites(selectedmentor.email);
              } else {
                remove_mentor_from_favourites(selectedmentor.email);
              }
              //setPressed(!pressed)
            }}>
            {!state.user.savedMentors.includes(selectedmentor.email) ? (
              <Image
                source={require('../../assets/images/Heart-Outline.png')}
                style={styles.button}
              />
            ) : (
              <Image
                source={require('../../assets/images/Heart.png')}
                style={styles.button}
              />
            )}
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
          <CustomTextCard title="Appoinment" subTitle="$1000/Hr" />
          <CustomTextCard title="Ratings" subTitle={Ratings()} />
        </View>

        <View style={{}}>
          <Details
            buttons={['About', 'Experience', 'Plans', 'Domain']}
            afterClickEvent={setIndex}
          />
          {renderOptions(optionIndex)}
        </View>
        <View style={{paddingBottom: 90}}>
          <CustomButton title="Schedule" />
        </View>
      </ScrollView>
    )
  );
};
