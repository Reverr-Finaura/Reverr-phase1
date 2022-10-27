import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppColors} from '../../utils';
import {postData} from './postData';
import {BackButton} from '../Buttons';
import {CustomMenuBar} from '../CustomMenuBar';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const SkeltonLoader = () => {
  const [features, setFeatures] = useState(true);
  const [subs, setSubs] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: AppColors.primarycolor, flex: 1}}>
      {postData &&
        postData.length > 0 &&
        postData.map((item, index) => {
          // console.log(index);
          return (
            <LinearGradient
              key={index}
              colors={[AppColors.primarycolor, '#012437']}
              start={{x: -3, y: 1.3}}
              end={{x: 3, y: 0.5}}
              style={styles.postCard}>
              <SkeletonPlaceholder backgroundColor="#012437">
                <View
                  key={index}
                  style={{
                    paddingHorizontal: '5%',
                  }}>
                  <View
                    style={{width: 60, borderRadius: 50, flexDirection: 'row'}}>
                    <View style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{marginLeft: 10}}>
                      <View style={{width: 120, height: 20, borderRadius: 4}} />
                      <View
                        style={{
                          width: 80,
                          marginTop: 6,
                          height: 20,
                          borderRadius: 4,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: Height / 8,
                      marginVertical: 10,
                      borderRadius: 9,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      width: Width,
                    }}>
                    <View
                      style={{
                        width: Width / 3,
                        height: 30,

                        borderRadius: 6,
                      }}
                    />
                    <View
                      style={{
                        width: Width / 3,
                        height: 30,
                        marginStart: 70,
                        borderRadius: 6,
                      }}
                    />
                  </View>
                </View>
              </SkeletonPlaceholder>
            </LinearGradient>
          );
        })}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  postCard: {
    marginTop: '4%',
    borderRadius: 20,
    marginHorizontal: '2%',
    paddingHorizontal: '3%',
    paddingVertical: '3%',
  },
});
export {SkeltonLoader};
