import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../../utils';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const SwipeCard = props => {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={props.data}
        horizontal
        pagingEnabled={props.pagingEnabled}
        onScroll={props.onScroll}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate('StartCourse', {
                CourseDetails: item,
              });
            }}
            style={{...styles.container, ...props.style}}>
            <ImageBackground style={{flex: 1}} source={{uri: item.image}}>
              <View style={{...styles.title, ...props.overlay}}>
                <Text
                  style={{
                    ...{
                      color: AppColors.FontsColor,
                      fontFamily: 'Poppins-Bold',
                    },
                    ...props.title,
                  }}>
                  {item.course}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginStart: 15,
    marginVertical: '2%',
    marginEnd: 10,
    width: Width / 1.1,
    height: Height > 684 ? Height / 4 : Height / 5,
    overflow: 'hidden',
    borderRadius: 20,
  },
  title: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '40%',
    paddingVertical: 5,
    paddingHorizontal: '3%',
    top: Height > 684 ? 145 : 90,
  },
});

export {SwipeCard};
