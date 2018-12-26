/* @flow */

import { ADD_PLACE, DELETE_PLACE } from './actionTypes.js'

export const addPlace = (placeName : string, location: Object, image: Object) => {
  return (dispatch: Function) => {
    const placeData = {
      name: placeName,
      location: location
    };
    fetch("https://awesome-places-1545539529697.firebaseio.com/places.json", {
      method: "POST",
      body: JSON.stringify(placeData)
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes)
    });
  };
};

export const deletePlace = (key: string) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
