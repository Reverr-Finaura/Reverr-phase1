import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileDetailsBox = ({userData}) => {
  return (
    <View style={{marginHorizontal: '5%'}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.text, {color: AppColors.FontsColor}]}>
            Current
          </Text>
          <Text
            style={[
              styles.text,
              {color: AppColors.ActiveColor, paddingHorizontal: '2%'},
            ]}>
            Title
          </Text>
        </View>
        <Text
          style={{
            color: AppColors.FontsColor,
            fontSize: 13,
            marginStart: '7%',
            marginVertical: '2%',
          }}>
          Director of Market reserch
        </Text>
      </View>
      {/* <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '45%', paddingStart: '12%'}}>
            <Text style={[styles.text, {color: AppColors.FontsColor}]}>
              From
            </Text>
            <Text style={{color: AppColors.infoFonts, marginStart: '6%'}}>
              2022
            </Text>
          </View>
          <View
            style={{backgroundColor: AppColors.ActiveColor, width: 4}}></View>
          <View style={{width: '45%', paddingStart: '22%'}}>
            <Text style={[styles.text, {color: AppColors.FontsColor}]}>To</Text>
            <Text style={{color: AppColors.infoFonts, marginStart: '6%'}}>
              2024
            </Text>
          </View>
        </View>
      </View> */}
      <View style={styles.container}>
        <Text style={[styles.text, {color: AppColors.FontsColor}]}>
          Experience
        </Text>
        <View style={{paddingHorizontal: '10%', marginTop: '2.5%'}}>
          <Text
            style={{
              color: AppColors.FontsColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Fintech
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: '4%',
              marginTop: '2%',
            }}>
            <Icon name="ellipse" size={10} color={AppColors.ActiveColor} />
            <Text style={{color: AppColors.BtnClr, marginHorizontal: '3%'}}>
              Marketing research
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: '10%', marginTop: '2.5%'}}>
          <Text
            style={{
              color: AppColors.FontsColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Microsoft
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: '4%',
              marginTop: '2%',
            }}>
            <Icon name="ellipse" size={10} color={AppColors.ActiveColor} />
            <Text style={{color: AppColors.BtnClr, marginHorizontal: '3%'}}>
              Full stack developer
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: '10%', marginTop: '2.5%'}}>
          <Text
            style={{
              color: AppColors.FontsColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Kery solutions lt.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: '4%',
              marginTop: '2%',
            }}>
            <Icon name="ellipse" size={10} color={AppColors.ActiveColor} />
            <Text style={{color: AppColors.BtnClr, marginHorizontal: '3%'}}>
              Graphic designer - Intern
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={[styles.text, {color: AppColors.FontsColor}]}>
          Education
        </Text>
        <View style={{paddingHorizontal: '10%', marginTop: '2.5%'}}>
          <Text
            style={{
              color: AppColors.FontsColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            IIM Bangalore
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: '4%',
              marginTop: '2%',
            }}>
            <Icon name="ellipse" size={10} color={AppColors.ActiveColor} />
            <Text style={{color: AppColors.BtnClr, marginHorizontal: '3%'}}>
              March 2016- April 2018
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: '10%', marginTop: '2.5%'}}>
          <Text
            style={{
              color: AppColors.FontsColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            K.K. Wagh Engineering college
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: '4%',
              marginTop: '2%',
            }}>
            <Icon name="ellipse" size={10} color={AppColors.ActiveColor} />
            <Text style={{color: AppColors.BtnClr, marginHorizontal: '3%'}}>
              Mechanical 2012-2015
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: '10%', marginTop: '2.5%'}}>
          <Text
            style={{
              color: AppColors.FontsColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Gokhale senior secondary school
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: '4%',
              marginTop: '2%',
            }}>
            <Icon name="ellipse" size={10} color={AppColors.ActiveColor} />
            <Text style={{color: AppColors.BtnClr, marginHorizontal: '3%'}}>
              2007-2012
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.text, {color: AppColors.FontsColor}]}>
            Industry
          </Text>
        </View>
        <Text
          style={{
            color: AppColors.BtnClr,
            fontSize: 13,
            marginStart: '7%',
            marginVertical: '2%',
          }}>
          Marketing research
        </Text>
      </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.text, {color: AppColors.FontsColor}]}>
            Years of experience
          </Text>
        </View>
        <Text
          style={{
            color: AppColors.BtnClr,
            fontSize: 13,
            marginStart: '7%',
            marginVertical: '2%',
          }}>
          March 2016- April 2018
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={[styles.text, {color: AppColors.FontsColor}]}>
          Personal Information
        </Text>
        <View style={{paddingHorizontal: '10%', marginTop: '2.5%'}}>
          <Text
            style={{
              color: AppColors.FontsColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Gender
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: '4%',
              marginTop: '2%',
            }}>
            <Icon name="ellipse" size={10} color={AppColors.ActiveColor} />
            <Text style={{color: AppColors.BtnClr, marginHorizontal: '3%'}}>
              Male
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: '10%', marginTop: '2.5%'}}>
          <Text
            style={{
              color: AppColors.FontsColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Location
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: '4%',
              marginTop: '2%',
            }}>
            <Icon name="ellipse" size={10} color={AppColors.ActiveColor} />
            <Text style={{color: AppColors.BtnClr, marginHorizontal: '3%'}}>
              India, Delhi
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: '10%', marginTop: '2.5%'}}>
          <Text
            style={{
              color: AppColors.FontsColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Hometown
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: '4%',
              marginTop: '2%',
            }}>
            <Icon name="ellipse" size={10} color={AppColors.ActiveColor} />
            <Text style={{color: AppColors.BtnClr, marginHorizontal: '3%'}}>
              New delhi, India
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.text, {color: AppColors.FontsColor}]}>
            Interests
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginStart: '8%',
            marginTop: '6%',
          }}>
          <View
            style={{
              backgroundColor: AppColors.ActiveColor,
              borderRadius: 30,
              paddingVertical: '3%',
              paddingHorizontal: '3%',
            }}>
            <Text style={{color: AppColors.FontsColor, fontWeight: 'bold'}}>
              #Networking
            </Text>
          </View>
          <View
            style={{
              backgroundColor: AppColors.ActiveColor,
              borderRadius: 30,
              paddingVertical: '3%',
              paddingHorizontal: '3%',
            }}>
            <Text style={{color: AppColors.FontsColor, fontWeight: 'bold'}}>
              #Networking
            </Text>
          </View>
          <View
            style={{
              backgroundColor: AppColors.ActiveColor,
              borderRadius: 30,
              paddingVertical: '3%',
              paddingHorizontal: '3%',
            }}>
            <Text style={{color: AppColors.FontsColor, fontWeight: 'bold'}}>
              #Networking
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.text, {color: AppColors.FontsColor}]}>
            How can we meet
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingStart: '7%',
          }}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/linkdin.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/twitter.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderBottomColor: AppColors.CardColor,
    borderBottomWidth: 2,
    paddingVertical: '4%',
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
  },
});
export {ProfileDetailsBox};
