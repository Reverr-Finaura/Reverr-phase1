import {View, Text} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import { useSelector } from 'react-redux';

const ScheduleAppointment = props => {
  const state = useSelector(state => state.UserReducer);
  console.log("mentorName",(props.route.params.mentor.name))
  console.log("userName",state.user.name)
  return (
  
      <WebView
        source={{
          uri: 'https://calendly.com/reverrmeet/30min?embed_domain=example',
          // uri:props.route.params.mentor.mentorCalendlyLink,
        }}
      />
    
  );
};

export default ScheduleAppointment;
