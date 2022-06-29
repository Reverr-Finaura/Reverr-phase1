import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils';

const TabMenu = props => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPressArticle}
        style={[
          styles.Progress,
          {
            backgroundColor: props.article
              ? AppColors.ActiveColor
              : AppColors.BtnClr,
          },
        ]}>
        <Text style={styles.text}>Article</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPressNews}
        style={[
          styles.Progress,
          {
            backgroundColor: props.news
              ? AppColors.ActiveColor
              : AppColors.BtnClr,
          },
        ]}>
        <Text style={styles.text}>News</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: AppColors.BtnClr,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    width: '40%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  Progress: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.ActiveColor,
  },
  text: {
    color: AppColors.FontsColor,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export {TabMenu};
