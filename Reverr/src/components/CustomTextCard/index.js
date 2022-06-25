import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import styles from './styles';

export const CustomTextCard = props => {
  const {title, subTitle} = props;
  return (
    <TouchableOpacity
      style={{
        // position: 'absolute',
        maxWidth: 120,
        maxHeight: 48,
      }}>
      <Image
        style={styles.field}
        source={require('../../assets/images/Rectangle2.png')}
      />
      <Text style={styles.fieldName}>{title}</Text>
      <Text style={styles.fieldSubName}>{subTitle}</Text>
    </TouchableOpacity>
  );
};
