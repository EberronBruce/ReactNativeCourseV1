//@flow
import { AUTH_SET_TOKEN } from "../actions/actionTypes.js";

type State = {
  token: ?string
};
type Action = { type : string, token : string};

const initialState = {
  token: null
};

const reducer = (state : State = initialState, action : Action) : State => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};

export default reducer;
