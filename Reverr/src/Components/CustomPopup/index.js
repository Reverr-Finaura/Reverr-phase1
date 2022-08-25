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
          <View style={styles.modal}>{children}</View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  modalContent: {},
  modalHeader: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    flexGrow: 1,
  },
  modalHeaderCloseText: {
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  outsideModal: {
    backgroundColor: 'rgba(1, 1, 1, 0.08)',
    flex: 1,
  },
});

export {CustomPopup};
