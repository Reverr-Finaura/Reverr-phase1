import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {capitalizeFirstLetter} from '../../utils/Helper/helper';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const SwipeCard = ({
  data,
  horizontal,
  numColumns,
  showsVerticalScrollIndicator,
  showsHorizontalScrollIndicator,
  pagingEnabled,
}) => {
  const navigation = useNavigation();
  return (
    <View style={{paddingBottom: '4%'}}>
      <FlatList
        data={data}
        horizontal={horizontal}
        numColumns={numColumns}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        pagingEnabled={pagingEnabled}
        renderItem={({item}) => (
          <View
            style={{
              width: Width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('StartCourse', {
                  CourseDetails: item, // {name: item?.frontscreen.name, image: item?.frontscreen.coverImg, modules: item?.modules}   // item,
                });
              }}
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                width: Width / 1.06,
              }}>
              <ImageBackground
                source={{uri: item?.frontscreen.coverImg}}
                style={{
                  width: Width / 1.06,
                  height: Height / 4,
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    marginTop: '30%',
                    height: '100%',
                    alignItems: 'center',
                    paddingTop: '8%',
                    paddingHorizontal: '4%',
                  }}>
                  <Text
                    style={{
                      color: AppColors.FontsColor,
                      fontSize: 17,
                      textAlign: 'center',
                    }}>
                    {capitalizeFirstLetter(item?.frontscreen.name)}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export {SwipeCard};
