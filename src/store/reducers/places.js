/* @flow */
import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes.js'

type State = {
  places: Array<Object>
};
type Action = { type : string, placeName: string, placeKey: string};

const initialState = {
  places: []
}


const reducer = (state : State = initialState, action : Action) : State => {

  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: String(Math.random()),
           name: action.placeName,
           image: {
             uri: "https://cdn.newsapi.com.au/image/v1/f08d8ccc83fbc2d08529aea69890ad4d?width=1024"
           }
        })
      };
      case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
            return state.selectedPlace && place.key !== state.selectedPlace.key;
          })
      };

    default:
      return state;
  }

};


export default reducer;
