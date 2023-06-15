import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

const ApplyFunds = props => {
  const navigation = useNavigation();
  return (
    <WebView
      source={{
        uri: 'https://reverr.io/fundingform',
      }}
      style={{paddingTop: 20}}
    />
  );
};

export {ApplyFunds};
