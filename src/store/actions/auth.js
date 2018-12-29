//@flow
import {TRY_AUTH} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./index.js";
import startMainTabs from "../../screens/MainTabs/startMainTabs.js";

export const tryAuth = (authData: Object, authMode: string) => {
  return (dispatch : Function) => {
    if (authMode === "login") {

    } else {
      dispatch(authSignup(authData));
    }
  };
};

export const authSignup = (authData : Object) => {
  return (dispatch : Function) => {
    dispatch(uiStartLoading());
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
      dispatch(uiStopLoading());
      console.log(err);
      alert("Authentication failed, please try again");
    })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch(uiStopLoading());
      if (parsedRes.error) {
        alert("Authentication failed, please try again");
      } else {
        startMainTabs();
      }
    });
  };
};
