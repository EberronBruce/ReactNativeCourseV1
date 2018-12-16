// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image
 } from 'react-native';
import { connect } from 'react-redux'

import { addPlace } from '../../store/actions/index.js';
import PlaceInput from '../../components/PlaceInput/PlaceInput.js';
import MainText from "../../components/UI/MainText/MainText.js";
import HeadingText from "../../components/UI/HeadingText/HeadingText.js";
import PickImage from "../../components/PickImage/PickImage.js";
import PickLocation from "../../components/PickLocation/PickLocation.js";


type Props = {onAddPlace: Function, navigator: Object};
type State = {};

class SharePlaceScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type == "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
            side: "left"
          });
      }
    }
  }

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText style={styles.nothing}>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput />
          <View style={styles.button}>
            <Button title="Share the Place!" onPress={() => alert('Share Place!')}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  },
  nothing: {

  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  };
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
