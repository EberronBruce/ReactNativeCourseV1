//@flow
import {UI_START_LOADING, UI_STOP_LOADING} from '../actions/actionTypes.js';

type State = {};
type Action = {
  type: string
}

const initialState = {
  isLoading: false
};

const reducer = (state: State = initialState, action: Action) : State => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
    return {
      ...state,
      isLoading: false
    };
    default:
      return state;
  }
};

export default reducer;
