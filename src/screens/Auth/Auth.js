// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import startMainTabs from "../MainTabs/startMainTabs.js"

type State = {};
type Props = {};

class AuthScreen extends Component<Props, State> {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <View>
        <Text>Auth Screen</Text>
        <Button title="Login" onPress={this.loginHandler} />
      </View>
    );
  }

}

export default AuthScreen;
