import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';

import styles from './styles';

import {CustomTextCard} from '../CustomTextCard';
import {Details} from '../Details';
import {Header} from '../Header';
import {Rating} from '../Ratings';
import {CustomButton} from '../CustomButton';

export const MentorProfile = () => {
  const navigaton = useNavigation();
  const [pressed, setPressed] = useState(false);
  const [optionIndex, setIndex] = useState(0);

  const Ratings = () => {
    return <Rating />;
  };

  const renderOptions = index => {
    switch (index) {
      case 0:
        return (
          <Text
            style={{
              color: '#838282',
              fontSize: 10,
              fontWeight: '400',
              bottom: '6%',
              marginHorizontal: 16,
            }}>
            Market Research Mentor is the terminal where all industrial,
            commercial and profitmaking venture will get the best research
            reports of the market in all sectors like automotive, electronics,
            pharmaceuticals and healthcare, food and beverages etc.
          </Text>
        );
      case 1:
        return (
          <Text
            style={{
              color: '#838282',
              fontSize: 10,
              fontWeight: '400',
              bottom: '6%',
              marginHorizontal: 16,
              // backgroundColor: 'red',
            }}>
            11 years of experience in Market Research
          </Text>
        );
      case 2:
        navigaton.navigate('Plans');
        break;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigaton.goBack()}>
          <Image
            source={require('../../assets/images/Back.png')}
            style={styles.button}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPressed(!pressed)}>
          {!pressed ? (
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
      <Text style={styles.mentorName}>Neetan Sachdeva</Text>
      <Text style={styles.mentorProfession}>Market Research</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          bottom: 60,
          // backgroundColor: 'red',
        }}>
        <CustomTextCard title="Industry" subTitle="Fintech" />
        <CustomTextCard title="Appoinment" subTitle="$1000/Hr" />
        <CustomTextCard title="Ratings" subTitle={Ratings()} />
      </View>

      <View style={{bottom: 70}}>
        <Image
          style={styles.details}
          source={require('../../assets/images/Rectangle2.png')}
        />
        <Details
          buttons={['About', 'Experience', 'Plans', 'Domain']}
          afterClickEvent={setIndex}
        />
        {renderOptions(optionIndex)}
        <CustomButton title="Schedule"></CustomButton>
      </View>
    </View>
  );
};
