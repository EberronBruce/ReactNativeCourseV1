//@flow
import { AsyncStorage } from 'react-native';

import {TRY_AUTH, AUTH_SET_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./index.js";
import startMainTabs from "../../screens/MainTabs/startMainTabs.js";

const API_KEY = "AIzaSyAGCh5InBaq0M3ICx_2So5UJIeo2J0vgPk";

export const tryAuth = (authData: Object, authMode: string) => {
  return (dispatch : Function) => {
    dispatch(uiStartLoading());

    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY;
    if (authMode === "signup") {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY;
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
        dispatch(
          authStoreToken(
            parsedRes.idToken,
            parsedRes.expiresIn,
            parsedRes.refreshToken
          )
      );
        startMainTabs();
      }
    });
  };
};

export const authStoreToken = (token : string, expiresIn : number, refreshToken: string) => {
  return (dispatch : Function) => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    AsyncStorage.setItem("ap:auth:token", token);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
  };
};

export const authSetToken = (token : string) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

export const authGetToken = () => {
  return (dispatch : Function, getState: Function) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        let fetchedToken;
        AsyncStorage.getItem("ap:auth:token")
            .catch(err => reject())
            .then(tokenFromStorage => {
                fetchedToken = tokenFromStorage;
                if (!tokenFromStorage) {
                    reject();
                    return;
                }
                return AsyncStorage.getItem("ap:auth:expiryDate");
            })
            .then(expiryDate => {
                const parsedExpiryDate = new Date(parseInt(expiryDate));
                const now = new Date();
                if (parsedExpiryDate > now) {
                    dispatch(authSetToken(fetchedToken));
                    resolve(fetchedToken);
                } else {
                    reject();
                }

            })
            .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise
    .catch(err => {
      return AsyncStorage.getItem("ap:auth:refreshToken")
     .then(refreshToken => {
       return fetch(
         "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/x-www-form-urlencoded"
           },
           body: "grant_type=refresh_token&refresh_token=" + refreshToken
         }
       );
     })
     .then(res => res.json())
     .then(parsedRes => {
       if (parsedRes.id_token) {
         console.log("Refresh token worked!");
         dispatch(
           authStoreToken(
             parsedRes.id_token,
             parsedRes.expires_in,
             parsedRes.refresh_token
           )
         );
         return parsedRes.id_token;
       } else {
         dispatch(authClearStorage());
       }
     });
 })
 .then(token => {
   if (!token) {
     throw new Error();
   } else {
     return token;
   }
  });
  };
};

export const authAutoSignIn = () => {
  return (dispatch : Function) => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token!"));
  };
};

export const authClearStorage = () => {
  return (dispatch : Function) => {
    AsyncStorage.removeItem("ap:auth:token");
    AsyncStorage.removeItem("ap:auth:expiryDate");
  };
};
