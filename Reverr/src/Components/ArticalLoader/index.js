import {View, Text, Dimensions, ScrollView} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppColors} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const ArticalLoader = () => {
  return (
    <ScrollView>
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: -3, y: 1.3}}
        end={{x: 3, y: 0.5}}
        style={{marginTop: 8, paddingVertical: 8}}>
        <SkeletonPlaceholder backgroundColor="#012437">
          <View>
            <View style={{height: 2, width: Width / 1.1}}></View>
            <View
              style={{
                height: 12,
                width: Width / 1.12,
                marginTop: 8,
              }}></View>
            <View
              style={{
                height: Height / 10,
                width: Width / 1.12,
                marginTop: 8,
              }}></View>
            <View style={{height: 2, width: Width / 1.1, marginTop: 8}}></View>
          </View>
        </SkeletonPlaceholder>
      </LinearGradient>
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: -3, y: 1.3}}
        end={{x: 3, y: 0.5}}
        style={{marginTop: 10, paddingVertical: 8}}>
        <SkeletonPlaceholder backgroundColor="#012437">
          <View style={{alignItems: 'center'}}>
            <View style={{height: 2, width: Width / 1.12}}></View>
            <View
              style={{
                height: 12,
                width: Width / 1.12,
                marginTop: 8,
              }}></View>
            <View
              style={{
                height: Height / 10,
                width: Width / 1.12,
                marginTop: 8,
              }}></View>
            <View style={{height: 2, width: Width / 1.12, marginTop: 8}}></View>
          </View>
        </SkeletonPlaceholder>
      </LinearGradient>
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: -3, y: 1.3}}
        end={{x: 3, y: 0.5}}
        style={{marginTop: 10, paddingVertical: 8}}>
        <SkeletonPlaceholder backgroundColor="#012437">
          <View style={{alignItems: 'center'}}>
            <View style={{height: 2, width: Width / 1.12}}></View>
            <View
              style={{
                height: 12,
                width: Width / 1.12,
                marginTop: 8,
              }}></View>
            <View
              style={{
                height: Height / 10,
                width: Width / 1.12,
                marginTop: 8,
              }}></View>
            <View style={{height: 2, width: Width / 1.12, marginTop: 8}}></View>
          </View>
        </SkeletonPlaceholder>
      </LinearGradient>
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: -3, y: 1.3}}
        end={{x: 3, y: 0.5}}
        style={{marginTop: 10, paddingVertical: 8}}>
        <SkeletonPlaceholder backgroundColor="#012437">
          <View style={{alignItems: 'center'}}>
            <View style={{height: 2, width: Width / 1.12}}></View>
            <View
              style={{
                height: 12,
                width: Width / 1.12,
                marginTop: 8,
              }}></View>
            <View
              style={{
                height: Height / 10,
                width: Width / 1.12,
                marginTop: 8,
              }}></View>
            <View style={{height: 2, width: Width / 1.12, marginTop: 8}}></View>
          </View>
        </SkeletonPlaceholder>
      </LinearGradient>
    </ScrollView>
  );
};

export {ArticalLoader};
