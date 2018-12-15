//@flow
import React from 'react';
import { Text, StyleSheet, } from 'react-native';

type Props = {children: React$Element<any>}


const mainText = (props: Props) => (
  <Text style={styles.mainText}>{props.children}</Text>
);

const styles = StyleSheet.create({
  mainText: {
    color: "black",
    backgroundColor: "transparent"
  }
});

export default mainText;
