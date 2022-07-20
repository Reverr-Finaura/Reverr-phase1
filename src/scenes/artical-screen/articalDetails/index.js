import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {BackButton} from '../../../Components';
import {AppColors} from '../../../utils';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const ArticalDetails = props => {
  const navigation = useNavigation();
  const articaldetails = props.route.params.articalData;

  return (
    <View style={{flex: 1, backgroundColor: AppColors.primarycolor}}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.articalImage}
          source={{
            uri: articaldetails && articaldetails.image,
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
              <TouchableOpacity
                activeOpacity={0.7}
                /*  onPress={() => saveArticle(articaldetails)}> */
              >
                <Ionic
                  name="heart"
                  size={30}
                  /* color={
                      state.savedArticles.includes(articaldetails.id)
                        ? 'red'
                        : 'grey'
                    } */
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{articaldetails.heading}</Text>
          </View>
        </ImageBackground>
      </View>
      <ScrollView style={styles.body}>
        <Text style={styles.text}>{articaldetails.body}</Text>
        <Text style={styles.author}>By {articaldetails.author}</Text>
      </ScrollView>
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
    marginTop: Height / 5,
  },
  author: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    marginBottom: '5%',
  },
  body: {
    paddingHorizontal: '8%',
  },
  text: {
    color: AppColors.infoFonts,
    fontFamily: 'Poppins-Regular',
  },
});

export {ArticalDetails};
