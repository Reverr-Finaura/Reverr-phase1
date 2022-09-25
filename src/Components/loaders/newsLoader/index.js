import {View, Dimensions, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppColors} from '../../../utils';
import {postData} from '../../SkeltonLoader/postData';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const NewsLoader = () => {
  const [clmn, setClmn] = useState(2);
  return (
    <View
      style={{
        backgroundColor: AppColors.primarycolor,
        flex: 1,
        paddingTop: '2%',
      }}>
      <FlatList
        data={postData}
        numColumns={clmn}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '44%',
                height: 180,
                marginLeft: '3%',
                marginVertical: '2%',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <SkeletonPlaceholder backgroundColor="#012437">
                <View
                  style={{
                    width: '100%',
                    height: 200,
                    marginHorizontal: '2%',
                    marginVertical: '2%',
                    borderRadius: 10,
                  }}></View>
              </SkeletonPlaceholder>
            </View>
          );
        }}
      />
    </View>
  );
};

export {NewsLoader};
