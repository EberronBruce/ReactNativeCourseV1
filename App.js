/**
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View } from 'react-native';

import PlaceInput from "./src/components/PlaceInput/PlaceInput.js";
import PlaceList from "./src/components/PlaceList/PlaceList.js";
import placeImage from "./src/assets/beautiful-place.jpg"

type Props = {};
type State = { places: Array<Object>};
export default class App extends Component<Props, State> {
  state = {
    places: []
  };

  placeAddedHandler = (placeName: string) => {
    this.setState(prevState => {
        return {
            places: prevState.places.concat({
              key: String(Math.random()),
              name: placeName,
              image: {
                uri: "https://cdn.newsapi.com.au/image/v1/f08d8ccc83fbc2d08529aea69890ad4d?width=1024"
              }
            })
        };
      });
  };

  placeDeletedHandler = (key : string) => {
    this.setState(prevState => {
        return {
          places: prevState.places.filter(place => {
              return place.key !== key;
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
