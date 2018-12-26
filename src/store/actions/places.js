/* @flow */

import { ADD_PLACE, DELETE_PLACE } from './actionTypes.js'

export const addPlace = (placeName : string, location: Object, image: Object) => {
  return {
    type: ADD_PLACE,
    placeName: placeName,
    location: location,
    image: image
  };
};

export const deletePlace = (key: string) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
