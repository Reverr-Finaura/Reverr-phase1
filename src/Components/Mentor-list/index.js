import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

export const MentorList = props => {
  //const {image, name, profession} = props.mentor;
  //console.log("mentor:"+Object.keys(props.mentor));
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MentorDetails', {
            mentorDetails: props.mentor,
          });
        }}
        style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Rectangle3.png')}
        />
        <Image style={styles.mentor} source={{uri: props.mentor.image}} />
        <View>
          <Text style={styles.name}>{props.mentor.name}</Text>
          <Text style={styles.profession}>
            {props.mentor?.profession
              ? props.mentor.profession
              : props.mentor.designation || props.mentor.industry}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
