/**
 *
 * @format
 * @flow
 */

import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth.js'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace.js'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace.js'

// Regrister Screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen);
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => SharePlaceScreen);
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => FindPlaceScreen);

//Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});
