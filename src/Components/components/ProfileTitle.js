import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {AppColors} from '../../utils';

function ProfileTitle({title, textOne, array}) {
  return (
    <View style={styles.container}>
      <View style={{width: '40%'}}>
        <Text style={styles.tabTitle}>{title}</Text>
      </View>
      <View style={styles.wrapper}>
        <View>
          {textOne === null && <Text style={styles.about}>{textOne}</Text>}
          {array && (
            <View>
              {array?.length === 0 ? (
                <View>
                  <Text style={[styles.about, {color: AppColors.CardColor}]}>
                    Edit Your Profile
                  </Text>
                </View>
              ) : (
                <View>
                  {array?.map((item, index) => (
                    <View key={index}>
                      <Text style={styles.about}>{item.degree}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
export default ProfileTitle;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#8AB9FF',
  },
  wrapper: {
    width: '60%',
  },
  about: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  desig: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.5,
    marginTop: 5,
  },
});
