import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../utils';
import {cardData} from '../../dumy-Data/defaultHomeCardData';
import {useNavigation} from '@react-navigation/native';
import {CustomButton} from '../Buttons';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const HomeCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.CardContainer}>
      <FlatList
        data={cardData}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => (
          <View
            style={{
              width: Width,
              paddingHorizontal: '4%',
            }}>
            <LinearGradient
              colors={[AppColors.ActiveColor, '#012437']}
              start={{x: 0.7, y: 1.3}}
              end={{x: 1, y: 0.9}}
              style={{borderRadius: 20}}>
              {index == 0 ? (
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: '3%',
                  }}>
                  <Text numberOfLines={2} style={styles.heading}>
                    {item.heading}
                  </Text>
                  <Image source={item.image} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',

                      paddingHorizontal: '32%',
                    }}>
                    <TouchableOpacity>
                      <Icon
                        name="chevron-back-outline"
                        size={35}
                        color={AppColors.ActiveColor}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon
                        name="chevron-forward-outline"
                        size={35}
                        color={AppColors.ActiveColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: '3%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    <View style={{marginStart: '2%'}}>
                      <Image
                        source={item.image}
                        style={{height: 100, width: 100, borderRadius: 10}}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          color: AppColors.infoFonts,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{marginHorizontal: '5%'}}>
                      <Text
                        numberOfLines={2}
                        style={[
                          styles.heading,
                          {textAlign: 'left', width: '55%'},
                        ]}>
                        {item.heading}
                      </Text>
                      <Text
                        style={{
                          color: AppColors.infoFonts,
                          marginRight: '5%',
                          textAlign: 'left',
                          width: '55%',
                        }}>
                        {item.subHeading}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: AppColors.ActiveColor,
                      width: '80%',
                      marginVertical: '5%',
                      alignItems: 'center',
                      paddingVertical: '3%',
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{color: AppColors.FontsColor, fontWeight: '600'}}>
                      Check schedule
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',

                      paddingHorizontal: '32%',
                    }}>
                    <TouchableOpacity>
                      <Icon
                        name="chevron-back-outline"
                        size={35}
                        color={AppColors.ActiveColor}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon
                        name="chevron-forward-outline"
                        size={35}
                        color={AppColors.ActiveColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </LinearGradient>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  CardContainer: {},
  Card: {
    paddingHorizontal: '5%',
  },
  heading: {
    color: AppColors.FontsColor,
    fontSize: 20,
    textAlign: 'center',
    width: '70%',
  },
});

export {HomeCard};
