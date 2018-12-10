// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput
} from 'react-native';
import startMainTabs from "../MainTabs/startMainTabs.js";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput.js";

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
        <View style={styles.inputContainer}>
          <DefaultInput placeholder="Your E-Mail Address"/>
          <DefaultInput placeholder="Password" />
          <DefaultInput placeholder="Confirm Password" />
        </View>
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
    },
    inputContainer: {
      width: "80%",
    }
  });

export default AuthScreen;
