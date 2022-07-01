import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {AppColors} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

export const Details = props => {
  const [clicked, setClicked] = useState(0);
  const {buttons, afterClickEvent} = props;

  const handleClick = (item, id) => {
    setClicked(id);
    afterClickEvent(id);
  };

  return (
    <LinearGradient
      colors={[AppColors.primarycolor, '#012437', 'black']}
      start={{x: -3, y: 1.3}}
      end={{x: 3, y: 0.5}}
      style={styles.container}>
      {buttons.map((buttonLabel, index) => {
        return (
          <TouchableOpacity
            onPress={item => handleClick(item, index)}
            key={index}
            style={[
              index === clicked ? styles.buttonActive : styles.button,
              // index === 0 && clicked ? styles.button : styles.buttonActive,
            ]}>
            <Text style={[index === clicked ? styles.textActive : styles.text]}>
              {buttonLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};
