import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../../utils/Constants';
import {IndividualHeaderLayout} from '../../../Components';
import mentors from '../../../assets/data/mentors';
import App from '../../../App';

const AppoinmentScreen = () => {
  return (
    <View style={Styles.screen}>
      <IndividualHeaderLayout>
        <View style={{marginHorizontal: '4%', paddingBottom: '20%'}}>
          <FlatList
            data={mentors}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View
                key={index}
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginVertical: '4%',
                }}>
                <ImageBackground
                  style={Styles.card}
                  source={require('../../../assets/images/cardBg.png')}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={item.image} />
                    <View style={{marginStart: '12%'}}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 17,
                          fontWeight: '500',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: AppColors.FontsColor,
                        }}>
                        24 March 2022
                      </Text>
                      <Text
                        style={{
                          color: AppColors.FontsColor,
                        }}>
                        12:00pm - 1:00pm
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: '5%',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={[Styles.button, {backgroundColor: 'green'}]}>
                      <Text style={{color: AppColors.FontsColor}}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={[Styles.button, {backgroundColor: 'blue'}]}>
                      <Text style={{color: AppColors.FontsColor}}>
                        Reschedule
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            )}
          />
        </View>
      </IndividualHeaderLayout>
    </View>
  );
};
const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  card: {
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    borderRadius: 12,
  },
  button: {
    paddingHorizontal: '10%',
    paddingVertical: '2%',
    borderRadius: 6,
  },
});
export {AppoinmentScreen};
