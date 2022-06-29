import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import styles from './styles';

const ProfileHeader = props => {
  const {title} = props;

  return (
    <View>
      <Text style={styles.imgTitle}>{title}</Text>
      <TouchableOpacity>
        <View style={styles.view}>
          <Image
            source={require('../../assets/images/Rectangle.png')}
            style={styles.rectangle}
          />
          <Image
            source={require('../../assets/images/Add.png')}
            style={styles.addIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export {ProfileHeader};