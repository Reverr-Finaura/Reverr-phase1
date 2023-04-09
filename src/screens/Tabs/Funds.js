import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import GradientHeader from '../../Components/components/GradientHeader';
import NoteCard from '../../Components/components/NoteCard';
import NoteCardBig from '../../Components/components/NoteCardBig';
import Theme from '../../utils/Theme';

function Funds({navigation}) {
  return (
    <View style={{flex: 1}}>
      <GradientHeader />
      <View
        style={{
          flex: 1,
          backgroundColor: Theme.backgroundColor,
          paddingHorizontal: 25,
          paddingTop: 25,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Funding</Text>

          <Image source={Theme.fundingart} style={styles.art} />

          <NoteCard />

          {/* <View style={{alignItems:'center'}}>
          <Image source={Theme.codart} style={styles.codart} />
          </View>

          <NoteCardBig/> */}

          <View style={{height: 100}} />
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.corner}>
        <Text style={{fontSize: 16, color: '#FFF', fontWeight: 'bold'}}>
          Apply For Funds
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default Funds;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: '#FFF',
    marginTop: 15,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFF',
    marginRight: 5,
    fontWeight: 'bold',
  },
  corner: {
    resizeMode: 'contain',
    borderRadius: 100,
    position: 'absolute',
    bottom: 10,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColor,
    alignSelf: 'center',
  },
  wrapper: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  art: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  codart: {
    width: 243,
    height: 183,
  },
});
