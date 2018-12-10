// @flow
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type Props = { style: Object};

const defaultInput = (props: Props) => (
    <TextInput
      underlineColorAndroid="transparent"
      {...props}
      style={[styles.input, props.style]}
    />
);

const styles = StyleSheet.create({
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#eee",
      padding: 5,
      margin: 8
    }
  });

export default defaultInput;
