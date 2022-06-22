import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

export const Details = props => {
  const [clicked, setClicked] = useState(0);
  const {buttons, afterClickEvent} = props;

  const handleClick = (item, id) => {
    setClicked(id);
    afterClickEvent(id);
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};
