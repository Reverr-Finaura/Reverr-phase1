import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

const Webview = props => {
  const navigation = useNavigation();
  const url = props.route.params.url;
  return (
    <WebView
      source={{
        uri: url,
      }}
      style={{paddingTop: 20}}
    />
  );
};

export {Webview};
