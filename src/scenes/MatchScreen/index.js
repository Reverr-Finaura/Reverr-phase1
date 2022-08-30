import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../../Components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';

const MatchScreen = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  const {data} = params;

  const userimage = data.image;
  const matchedimage = data.image;
  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 12, 18, 1)',

        flex: 1,
        // position:'relative',
      }}
    >
      <View style={styles.main}>
        <View>
          <View style={{top: 306, width: '50%'}}>
            <Header />
          </View>
        </View>
      </View>
      <Text
        style={{
          fontFamily: 'Poppins',
          fontSize: 30,
          fontWeight: '700',
          lineHeight: 45,
          marginTop: 135,
          letterSpacing: 0,
          textAlign: 'center',
          color: 'white',
          marginLeft: 10,
        }}
      >
        It’s a match!!
      </Text>

      <View>
        <View
          style={{
            position: 'absolute',
          }}
        >
          <Image
            style={{
              width: 250,
              height: 250,
              position: 'absolute',
              width: 160,
              height: 160,
              left: 81,
              top: 45,
              borderRadius: 100,
            }}
            source={{uri: matchedimage}}
          />
        </View>
        <View>
          <Image
            style={{
              width: 250,
              height: 250,
              position: 'absolute',
              width: 160,
              height: 160,
              left: 190,
              top: 45,
              borderRadius: 100,
            }}
            source={{uri: userimage}}
          />
        </View>
      </View>
      <View
        style={{
          width: 339,
          left: 45,
          top: 200,
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins',
            fontSize: 20,
            fontWeight: '700',
            lineHeight: 35,
            letterSpacing: 0,
            textAlign: 'center',
            color: 'white',
          }}
        >
          You and {data.name} matched. Go send a hello !
        </Text>
      </View>
      <View
        style={{
          height: 60,
          width: 320,
          left: 57,
          top: 250,
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: '#2A72DE',
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins',
            fontSize: 20,
            fontWeight: '700',
            lineHeight: 30,
            color: 'white',
            letterSpacing: 0,
            textAlign: 'center',
          }}
        >
          Start messaging
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    backgroundColor: ' rgba(42, 114, 222, 0.5)',
    height: 664,
    borderRadius: 400,
    width: '200%',
    left: 0,
    top: -306,
  },
  top: {
    position: 'absolute',
    width: 895,
    height: 664,
    borderRadius: 500,
    left: 0,
    opacity: 0.5,
    top: -306,
    backgroundColor: '#2A72DE80',
  },

  heading: {
    fontFamily: 'Poppins',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 45,
    marginVertical: 102,
    color: 'white',
    textAlign: 'center',
  },
});
export {MatchScreen};
