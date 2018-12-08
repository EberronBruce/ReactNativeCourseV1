/* @flow */

import { ADD_PLACE, DELETE_PLACE } from './actionTypes.js'

export const addPlace = (placeName : string) => {
  return {
    type: ADD_PLACE,
    placeName: placeName
  };
};

export const deletePlace = () => {
  return {
    type: DELETE_PLACE
  };
};
