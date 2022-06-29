import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../../../utils';
import {BackButton} from '../../../components';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const NewsDetails = props => {
  const navigation = useNavigation();
  const articaldetails = props.route.params.articalData;
  // console.log(articaldetails);
  return (
    <View style={{flex: 1, backgroundColor: AppColors.primarycolor}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('WebView', {
            url: articaldetails.url,
          })
        }>
        <View style={styles.header}>
          <ImageBackground
            style={styles.articalImage}
            source={{
              uri: articaldetails && articaldetails.image.thumbnail.contentUrl,
            }}>
            <View style={styles.overlay}>
              <View
                style={{
                  marginTop: '5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <BackButton IconSize={30} />
              </View>
            </View>
          </ImageBackground>
        </View>
        <ScrollView style={styles.body}>
          <Text style={styles.title}>{articaldetails.name}</Text>
          <Text style={styles.text}>{articaldetails.description}</Text>
          <Text style={styles.author}>
            By {articaldetails.provider[0].name}
          </Text>
        </ScrollView>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articalImage: {
    width: '100%',
    height: Height / 2.5,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    paddingHorizontal: '8%',
    height: Height / 2.5,
  },
  title: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 19,
    marginTop: '5%',
  },
  author: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    marginBottom: '5%',
  },
  body: {
    paddingHorizontal: '8%',
    fontSize: 20,
  },
  text: {
    color: AppColors.infoFonts,
    fontFamily: 'Poppins-Regular',
  },
});

export {NewsDetails};
