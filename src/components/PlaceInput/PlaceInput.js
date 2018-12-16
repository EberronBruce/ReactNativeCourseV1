/* @flow */

import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultInput from "../UI/DefaultInput/DefaultInput.js";

type State = {  };
type Props = {placeName: string, onChangeText: Function};

const placeInput = (props: Props) =>  (
  <DefaultInput
    placeholder="Place Name"
    value={props.placeName}
    onChangeText={props.onChangeText}
    style={styles.input}
  />
);


const styles = StyleSheet.create({
  input: {

  }
});



export default placeInput;
