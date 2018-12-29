//@flow
import {TRY_AUTH, AUTH_SET_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./index.js";
import startMainTabs from "../../screens/MainTabs/startMainTabs.js";

export const tryAuth = (authData: Object, authMode: string) => {
  return (dispatch : Function) => {
    dispatch(uiStartLoading());
    const apiKey = "AIzaSyAGCh5InBaq0M3ICx_2So5UJIeo2J0vgPk";
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
    if (authMode === "signup") {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;
    }

    fetch(
      url,
      {
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
      console.log(parsedRes);
      if (!parsedRes.idToken) {
        alert("Authentication failed, please try again");
      } else {
        dispatch(authSetToken(parsedRes.idToken));
        startMainTabs();
      }
    });
  };
};

export const authSetToken = (token : string) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};
