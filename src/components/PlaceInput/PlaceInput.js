/* @flow */

import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultInput from "../UI/DefaultInput/DefaultInput.js";

type State = {  };
type Props = {placeData: Object, onChangeText: Function};

const placeInput = (props: Props) =>  (
  <DefaultInput
    placeholder="Place Name"
    value={props.placeData.value}
    valid={props.placeData.valid}
    touched={props.placeData.touched}
    onChangeText={props.onChangeText}
    style={styles.input}
  />
);


const styles = StyleSheet.create({
  input: {

  }
});



export default placeInput;
