import React from 'react';
import {StyleSheet, Modal, View, Pressable} from 'react-native';
import {AppColors} from '../../utils';

const OptionsPopup = ({
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
    backgroundColor: AppColors.ActiveColor,
    width: '40%',
    borderRadius: 5,
  },
  /* The content of the modal takes all the vertical space not used by the header. */
  outsideModal: {
    backgroundColor: 'rgba(1, 1, 1, 0.08)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {OptionsPopup};
