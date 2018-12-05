/**
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View } from 'react-native';
import {connect} from 'react-redux';

import PlaceInput from "./src/components/PlaceInput/PlaceInput.js";
import PlaceList from "./src/components/PlaceList/PlaceList.js";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail.js"
import {
  addPlace,
  deletePlace,
  selectPlace,
  deselectPlace
} from "./src/store/actions/index.js"

type Props = {
  onAddPlace: Function,
  onDeletePlace: Function,
  onSelectPlace: Function,
  onDeselectPlace: Function,
  selectedPlace: ?{
    key: string,
    name: string,
    image: Image
  },
  places: Array<Object>,
};

type State = {
  selectedPlace: ?{
    key: string,
    name: string,
    image: Image
  },
  places: Array<Object>
};

 class App extends Component<Props, State> {
  placeAddedHandler = (placeName: string) => {
    this.props.onAddPlace(placeName);
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  };

  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  };

  placeSelectedHandler = (key : string) => {
    this.props.onSelectPlace(key);
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
        <PlaceList
          places={this.props.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
      );
    }
 }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
