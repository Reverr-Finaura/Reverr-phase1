import {View, Text, Dimensions, ScrollView, FlatList} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../../utils';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const ArticalLoader = () => {
  return (
    <View style={{height: Height}}>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <LinearGradient
            colors={[AppColors.primarycolor, '#012437']}
            start={{x: -3, y: 1.3}}
            end={{x: 3, y: 0.5}}
            style={{
              marginTop: 8,
              paddingVertical: 8,
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <SkeletonPlaceholder backgroundColor="#012437">
              <View style={{paddingHorizontal: '2%', flexDirection: 'row'}}>
                <View style={{height: 100, width: 120, borderRadius: 10}} />
                <View style={{paddingStart: '2%'}}>
                  <View style={{width: 220, height: 20, borderRadius: 4}} />
                  <View
                    style={{
                      width: 220,
                      height: 60,
                      marginTop: '5%',
                      borderRadius: 4,
                    }}
                  />
                </View>
              </View>
            </SkeletonPlaceholder>
          </LinearGradient>
        )}
      />
    </View>
  );
};

export {ArticalLoader};
