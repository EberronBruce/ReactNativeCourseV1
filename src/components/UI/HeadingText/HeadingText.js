//@flow
import React from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = { style: Object, children: string };

const headingText = (props : Props) => (
  <Text {...props} style={[styles.textHeading, props.style]}>{props.children}</Text>
);

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 28,
    fontWeight: 'bold'
  }
});

export default headingText;
