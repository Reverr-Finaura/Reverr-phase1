import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

export const MentorList = props => {
  const {image, name, profession} = props.mentor;
  return (
    <>
      <TouchableOpacity style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Rectangle3.png')}
        />
        <Image style={styles.mentor} source={image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.profession}>{profession}</Text>
      </TouchableOpacity>
    </>
  );
};
