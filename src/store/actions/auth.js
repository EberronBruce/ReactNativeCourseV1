//@flow
import {TRY_AUTH} from './actionTypes';

export const tryAuth = (authData: Object) => {
  return (dispatch : Function) => {
    dispatch(authSignup(authData));
  };
};

export const authSignup = (authData : Object) => {
  return (dispatch : Function) => {
    fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAGCh5InBaq0M3ICx_2So5UJIeo2J0vgPk",{
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .catch(err => {
      console.log(err);
      alert("Authentication failed, please try again");
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
    })
  };
};
