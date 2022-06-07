import React from 'react';
import {View} from 'react-native';

import styles from './app.layout.styles';

/**
 * The AppLayout component is the parent, HOC for all the app level features/designs/functionality to be implemented
 * @param {JSX} children accepts the JSX passed down to the AppLayout
 * @param {StyleSheet | {}} customStyles extensibility passed to the AppLayout component
 * @returns {JSX} the JSX AppLayout components along with the children internal to it
 */
export default function AppLayout({children, customStyles = {}}) {
  return <View style={[styles.container, customStyles]}>{children}</View>;
}
