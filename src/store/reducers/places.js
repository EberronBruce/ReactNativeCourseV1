/* @flow */
import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes.js'

type State = {
  places: Array<Object>
};
type Action = { type : string, placeName: string, placeKey: string, location: Object};

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
           },
           location: action.location
        })
      };
      case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
            return place.key !== action.placeKey;
          })
      };

    default:
      return state;
  }

};


export default reducer;
