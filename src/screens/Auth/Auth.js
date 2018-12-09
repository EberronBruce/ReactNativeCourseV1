// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput
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
      <View style={styles.container}>
        <Text>Please Login In</Text>
        <Button title="Switch to Login" />
        <TextInput placeholder="Your E-Mail Address" />
        <TextInput placeholder="Password" />
        <TextInput placeholder="Confirm Password" />
        <Button title="Submit" onPress={this.loginHandler} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
  });

export default AuthScreen;
