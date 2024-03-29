import React, {Children, useState} from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {AppColors} from '../../utils';

const CustomPopup = ({
  modalVisible,
  onRequestClose,
  children,
  setModalVisible,
  style,
}) => {
  return (
    <View style={{position: 'absolute'}}>
      <Modal
        visible={modalVisible}
        onRequestClose={onRequestClose}
        transparent={true}>
        <Pressable
          style={styles.outsideModal}
          onPress={event => {
            if (event.target == event.currentTarget) {
              setModalVisible(false);
            }
          }}>
          <View style={{...styles.modal, ...style}}>{children}</View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: '9%',
    marginTop: '60%',
    padding: 5,
    backgroundColor: AppColors.primarycolor,
    shadowColor: 'black',
    overflow: 'hidden',
    borderRadius: 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  /* The content of the modal takes all the vertical space not used by the header. */
  outsideModal: {
    backgroundColor: 'rgba(1, 1, 1, 0.08)',
    flex: 1,
  },
});

export {CustomPopup};
