/* @flow */

import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultInput from "../UI/DefaultInput/DefaultInput.js";

type State = { placeName: string };
type Props = {};

class PlaceInput extends Component<Props, State> {
  state = {
    placeName: ""
  };

  placeNameChangedHandler = (val : string) => {
    this.setState({
      placeName: val
    });
  };


  render() {
    return (
        <DefaultInput
          placeholder="Place Name"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
          style={styles.input}
        />
    );
  }


}

const styles = StyleSheet.create({
  input: {

  }
});



export default PlaceInput;
