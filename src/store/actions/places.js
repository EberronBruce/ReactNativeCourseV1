/* @flow */

import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes.js'

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


export const selectPlace = (key : string) => {
  return {
    type: SELECT_PLACE,
    placeKey: key
  };
};

export const deselectPlace = () => {
  return {
    type: DESELECT_PLACE
  };
};
