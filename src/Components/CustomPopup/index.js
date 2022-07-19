import {View, Text, StyleSheet} from 'react-native';
import React, {Children} from 'react';
import {Modal, Portal} from 'react-native-paper';

const CustomPopup = ({visible, hideModal, children}) => {
  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          {children}
        </Modal>
      </Portal>
    </View>
  );
};

export {CustomPopup};
