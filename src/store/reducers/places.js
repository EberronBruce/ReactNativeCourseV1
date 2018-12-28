/* @flow */
import { SET_PLACES, REMOVE_PLACE } from '../actions/actionTypes.js'

type State = {
  places: Array<Object>
};
type Action = { type : string, places: Array<Object>, key : string};

const initialState = {
  places: []
}


const reducer = (state : State = initialState, action : Action) : State => {

  switch (action.type) {
      case SET_PLACES:
        return {
          ...state,
          places: action.places
        };
      case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
            return place.key !== action.key;
          })
      };

    default:
      return state;
  }

};


export default reducer;
