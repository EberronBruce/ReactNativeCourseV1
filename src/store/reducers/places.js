/* @flow */

type State = {};
type Action = { type : Object};

const initialState = {
  places: [],
  selectedPlace: null
}


const reducer = (state : State= initialState, action : Action) => {

  switch (action.type) {
    default:
      return state;
  }

};

export default reducer;
