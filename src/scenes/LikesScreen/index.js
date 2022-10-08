import {View, Text} from 'react-native';
import React from 'react';
import {IndividualHeaderLayout} from '../../Components';

const LikeScreen = () => {
  return (
    <IndividualHeaderLayout>
      <View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 80,
          }}
        >
          <Text
            style={{
              color: '#0077B7',
              textAlign: 'center',
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            Buy premium to connect with people who are interested in your
            profile
          </Text>
        </View>

        <View style={{alignSelf: 'center', marginTop: 12}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Poppins',
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            William and 9 others liked your profile
          </Text>
        </View>
        <View>
          <View style={{height: 99, width: 348, left: 42, backgroundColor:'lightgrey'}}></View>
        </View>
      </View>
    </IndividualHeaderLayout>
  );
};

export {LikeScreen};
