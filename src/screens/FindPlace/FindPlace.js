// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList.js'

type Place = {
  key: string,
  name: string,
  image: Image
};
type Props = {places: Array<Place>, navigator: Object};
type State = {};

class FindPlaceScreen extends Component<Props, State> {
  itemSelectedHandler = (key) => {
    const selPlace =  this.props.places.find(place => {
      return place.key === key;
    });
    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title:selPlace?.name,   //Added the ? to remove flow error
      passProps: {
        selectedPlace: selPlace
      }
    });
  }

  render() {
    return (
      <View>
        <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
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
