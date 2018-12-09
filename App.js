/**
 *
 * @format
 * @flow
 */

import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth.js';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace.js';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace.js';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail.js';
import SideDrawer from './src/screens/SideDrawer/SideDrawer.js';
import configureStore from './src/store/configureStore.js';

const store = configureStore();

// Regrister Screens
Navigation.registerComponent(
  "awesome-places.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.SharePlaceScreen",
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.FindPlaceScreen",
  () => FindPlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.PlaceDetailScreen",
  () => PlaceDetailScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.SideDrawer",
  () => SideDrawer
);

//Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});

const App = () => {};
export default App;
