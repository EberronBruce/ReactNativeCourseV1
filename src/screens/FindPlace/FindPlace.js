// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList.js'

type Props = {places: Array<Object>};
type State = {};

class FindPlaceScreen extends Component<Props, State> {
  render() {
    return (
      <View>
        <PlaceList places={this.props.places}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
