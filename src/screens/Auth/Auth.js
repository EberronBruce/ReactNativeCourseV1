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
        <View style={styles.inputContainer}>
          <TextInput placeholder="Your E-Mail Address" style={styles.input}/>
          <TextInput placeholder="Password" style={styles.input}/>
          <TextInput placeholder="Confirm Password" style={styles.input}/>
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
    },
    input: {
      width: "100%"
    }
  });

export default AuthScreen;
