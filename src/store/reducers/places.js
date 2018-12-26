/* @flow */
import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes.js'

type State = {
  places: Array<Object>
};
type Action = { type : string, placeName: string, placeKey: string, location: Object, image: Object};

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
             uri: action.image.uri
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
