import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {CustomTextInput} from '../TextInput';
import {CustomButton} from '../CustomButton';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Details = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <Text style={styles.docText}>
          Upload company Documents<Text style={{color: 'red'}}> *</Text>
        </Text>
        <TouchableOpacity onPress={() => console.log('Pressed')}>
          <Image
            source={require('../../assets/images/Rectangle.png')}
            style={styles.rectangle}
          />
          <Image
            source={require('../../assets/images/Upload.png')}
            style={styles.upload}
          />
        </TouchableOpacity>
      </View>

      <View>
        <CustomTextInput title="Full Name" placeholder="eg: John Doe" />
        <CustomTextInput
          title="Professional Email"
          placeholder="Enter your Email"
        />
        <CustomTextInput
          title="Mobile Number"
          placeholder="Enter your Mobile Number"
          keyboardType="numeric"
        />
        <CustomTextInput
          title="LinkedIn"
          placeholder="https://www.linkedin.com/"
        />
        <CustomTextInput
          title="Password"
          placeholder="Enter your Password"
          secureEntryText={true}
        />
        <CustomButton
          title="Apply"
          onPress={() => navigation.navigate('Splash1')}
        />
      </View>
    </View>
  );
};

export {Details};