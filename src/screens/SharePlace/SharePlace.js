// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'

import PlaceInput from '../../components/PlaceInput/PlaceInput.js';
import { addPlace } from '../../store/actions/index.js';

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
      <View>
        <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  };
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
