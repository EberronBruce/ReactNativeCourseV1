//@flow
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "../actions/actionTypes.js";

type State = {
  token: ?string,
  expiryDate: ?number
};
type Action = { type : string, token : string, expiryDate: number};

const initialState = {
  token: null,
  expiryDate: null
};

const reducer = (state : State = initialState, action : Action) : State => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null
      };
    default:
      return state;
  }
};

export default reducer;
