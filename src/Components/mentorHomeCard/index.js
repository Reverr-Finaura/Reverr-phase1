import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import Icon from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../../utils';
  
  const Height = Dimensions.get('window').height;
  const Width = Dimensions.get('window').width;
  
  const MentorHomeCard = ({Userdata}) => {
    
    return (
      <View>
        <LinearGradient
          colors={[AppColors.primarycolor, '#012437']}
          start={{x: 0, y: 1.3}}
          end={{x: 1, y: 0.5}}
          style={styles.manu}>
          <View style={styles.topContainer}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: '3%',
              }}>
              <View style={{paddingVertical: '3%'}}>
                <Image style={styles.img} source={{uri:Userdata.image}} />
                <Text style={{color: AppColors.FontsColor, marginTop: '7%'}}>
                {Userdata.name}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    backgroundColor: AppColors.CardColor,
                    paddingHorizontal: '7%',
                    color: AppColors.FontsColor,
                    paddingVertical: '4%',
                    borderRadius: 50,
                  }}>
                  Hii Jatin
                </Text>
                <Text
                  style={{
                    backgroundColor: AppColors.CardColor,
                    paddingHorizontal: '7%',
                    paddingVertical: '4%',
                    color: AppColors.FontsColor,
                    marginTop: '2%',
                    marginStart: '32%',
                    borderRadius: 50,
                  }}>
                  hello
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: Height / 8,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: AppColors.BtnClr,
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                paddingVertical: '3%',
              }}>
              <View
                style={{
                  borderRadius: 100,
                  marginStart: 4,
                  borderWidth: 15,
                  height: Height / 9.3,
                  width: Width / 5,
                }}></View>
              <View style={styles.sessionStatus}>
                <Text style={styles.sessionText}>Next Session </Text>
                <Text style={{fontFamily: 'Poppins-Regular', marginTop: '-4%'}}>
                  22-04-2022
                </Text>
              </View>
              <TouchableOpacity>
                <Icon
                  name="chevron-forward-circle-outline"
                  size={39}
                  color={AppColors.ActiveColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };
  const styles = StyleSheet.create({
    manu: {
      marginTop: 30,
      borderRadius: 10,
    },
    img: {
      width: Width / 4,
      height: Height / 9,
      marginStart: '9%',
    },
    topContainer: {
      borderRadius: 10,
      overflow: 'hidden',
    },
    sessionStatus: {
      paddingHorizontal: '10%',
    },
    sessionText: {
      color: 'black',
      fontSize: 22,
      fontFamily: 'Poppins-Bold',
    },
  });
  export  {MentorHomeCard}