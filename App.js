/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View } from 'react-native';

import PlaceInput from "./src/components/PlaceInput/PlaceInput.js";
import PlaceList from "./src/components/PlaceList/PlaceList.js";


type Props = {};
type State = { places: Array<string>};
export default class App extends Component<Props, State> {
  state = {
    places: []
  };

  placeAddedHandler = (placeName: string) => {
    this.setState(prevState => {
        return {
            places: prevState.places.concat(placeName)
        };
      });
  };

  placeDeletedHandler = (index : number) => {
    this.setState(prevState => {
        return {
          places: prevState.places.filter((place, i) => {
              return i !== index;
            })
        };
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
        <PlaceList
          places={this.state.places}
          onItemDeleted={this.placeDeletedHandler}
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
  },


});
