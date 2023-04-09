import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AboutMeSection from '../../Components/components/AboutMeSection';
import FindMeOn from '../../Components/components/FindMeOn';
import GradientHeader from '../../Components/components/GradientHeader';
import HowToMeet from '../../Components/components/HowToMeet';
import LineBar from '../../Components/components/LineBar';
import ProfileTitle from '../../Components/components/ProfileTitle';
import WhyHere from '../../Components/components/WhyHere';
import Theme from '../../utils/Theme';

const NewVibe = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <GradientHeader />
      <ScrollView>
        <View style={styles.likewrapper}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Theme.hearttick} style={styles.icon} />
            <Text style={styles.text}>view likes</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Theme.filter} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={colors}
          style={[styles.cardWrapper, styles.shadowProp]}>
          <View style={styles.wrapper}>
            <LinearGradient
              colors={['#3D85E3', '#79C0F2']}
              style={styles.imgborder}>
              <Image source={Theme.userguy} style={styles.img} />
            </LinearGradient>
            <View style={styles.titleWrapper}>
              <Text style={styles.usertitle}>Jatin Khurana</Text>
              <Image source={Theme.verify} style={styles.verify} />
            </View>
            <Text style={styles.tag}>Ceo at Reverr</Text>
            <Text style={styles.location}>New Delhi,India</Text>
          </View>

          <AboutMeSection />

          <View style={{paddingHorizontal: 20}}>
            <LineBar />
          </View>

          <WhyHere />

          <View style={{paddingHorizontal: 20}}>
            <LineBar />
          </View>

          <ProfileTitle
            title="Currently"
            textOne="Cheif Executive Officer"
            textTwo="Rever,Mastok"
          />

          <View style={{paddingHorizontal: 20}}>
            <LineBar />
          </View>

          <ProfileTitle title="Industry" textOne="Sales and marketing" />

          <View style={{paddingHorizontal: 20}}>
            <LineBar />
          </View>

          <ProfileTitle
            title="Education"
            textOne="IIM Bangalore"
            textTwo="MBA"
          />

          <View style={{paddingHorizontal: 20}}>
            <LineBar />
          </View>

          <WhyHere />

          <View style={{paddingHorizontal: 20}}>
            <LineBar />
          </View>

          <HowToMeet />

          <View style={{paddingHorizontal: 20}}>
            <LineBar />
          </View>

          <FindMeOn title={'Find Me On:'} />
        </LinearGradient>

        <View style={{height: 110}} />
      </ScrollView>

      <View style={styles.floatingBanner}>
        <TouchableOpacity style={styles.align}>
          <Image source={Theme.nope} style={styles.btn} />
          <Text style={styles.btntext}>nope</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.align}>
          <Image source={Theme.superlike} style={styles.btn} />
          <Text style={styles.btntext}>superlike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.align}>
          <Image source={Theme.like} style={styles.btn} />
          <Text style={styles.btntext}>like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default NewVibe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 3,
  },
  img: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  imgborder: {
    height: 158,
    width: 158,
    resizeMode: 'contain',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingTop: 25,
    alignItems: 'center',
  },
  titleWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  usertitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  verify: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  tag: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },
  location: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 8,
    opacity: 0.3,
  },
  cardWrapper: {
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 20,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 25},
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  likewrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 5,
    color: '#FFF',
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  floatingBanner: {
    resizeMode: 'contain',
    borderRadius: 8,
    position: 'absolute',
    bottom: 10,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121416',
    alignSelf: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 25,
  },
  btn: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  btntext: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
  },
  align: {
    alignItems: 'center',
  },
});

const colors = [
  '#08096F',
  '#0D0D0D',
  Theme.backgroundColor,
  Theme.backgroundColor,
  '#1B1D8B',
];
