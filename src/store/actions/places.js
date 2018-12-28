/* @flow */

import { ADD_PLACE, DELETE_PLACE } from './actionTypes.js'

export const addPlace = (placeName : string, location: Object, image: Object) => {
  return (dispatch: Function) => {

    fetch("https://us-central1-awesome-places-1545539529697.cloudfunctions.net/storeImage",{
        method: "POST",
        body: JSON.stringify({
            image: image.base64
        })
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
      const placeData = {
        name: placeName,
        location: location,
        image: parsedRes.imageUrl
      };
      return fetch("https://awesome-places-1545539529697.firebaseio.com/places.json", {
        method: "POST",
        body: JSON.stringify(placeData)
      })
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
