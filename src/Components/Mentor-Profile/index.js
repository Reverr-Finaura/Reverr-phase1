import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,ToastAndroid} from 'react-native';

import styles from './styles';

import {CustomTextCard} from '../CustomTextCard';
import {Details} from '../Details';
import {Header} from '../Header';
import {Rating} from '../Ratings';
import {CustomButton} from '../CustomButton';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import { LikeMentor,UnLikeMentor } from '../../Redux/actions';
export const MentorProfile = props => {
  const navigaton = useNavigation();
  const [optionIndex, setIndex] = useState(0);
  const [pressed, setPressed] = useState(false);
  const {selectedmentor} = useSelector(state => state.UserReducer);
  const state=useSelector(state=>state.UserReducer);
  console.log(state.user.savedMentors)
  const dispatch=useDispatch();
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const add_mentor_to_favourites=async(id)=>{
    dispatch(LikeMentor(id));
    await firestore().collection('Users').doc(state.user.email).update({
      savedMentors:[...state.user.savedMentors,id]
    }).then(()=>{
        showToast("Mentor Added Successfully!")
    }).catch(err=>{
      showToast("Error while saving Mentor!");
    })
  }

  const remove_mentor_from_favourites=async(id)=>{
    //dispatch(UnLikeMentor(id));
    var bucket=[];
    for(var i=0;i<state.user.savedMentors.length;i++){
      if(id!=state.user.savedMentors[i]){
        bucket.push(state.user.savedMentors[i]);
      }
    }
    dispatch(UnLikeMentor(id));
    await firestore().collection('Users').doc(state.user.email).update({
      savedMentors:bucket
    }).then(()=>{
        showToast("Mentor Removed Successfully!")
    }).catch(err=>{
      showToast("Error while removing Mentor!");
    })
  }

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
             {selectedmentor.experience}
            </Text>
          </View>
        );
      case 2:
        navigaton.navigate('Plans',{
          plans:selectedmentor.plans,
          mentor:selectedmentor.email,
          orders:selectedmentor.orders,
          clients:selectedmentor.clients,
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

          <TouchableOpacity onPress={() =>{
            if(!state.user.savedMentors.includes(selectedmentor.email)){
              add_mentor_to_favourites(selectedmentor.email);
            }else{
              remove_mentor_from_favourites(selectedmentor.email);
            }
            //setPressed(!pressed)
            }}>
            { !state.user.savedMentors.includes(selectedmentor.email) ? (
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
            bottom: 60,
          }}>
          <CustomTextCard title="Industry" subTitle="Fintech" />
          <CustomTextCard title="Appoinment" subTitle="$1000/Hr" />
          <CustomTextCard title="Ratings" subTitle={Ratings()} />
        </View>

        <View style={{bottom: 72, maxHeight: 200}}>
          <Details
            buttons={['About', 'Experience', 'Plans', 'Domain']}
            afterClickEvent={setIndex}
          />
          {renderOptions(optionIndex)}
          
        </View>
        <View style={{paddingBottom:90}}>
          <CustomButton title="Schedule"/>
          </View> 
      </ScrollView>
    )
  );
};
