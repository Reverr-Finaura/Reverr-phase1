import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AppColors} from '../../utils';
import {Data} from '../../assets/data/dummyData';

export const YourLibrary = () => {
  return (
    <View>
      <View style={styles.Container}>
        <View style={styles.heading}>
          <Text style={styles.text}>Your Library</Text>
          {/* <Icon name="arrow-right" size={20} color={AppColors.FontsColor} /> */}
        </View>
        <View>
          <FlatList
            data={Data}
            horizontal
            renderItem={({item}) => (
              <TouchableOpacity activeOpacity={0.6} style={styles.Card}>
                <Image style={styles.dp} source={{uri: item.image}} />
                <Text style={styles.Name}>{item.name}</Text>
                <Text style={styles.skills}>{item.skills}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};
