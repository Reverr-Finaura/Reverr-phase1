import {View, Text, StyleSheet} from 'react-native';
import React, {Children} from 'react';
import {Modal, Portal} from 'react-native-paper';

const CustomPopup = (props) => {
   console.log(props.visible);
  return (
    <View>
      <Portal>
        <Modal
          visible={props.visible}
          onDismiss={props.hideModal}
          contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          {props.children}
        </Modal>
      </Portal>
    </View>
  );
};

export {CustomPopup};
