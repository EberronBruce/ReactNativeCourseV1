/* @flow */

import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from './actionTypes.js';
import { uiStartLoading, uiStopLoading, authGetToken } from './index.js';

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};

export const addPlace = (placeName : string, location: Object, image: Object) => {
  return (dispatch: Function) => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        authToken = token;
        return fetch("https://us-central1-awesome-places-1545539529697.cloudfunctions.net/storeImage",{
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            }),
            headers: {
              "Authorization" : "Bearer " + authToken
            }
        })
      })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, please try again");
      dispatch(uiStopLoading());
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw(new Error());
      }
    })
    .then(parsedRes => {
      const placeData = {
        name: placeName,
        location: location,
        image: parsedRes.imageUrl,
        imagePath: parsedRes.imagePath
      };
      return fetch("https://awesome-places-1545539529697.firebaseio.com/places.json?auth=" + authToken, {
        method: "POST",
        body: JSON.stringify(placeData)
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw(new Error());
      }
    })
    .then(parsedRes => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
      dispatch(placeAdded());
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, please try again");
      dispatch(uiStopLoading());
    });
  };
};

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  };
};

export const getPlaces = ()  => {
  return (dispatch : Function) => {
    dispatch(authGetToken())
    .then(token => {
      return fetch("https://awesome-places-1545539529697.firebaseio.com/places.json?auth=" + token)
    })
    .catch(() => {
      alert("No valid token found!");
    })
    .then(res => res.json())
    .then(parsedRes => {
      const places = [];
      for (let key in parsedRes) {
        places.push({
          ...parsedRes[key],
          image: {
            uri: parsedRes[key].image
          },
          key: key
        })
      }
      dispatch(setPlaces(places))
    })
    .catch(err => {
        alert("Something went wrong :/");
        console.log(err);
    });
  };
};

export const setPlaces = (places: Array<Object>) => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = (key: string) => {
  return (dispatch: Function) => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch("https://awesome-places-1545539529697.firebaseio.com/places/" + key + ".json?auth=" + token, {
          method: "DELETE"
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw(new Error());
        }
      })
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
          alert("Something went wrong :/");
          console.log(err);
      });
  };
};

export const removePlace = (key: string) => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};
