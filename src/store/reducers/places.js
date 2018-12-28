/* @flow */
import { SET_PLACES } from '../actions/actionTypes.js'

type State = {
  places: Array<Object>
};
type Action = { type : string, places: Array<Object>};

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
      // case DELETE_PLACE:
      // return {
      //   ...state,
      //   places: state.places.filter(place => {
      //       return place.key !== action.placeKey;
      //     })
      // };

    default:
      return state;
  }

};


export default reducer;
