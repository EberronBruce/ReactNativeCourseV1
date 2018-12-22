//@flow
import {TRY_AUTH} from './actionTypes';

export const tryAuth = (authData: Object) => {
  return {
    type: TRY_AUTH,
    authData: authData
  };
};
