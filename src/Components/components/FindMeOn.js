import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Theme from '../../utils/Theme';

function FindMeOn({title, phone , email, linkedin, twitter}) {
  return (
    <View style={styles.container}>
      <View style={{width: '40%'}}>
        <Text style={styles.tabTitle}>{title}</Text>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <Image source={Theme.phone} style={styles.icn} />
          <Text style={styles.findtext}>{phone}</Text>
        </View>

        <View style={styles.contentWrapper}>
          <Image source={Theme.email} style={styles.icn} />
          <Text style={styles.findtext}>{email}</Text>
        </View>
        {linkedin != "" &&
        <View style={styles.contentWrapper}>
          <Image source={Theme.linkedin} style={styles.icn} />
          <Text style={styles.findtext}>
            {linkedin === '' ? '....' : linkedin}
          </Text>
        </View>
        }

        {/* <View style={styles.contentWrapper}>
          <Image source={Theme.twitter} style={styles.icn} />
          <Text style={styles.findtext}>
            {twitter === '' ? '....' : twitter}
          </Text>
        </View> */}
      </View>
    </View>
  );
}
export default FindMeOn;

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
  icn: {
    height: 13,
    width: 13,
    resizeMode: 'contain',
    marginRight: 10,
  },
  findtext: {
    fontWeight: '600',
    fontSize: 12.36,
    color: '#fff',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});
