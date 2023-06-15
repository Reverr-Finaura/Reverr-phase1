import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors, smallString} from '../../utils';

const RequestCard = ({
  item,
  onApprove,
  onReject,
  aprovedLoader,
  rejectLoader,
}) => {
  return (
    <View
      key={item.name}
      style={{
        width: '46%',
        marginVertical: '2%',
        marginHorizontal: '2%',
        alignItems: 'center',
      }}>
      <LinearGradient
        colors={[AppColors.primarycolor, '#012437']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.5}}
        style={styles.Card}>
        <Image source={{uri: item.image}} style={[styles.dp]} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.industry}>{smallString(item.industry, 20)}</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            paddingHorizontal: '6%',
          }}>
          {aprovedLoader ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : (
            <TouchableOpacity onPress={onApprove} style={styles.button}>
              <Text style={{color: AppColors.FontsColor}}>Approve</Text>
            </TouchableOpacity>
          )}

          {rejectLoader ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : (
            <TouchableOpacity
              onPress={onReject}
              style={[styles.button, {backgroundColor: 'red'}]}>
              <Text style={{color: AppColors.FontsColor}}>Reject</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '3%',
  },
  Card: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: '8%',
  },
  name: {
    color: AppColors.FontsColor,
    marginTop: '5%',
    fontSize: 18,
  },
  industry: {
    color: AppColors.infoFonts,
    marginVertical: '5%',
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: '7%',
    paddingVertical: '3%',
    borderRadius: 5,
  },
  dp: {
    height: 90,
    width: 90,
    borderRadius: 50,
  },
});
export default RequestCard;
