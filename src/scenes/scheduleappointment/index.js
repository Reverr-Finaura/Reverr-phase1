import {View, Text} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';

const ScheduleAppointment = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{
          uri: 'https://calendly.com/reverrmeet/30min',
        }}
        style={{paddingTop: 20}}
      />
    </View>
  );
};

export default ScheduleAppointment;
